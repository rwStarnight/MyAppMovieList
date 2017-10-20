import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
} from 'react-native';

const api = 'https://api.douban.com/v2/movie/subject';

const styles = StyleSheet.create({
   image:{
       width:150,
       height:222,
   },
   loading:{
       marginTop: 100,
   },
});
export default class Detail extends Component {
    static navigationOptions = {
        title: 'Detail',
    };
    state = {
        data: {},
        ready: false,
    };
    async componentDidMount() {
        const { state: { params: { id } } } = this.props.navigation;
        let textData,jsonData;

        textData = await AsyncStorage.getItem(id);

        if (textData) {
            // alert('from local');
        } else {
            const rawData = await fetch(`${api}/${id}`);
            textData = await rawData.text();
            // alert('from Server');
        }

        /* title, summary
         "images": {
            "small": "http://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2499792043.webp",
            "large": "http://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2499792043.webp",
            "medium": "http://img3.doubanio.com/view/movie_poster_cover/spst/public/p2499792043.webp"
         }, */

        // 反序列化： “死的”对象 => “活的”对象
        jsonData = JSON.parse(textData);
        jsonData.image = jsonData.images.large.replace('webp', 'jpg');

        // 序列化：  “活的”对象=> “死的”对象
        // const textData = JSON.stringify(jsonData);
        AsyncStorage.setItem(id, textData);

        this.setState({
            data: jsonData,
            ready: true,
        });
    }
    render() {
        const { data: { title, summary, image }, ready } = this.state;
        return (
            <View>
                {
                    ready ?
                    <View>
                        <Image source={{ uri: image }} style={styles.image} />
                        <Text>{title}</Text>
                        <Text>{summary}</Text>
                    </View>
                   :
                    <ActivityIndicator size="large" style={styles.loading} />
                }
            </View>
        );
    }
}
