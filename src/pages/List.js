import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';

import Item from '../components/Item';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    loading: {
        marginTop: 100,
    },
});

const api = 'https://api.douban.com/v2/movie/in_theaters';

export default class List extends Component {
    static navigationOptions = {
        title: 'In Theaters',
        header: null,
    };
    state = {
        movies:[],
        refreshing: false,
        ready: false,
        childState: '',
    };
    refreshing = false;
    start = 0;
    count = 12;
    fetchData = (start = 0, count = 12) => {
        if (this.refreshing) {
            return;
        }
        this.setState({
            refreshing: true,
        });
        this.refreshing = true;
        return fetch(`${api}?start=${start}&count=${count}`)
            .then((response) => response.text())
            .then((responseText) => {
                const json = JSON.parse(responseText);
                this.setState({
                    refreshing: false,
                });
                this.refreshing = false;
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    };
    freshData = async () =>{
        const json = await this.fetchData();
        this.setState({
            movies: json.subjects,
        });
    };
    fetchMore = async () =>{
        const json = await this.fetchData(this.start, this.count);
        if (json) {
            this.start += this.count - 1;
            this.setState({
                movies: this.state.movies.concat(json.subjects),
            });
        }
    };
    async componentDidMount() {
        await this.fetchMore();
        this.setState({
            ready: true,
        });
    }
    render() {
        const { navigate } = this.props.navigation;
        const { movies, refreshing, ready } = this.state;
        return (
            <View>
                {
                ready ?
                    <FlatList
                        style={styles.row}
                        numColumns={3}
                        keyExtractor={item => item.id}
                        data={movies}
                        onRefresh={this.fetchData}
                        onEndReached={this.fetchMore}
                        onEndReachedThreshold={0}
                        refreshing={refreshing}
                        ListFooterComponent={() =>{
                            return refreshing &&
                                <ActivityIndicator size="large" />;
                        }}
                        renderItem={({ item }) =>
                                <Item
                                    title={item.title}
                                    image={item.images.medium}
                                    stars={item.rating.stars}
                                    onPress={() => navigate('Detail', {
                                        id: item.id,
                                        callback: (data) => {
                                            this.setState({
                                                childState: data,
                                            });
                                        },
                                    })}
                                />
                        }
                    />
                    :
                    <ActivityIndicator size="large" style={styles.loading} />
            }
            </View>
        );
    }
}
