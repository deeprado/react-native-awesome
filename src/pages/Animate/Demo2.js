import React from 'react';
import {
  NativeModules,
  LayoutAnimation,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  View,
  Easing,
} from 'react-native';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends React.Component {
  state = {
    w: 100,
    h: 100,

    w1: new Animated.Value(10),
    h1: new Animated.Value(10),
  };

  _onPress = () => {
    // Animate the update
    LayoutAnimation.spring();
    this.setState({w: this.state.w + 15, h: this.state.h + 15});
  };

  _onPress1 = () => {
    // Animate the update
    // LayoutAnimation.spring();
    // this.setState({w1: this.state.w1 + 100, h1: this.state.h1 + 100});

    Animated.parallel([
      Animated.timing(this.state.w1, {
        toValue: 100,
        easing: Easing.linear,
        duration: 500,
      }),
      Animated.timing(this.state.h1, {
        toValue: 100,
        easing: Easing.linear,
        duration: 500,
      }),
    ]).start();
  };

  _onPress2 = () => {
    Animated.parallel([
      Animated.timing(this.state.w1, {
        toValue: 0,
        easing: Easing.linear,
        duration: 500,
      }),
      Animated.timing(this.state.h1, {
        toValue: 0,
        easing: Easing.linear,
        duration: 500,
      }),
    ]).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={[styles.box, {width: this.state.w, height: this.state.h}]}
        />
        <TouchableOpacity onPress={this._onPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Press me!</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: 'blue',
            height: 200,
            width: 200,
            position: 'relative',
          }}>
          <View
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              backgroundColor: 'green',
            }}>
            <Animated.View
              style={{
                width: this.state.w1,
                height: this.state.h1,
              }}
            />
          </View>
        </View>

        <TouchableOpacity onPress={this._onPress1}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Press me1!</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onPress2}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Press me2!</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
