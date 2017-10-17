import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native';

import Item from './components/Item';

import movies from '../movies.json';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
});

export default class app extends Component {
    render() {
        return (
            <View>
                <FlatList
                    style={styles.row}
                    numColumns={3}
                    keyExtractor={item => item.id}
                    data={movies.subjects}
                    renderItem={
                        ({ item }) =>
                        <Item
                            title={item.title}
                            image={item.images.medium}
                            stars={item.rating.stars}
                        />
                    }
                />
            </View>
        );
    }
}