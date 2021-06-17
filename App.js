import React from'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TransactionScreen from './bookTransactionScreen';
import SearchScreen from './searchScreen';
import LoginScreen from './LoginScreen';

export default class App extends React.Component {
  render(){
    return (
      <AppContainer />
    );
  }
}

var TabNavigator = createBottomTabNavigator({
  Transaction : {screen:TransactionScreen},
  Search:{screen:SearchScreen}
},
{
defaultNavigationOptions:({navigation}) => ({
  tabBarIcon:({}) => {
    const routeName = navigation.state.routeName;
    if(routeName === 'Transaction'){
      return(
        <Image
        source = {require('./assets/book.png')}
        style = {{
          width:40,
          height:40,
        }} />
      )
    }
    else if(routeName === 'Search'){
      return(
        <Image
        //source = {require('./assets/searchingBook.png')}
        style = {{
          width:40,
          height:40,
        }} />
      )
    } 
  }
})}
)

const SwitchNavigator = createSwitchNavigator({
  Login : {screen:LoginScreen},
  Tabs : {screen:TabNavigator}
})

const AppContainer = createAppContainer(SwitchNavigator);
