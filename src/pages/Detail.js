import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    TouchableOpacity,
    Linking,
} from 'react-native';

const api = 'https://api.douban.com/v2/movie/subject';

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 222,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        marginTop: 100,
    },
    play: {
        width: 107,
        height: 107,
    },
});
export default class Detail extends Component {
    static navigationOptions = {
        title: 'Detail',
    };
    state = {
        data: {},
        ready: false,
        videoUri: '',
    };

    async componentDidMount() {
        const {state: {params: {id}}} = this.props.navigation;
        let textData, jsonData;
        textData = await AsyncStorage.getItem(id);
        if (textData) {
        } else {
            const rawData = await fetch(`${api}/${id}`);
            textData = await rawData.text();
        }
        // 反序列化： “死的”对象 => “活的”对象
        jsonData = JSON.parse(textData);
        jsonData.image = jsonData.images.large.replace('webp', 'jpg');
        // 序列化：  “活的”对象=> “死的”对象
        AsyncStorage.setItem(id, textData);
        this.setState({
            data: jsonData,
            ready: true,
        });

        this.fetchVideo(jsonData.mobile_url);
    }
        fetchVideo = async (mobile_url) => {
            let pageHtml = await fetch(mobile_url);
            pageHtml = await pageHtml.text();
            const regex = /href="([\w|\W]*\.mp4)"/;
            const result = pageHtml.match(regex);
            if (result && result[1]) {
                const videoUri = result[1];
                this.setState({
                    videoUri
                });
            }
        };

    playVideo = () => {
        const {videoUri} = this.state;
        if (videoUri) {
            Linking.openURL(videoUri);
        } else {
            alert('Please wait for loading trailer');
        }
    };
    render() {
        const {data: {title, summary, image}, ready} = this.state;
        return (
            <View>
                {
                    ready ?
                        <View>
                            <TouchableOpacity onPress={this.playVideo}>
                                <Image source={{uri: image}} style={styles.image}>
                                    <Image source={require('../img/play-icon.png')} style={styles.play}/>
                                </Image>
                            </TouchableOpacity>
                            <Text>{title}</Text>
                            <Text>{summary}</Text>
                        </View>
                        :
                        <ActivityIndicator size="large" style={styles.loading}/>
                }
            </View>
        );
    }
}
