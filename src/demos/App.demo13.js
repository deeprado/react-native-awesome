import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  Button,
  StatusBar,
  Platform,
  View,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import SafeAreaView from 'react-native-safe-area-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeIconWithBadge from '../components/badge/HomeIconWithBadge';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

import MovieTalk from '../pages/Movie/MovieTalk';
import MovieDetail from '../pages/Movie/MovieDetail';

const isAndroid = Platform.OS === 'ios' ? false : true;

class HomeScreen extends Component {
  static navigationOptions = {
    tabBarLabel: '首页',
    headerTitle: '首页',
  };
  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      isAndroid && StatusBar.setBackgroundColor('#6a51ae');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
          <Text style={[styles.paragraph, {color: 'green'}]}>Light Screen</Text>
          <Button
            title="Next screen"
            onPress={() => this.props.navigation.navigate('Other')}
            color={isAndroid ? 'blue' : '#fff'}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paragraph: {},
});

const StackNavigator = createStackNavigator(
  {
    MovieTalk: {
      screen: MovieTalk,
      navigationOptions: {
        gesturesEnabled: true,
      },
    },
    MovieDetail: {
      screen: MovieDetail,
      navigationOptions: {
        gesturesEnabled: true,
      },
    },
  },
  {
    mode: 'card',
    // headerMode: 'none',
    initialRouteName: 'MovieTalk',
    tabBarLabel: '电影',
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    }),
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Other: StackNavigator,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Other') {
          iconName = `ios-stats`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

export default createAppContainer(TabNavigator);
