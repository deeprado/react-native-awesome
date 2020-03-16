import React, {Component} from 'react';
import {View, Image, StyleSheet, Dimensions, StatusBar} from 'react-native';

const launcherPng = require('../../../assets/qimao/image/launcher.jpg');

const {width, height} = Dimensions.get('window');
class Index extends Component {
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
      this.props.navigation.navigate('AdPage');
      this.timer && clearTimeout(this.timer);
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} hidden={true} animated={true} />
        <Image source={launcherPng} style={styles.launcher} />
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
  launcher: {
    width: width,
    height: height,
  },
});

export default Index;
