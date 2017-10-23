import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';


export default class Cinemas extends Component {
    static navigationOptions = {
        title: 'Cinemas',
        header: null,
    };
    render() {
        return (
            <View>
                <Text>Cinemas</Text>
            </View>
        );
    }
}
