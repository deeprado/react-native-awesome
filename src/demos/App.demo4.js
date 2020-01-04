/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

import IndexPage from '../pages/IndexPage';
import MyPage from '../pages/MyPage';
import SplashPage from '../pages/SplashPage';
import CartPage from '../pages/CartPage';
import CategoryPage from '../pages/CategoryPage';

const AppNavigator = createStackNavigator(
  {
    SplashPage: {
      screen: SplashPage,
      navigationOptions: {
        gesturesEnabled: true,
        headerTitle: null,
      },
    },
    IndexPage: {
      screen: IndexPage,
      navigationOptions: {
        gesturesEnabled: true,
        headerTitle: null,
      },
    },
    Home: {
      screen: IndexPage,
      navigationOptions: {
        gesturesEnabled: true,
        headerTitle: null,
      },
    },
    CategoryPage: {
      screen: CategoryPage,
      navigationOptions: {
        gesturesEnabled: true,
        headerTitle: null,
      },
    },
    CartPage: {
      screen: CartPage,
      navigationOptions: {
        gesturesEnabled: true,
        headerTitle: null,
      },
    },
    MyPage: {
      screen: MyPage,
      navigationOptions: {
        gesturesEnabled: true,
        // headerTitle: null,
      },
    },
  },
  {
    mode: 'card',
    // headerMode: 'none',
    initialRouteName: 'SplashPage',
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    }),
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

class ModalScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 30}}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Main: {
      screen: AppNavigator,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#000',
      },
    },
    navigationOptions: {
      tabBarLabel: 'Home!',
    },
  },
);

export default createAppContainer(RootStack);
// export default class App extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }
