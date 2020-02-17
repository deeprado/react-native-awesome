import React, {Component} from 'react';
import {View, Text, Animated, StyleSheet, TouchableOpacity} from 'react-native';

class AnimatedComp extends Component {
  state = {
    bounceValue: new Animated.Value(1),
  };

  componentDidMount() {
    // 监听bounceValue衰变过程
    this.state.bounceValue.addListener(state => {
      console.log('bounceValue=>' + state.value);
    });
    this.state.bounceValue.stopAnimation(state => {
      console.log('bounceValue=>' + state.value);
    });
  }

  _onPress = () => {
    Animated.decay(this.state.bounceValue, {
      velocity: 0.02, // 起始速度，必填参数。
      deceleration: 0.997, // 速度衰减比例，默认为0.997。
    }).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.viewStyle,
            {
              transform: [{scale: this.state.bounceValue}],
            },
          ]}>
          <Text>Hello RN!</Text>
        </Animated.View>

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
