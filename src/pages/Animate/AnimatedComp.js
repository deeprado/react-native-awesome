import React, {Component} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Easing,
  TouchableOpacity,
} from 'react-native';

class AnimatedComp extends Component {
  state = {
    fadeInOpacity: new Animated.Value(0.1),
    opcity: 0.6,
  };

  _onPress = () => {
    let that = this;
    Animated.timing(this.state.fadeInOpacity, {
      toValue: that.state.opcity,
      easing: Easing.linear,
      duration: 3000,
    }).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.viewStyle,
            {
              opacity: this.state.fadeInOpacity,
            },
          ]}
        />

        <TouchableOpacity
          style={styles.btnContainerStyle}
          onPress={this._onPress}>
          <Text style={{color: '#FFFFFF'}}>触发动画</Text>
        </TouchableOpacity>
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
  viewStyle: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'green',
  },
  btnContainerStyle: {
    width: 100,
    height: 30,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default AnimatedComp;
