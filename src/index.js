import { AppRegistry } from 'react-native';
import App from './App';

if (!__DEV__) {
    global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        error: () => {},
    };
}

console.ignoreYellowBox = ['Warning: Can only update'];

AppRegistry.registerComponent('MyAppMovieList', () => App);
