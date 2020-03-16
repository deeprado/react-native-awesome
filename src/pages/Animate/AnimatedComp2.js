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
    translateXYValue: new Animated.ValueXY({x: 0, y: 0}),
  };

  _onPress = () => {
    Animated.timing(this.state.translateXYValue, {
      toValue: {x: -100, y: 0},
      easing: Easing.linear,
      duration: 1000,
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
                {translateX: this.state.translateXYValue.x}, // x轴移动
                {translateY: this.state.translateXYValue.y}, // y轴移动
              ],
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
    position: 'absolute',
    right: 0,
    top: 0,
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
