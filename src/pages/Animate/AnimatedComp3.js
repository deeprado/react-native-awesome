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
    translateValue: new Animated.Value(1),
  };

  _onPress = () => {
    Animated.timing(this.state.translateValue, {
      toValue: 0,
      easing: Easing.linear,
      duration: 1000,
    }).start();
  };

  _onPress2 = () => {
    Animated.timing(this.state.translateValue, {
      toValue: 1,
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
                {
                  translateX: this.state.translateValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 0],
                  }),
                },
              ],
            },
          ]}
        />

        <TouchableOpacity
          style={styles.btnContainerStyle}
          onPress={this._onPress}>
          <Text style={{color: '#FFFFFF'}}>触发动画</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainerStyle}
          onPress={this._onPress2}>
          <Text style={{color: '#FFFFFF'}}>触发动画2</Text>
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
