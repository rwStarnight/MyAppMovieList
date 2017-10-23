import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';


export default class MyMovies extends Component {
    static navigationOptions = {
        title: 'MyMovies',
        header: null,
    };
    render() {
        return (
            <View>
                <Text>MyMovies</Text>
            </View>
        );
    }
}
