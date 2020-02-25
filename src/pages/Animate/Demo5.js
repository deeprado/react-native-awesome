import React from 'react';
import {
  Animated,
  StyleSheet,
  View,
  PanResponder,
  ScrollView,
  Text,
} from 'react-native';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trans: new Animated.ValueXY(),
    };
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true, //响应手势
      onPanResponderMove: Animated.event(
        [null, {dx: this.state.trans.x, dy: this.state.trans.y}], // 绑定动画值
      ),
      onPanResponderRelease: () => {
        // 手松开，回到原始位置
        Animated.spring(this.state.trans, {toValue: {x: 0, y: 0}}).start();
      },
      onPanResponderTerminate: () => {
        // 手势中断，回到原始位置
        Animated.spring(this.state.trans, {toValue: {x: 0, y: 0}}).start();
      },
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: 'red',
            transform: [
              {translateY: this.state.trans.y},
              {translateX: this.state.trans.x},
            ],
          }}
          {...this._panResponder.panHandlers}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
export default Demo;
