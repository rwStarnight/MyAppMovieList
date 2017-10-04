import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#fff5ee',
        width: 500,
        height: 500,
        borderWidth: 3,
        borderColor: 'gray',
        marginTop: 20,
    },
    image: {
        width: 150,
        height: 215,
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
    },
});

export default class app extends Component {
    render(){
        return(
            <View style={styles.root}>
                <Image
                    source={require('./img/poster.jpg')}
                    style={styles.image}
                ></Image>
                <Text
                    numberOfLlines={1}
                    style={styles.title}
                >
                    金刚狼3：殊死一战
                </Text>
            </View>
        );
    }
}