import React, {Component} from 'react';
import {View, Text, Animated, StyleSheet, TouchableOpacity} from 'react-native';

class AnimatedComp extends Component {
  state = {
    translateValue: new Animated.Value(1),
  };

  _onPress = () => {
    Animated.spring(this.state.translateValue, {
      toValue: 0,
      velocity: 0,
      bounciness: 10,
      speed: 12,
    }).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.viewStyle,
            {
              transform: [
                {
                  scale: this.state.translateValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 3],
                  }),
                },
                {
                  translateX: this.state.translateValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 50],
                  }),
                },
                {
                  rotate: this.state.translateValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '720deg'],
                  }),
                },
              ],
            },
          ]}></Animated.View>

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
