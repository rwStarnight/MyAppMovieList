import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const thirdWidth = width / 3;

const imageWidth = thirdWidth - 20;

const imageHeight = imageWidth / 0.697;

const styles = StyleSheet.create({
    root: {
        width: thirdWidth,
        marginTop: 20,
        paddingHorizontal: 10,
    },
    image: {
        width: imageWidth,
        height: imageHeight,
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        width: imageWidth,
        marginTop: 5,
    },
    stars:{
       width: 10,
       height: 10,
    },
    starsWrapper:{
        flexDirection: 'row',
    },
});

const renderStars = (stars) => {
    if (stars === '00'){
        return;
    }
    const total = 5;
    let full, half, empty;
    full = parseInt(stars[0]) - 1;
    if (stars[1] === '5') {
        full++;
        half = 0;
        empty = total - full;
    } else {
        half = 1
        empty = total - full - half;
    }
    const results = [];
    let i
    for (i = 0; i < full; i++){
        results.push(
            <Image
                key={i}
                style={styles.stars}
                source={require('../img/star-full.png')}
            />
        );
    }
    if (half) {
        results.push(
            <Image
                key={i}
                style={styles.stars}
                source={require('../img/star-half.png')}
            />
        );
    }
    for (let j = 0; j < empty; j++){
        results.push(
            <Image
                key={i+j+1}
                style={styles.stars}
                source={require('../img/star-empty.png')}
            />
        );
    }
    return (
        <View style={styles.starsWrapper}>
            {results}
        </View>
    );
}

const Item = (props) => {
    const { title, image, stars } = props;
    return (
    <View style={styles.root}>
        <Image
            source={{ uri: image }}
            style={styles.image}
        ></Image>
        <Text
            numberOfLines={1}
            style={styles.title}
        >
            {title}
        </Text>
        {renderStars(stars)}
    </View>
 );
};


export default Item
