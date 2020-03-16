import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

class LayoutAnimationComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 100,
      height: 100,
    };
    if (Platform.OS == 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  UNSAFE_componentWillUpdate() {
    LayoutAnimation.configureNext(
      {
        duration: 1000, // 动画持续时间默认值
        update: {
          duration: 3000, // 动画持续时间，没有设置时使用配置的默认值(即1000毫秒)
          delay: 0, // 动画延时执行时间
          type: LayoutAnimation.Types.spring, // 动画类型: spring弹性|linear线性|easeInEaseOut缓出缓入|easeIn缓入|easeOut缓出
          springDamping: 0.4, // 弹跳动画阻尼系数，配合动画类型为spring使用
          property: LayoutAnimation.Properties.scaleXY, // 动画特性: opacity透明度|scaleXY缩放
        },
      },
      () => {
        console.log('onAnimationDidEnd'); // 当动画结束的时候被调用。只在iOS设备上支持。
      },
      () => {
        console.log('onError'); // 当动画产生错误的时候被调用。只在iOS设备上支持。
      },
    );
  }

  _onPress = () => {
    this.setState({
      width: this.state.width + 50,
      height: this.state.height + 50,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.viewStyle,
            {width: this.state.width, height: this.state.height},
          ]}>
          <Text>Hello RN!</Text>
        </View>

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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
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

export default LayoutAnimationComp;
