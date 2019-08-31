import {StyleSheet} from 'react-native';
import srcHomeShop from './src/scr/srcHomeShop';
import srcCart from './src/scr/srcCart';
import {createStackNavigator, createAppContainer} from 'react-navigation';

const AppNavigator = createStackNavigator({
  Home: srcHomeShop,
  Cart: srcCart,
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
