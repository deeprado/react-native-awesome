import React, {Component} from 'react';
import {StyleSheet, StatusBar, Platform} from 'react-native';
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

const images = [
  {
    // Simplest usage.
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

    // width: number
    // height: number
    // Optional, if you know the image size, you can set the optimization performance

    // You can pass props to <Image />.
    props: {
      // headers: ...
    },
  },
  {
    url: '',
    props: {
      // Or you can set source directory.
      source: require('../assets/image/logo.png'),
    },
  },
];

class HomeScreen extends Component {
  static navigationOptions = {
    tabBarLabel: '首页',
    headerTitle: '首页',
  };
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      isAndroid && StatusBar.setBackgroundColor('#6a51ae');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  updateSearch = search => {
    this.setState({search});
  };

  render() {
    const {search} = this.state;
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
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
