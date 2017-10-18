import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';


export default class Detail extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { state, goBack } = this.props.navigation;
        return (
            <View>
                <Text>Detail</Text>
                <Text>Movie's id: {state.params.id}</Text>
                <Text onPress={() => goBack()}>Back</Text>
            </View>
        );
    }
}