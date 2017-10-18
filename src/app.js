import {
    StackNavigator,
} from 'react-navigation';

import List from './pages/List';
import Detail from './pages/Detail';

const App = StackNavigator({
    List: {screen: List},
    Detail: {screen: Detail},
});

export default App;

