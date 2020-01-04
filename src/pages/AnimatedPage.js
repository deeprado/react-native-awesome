import React, {useState, useEffect} from 'react';
import {
  Animated,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Modal,
} from 'react-native';

const FadeInView = props => {
  const [fadeAnim] = React.useState(new Animated.Value(0)); // 透明度初始值设为0

  React.useEffect(() => {
    Animated.timing(
      // 随时间变化而执行动画
      fadeAnim, // 动画中的变量值
      {
        toValue: 1, // 透明度最终变为1，即完全不透明
        duration: 10000, // 让动画持续一段时间
      },
    ).start(); // 开始执行动画
  }, []);

  return (
    <Animated.View // 使用专门的可动画化的View组件
      style={{
        ...props.style,
        opacity: fadeAnim, // 将透明度绑定到动画变量值
      }}>
      {props.children}
    </Animated.View>
  );
};

// 然后你就可以在组件中像使用`View`那样去使用`FadeInView`了
export default class AnimatedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: false,
      loaded: false,
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.setState({
      animating: true,
      modalVisible: true,
    });
    this.timer = setTimeout(() => {
      this.setState({
        loaded: true,
      });
    }, 2000);
  }

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
  }

  render() {
    if (!this.state.loaded) {
      return (
        <View style={styles.container}>
          <Modal
            animationType={'fade'}
            visible={this.state.modalVisible}
            transparent={true}
            onRequestClose={() => {
              // alert("Modal has been closed.");
            }}>
            <ActivityIndicator
              style={styles.loadingStyle}
              size="large" // 指示器的大小
              color="#1a94fc" // 滚轮的前景颜色
              animating={this.state.animating} // 是否要显示指示器动画 true表示显示 false隐藏
              hidesWhenStopped={true} // 在animating为false的时候，是否要隐藏指示器
            />
          </Modal>
        </View>
      );
    }
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FadeInView
          style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
          <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>
            Fading in
          </Text>
        </FadeInView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loadingStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
