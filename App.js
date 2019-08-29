import React, {Component} from 'react';
import srcHomeShop from './src/scr/srcHomeShop';
import srcCart from './src/scr/srcCart';
import {createStackNavigator, createAppContainer} from 'react-navigation';

const AppNavigator = createStackNavigator({
  Home: srcHomeShop,
  Cart: srcCart,
});

AppNavigator.path = '';

export default createAppContainer(AppNavigator);
