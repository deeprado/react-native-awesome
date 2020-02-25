import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';

const logo = require('../../../static/img/logo.png');

export default class SplashPageExample extends Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      headerShown: false,
      title: params ? params.otherParam : 'A Nested Details Screen',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: '#fff',
    };
  };

  // 构造
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.navigation.navigate('SwitchPage');
      this.timer && clearTimeout(this.timer);
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
