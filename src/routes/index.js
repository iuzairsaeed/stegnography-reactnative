import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home';
import Encrypt from '../screens/Encrypt';
import Decrypt from '../screens/Decrypt';


const app = createStackNavigator({
    home: { screen: Home, navigationOptions: ({ navigation }) => ({
        header:null
      }) 
    },
    encrypt: { screen: Encrypt, navigationOptions: ({ navigation }) => ({
        title: 'Encrypt Media',
        headerStyle:{height:70}
        }),  
    },
    decrypt: { screen: Decrypt, navigationOptions: ({ navigation }) => ({
        title: 'Decrypt Media',
        headerStyle:{height:70}
        }),
    } 
});
const AppContainer = createAppContainer(app);
// Now AppContainer is the main component for React to render
export default AppContainer;