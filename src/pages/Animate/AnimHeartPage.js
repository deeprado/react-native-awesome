import React from 'react';
import {PanResponder, View, StyleSheet} from 'react-native';
import AnimHeart from '../../components/AnimHeart';
import shortid from 'shortid';

class AnimHeartPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heartList: [],
    };
    this.tapStartTime = null;
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: this._onPanResponderGrant,
    });
  }

  panDemo = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderGrant: this._onPanResponderGrant,
  });

  _onPanResponderGrant = ev => {
    console.log(ev);
    if (!this.isDoubleTap()) {
      return;
    }
    const {pageX, pageY} = ev.nativeEvent;

    // 设置位置数据，渲染AnimHeart组件
    this.setState(({heartList}) => {
      heartList.push({
        x: pageX - 60,
        y: pageY - 60,
        key: shortid.generate(), // 使用shortid生成唯一的key值
      });
      return {
        heartList,
      };
    });
  };

  // 检测是否为双击
  isDoubleTap() {
    const curTime = +new Date();
    if (!this.tapStartTime || curTime - this.tapStartTime > 300) {
      this.tapStartTime = curTime;
      return false;
    }
    this.tapStartTime = null;
    return true;
  }

  render() {
    return (
      <View {...this._panResponder.panHandlers} style={styles.container}>
        {this.state.heartList.map(({x, y, key}, index) => {
          return (
            <AnimHeart
              onEnd={() => {
                // 动画完成后销毁组件
                this.setState(({heartList}) => {
                  heartList.splice(index, 1);
                  return {
                    heartList,
                  };
                });
              }}
              key={key} // 不要使用index作为key值
              x={x}
              y={y}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 2,
  },
});

export default AnimHeartPage;
