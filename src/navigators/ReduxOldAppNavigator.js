import React, {Component} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addNavigationHelpers, NavigationActions} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {addListener} from '../utils/redux';

class LoginScreen extends Component {
  render() {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }
}
class MainScreen extends Component {
  render() {
    return (
      <View>
        <Text>Main</Text>
      </View>
    );
  }
}
class ProfileScreen extends Component {
  render() {
    return (
      <View>
        <Text>Profile</Text>
      </View>
    );
  }
}
class ThirdScreen extends Component {
  render() {
    return (
      <View>
        <Text>Third</Text>
      </View>
    );
  }
}

export const AppNavigator = createStackNavigator({
  Login: {screen: LoginScreen},
  Main: {screen: MainScreen},
  Profile: {screen: ProfileScreen},
  ThirdScreen: {screen: ThirdScreen},
});

class AppWithNavigationState extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  render() {
    const {dispatch, nav} = this.props;
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
