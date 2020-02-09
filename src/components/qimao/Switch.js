import React, {Component} from 'react';
import {StyleSheet, Animated, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 50,
    borderRadius: 15,
    backgroundColor: '#32CDFF',
  },
  scaleBg: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: '#E7E8EA',
  },
  toggleBtn: {
    height: 28,
    width: 28,
    backgroundColor: 'white',
    borderRadius: 14,
    position: 'absolute',
    top: 1,
  },
});

const sceneScale = 1;

class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleOn: false,
    };
    this.toggerPostion = new Animated.Value(1);
    this.scaleBg = new Animated.Value(1);
  }

  componentDidMount() {
    const {value} = this.props;
    if (value) {
      this.setState({toggleOn: true});
      Animated.timing(this.scaleBg, {toValue: 0.1, duration: 400}).start();
      Animated.spring(this.toggerPostion, {
        toValue: sceneScale * (50 - 29),
      }).start();
    }
  }

  toggleSwitch = () => {
    const {onPress, useOnce, onValueChange} = this.props;
    if (this.state.toggleOn && useOnce === undefined) {
      this.setState({
        toggleOn: false,
      });
      Animated.spring(this.toggerPostion, {toValue: 1}).start();
      Animated.timing(this.scaleBg, {toValue: 1, duration: 400}).start();
      onValueChange(false);
    } else {
      this.setState({
        toggleOn: true,
      });
      Animated.spring(this.toggerPostion, {
        toValue: sceneScale * (50 - 29),
      }).start();
      Animated.timing(this.scaleBg, {toValue: 0.0, duration: 400}).start();

      if (onPress) {
        setTimeout(() => {
          onPress();
        }, 400);
      }
      onValueChange(true);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.toggleSwitch();
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container]}
        onPress={this.toggleSwitch}
        activeOpacity={1}>
        <Animated.View
          style={[
            styles.scaleBg,
            {transform: [{scale: this.scaleBg}]},
          ]}></Animated.View>
        <Animated.View
          style={[
            styles.toggleBtn,
            {left: this.toggerPostion},
          ]}></Animated.View>
      </TouchableOpacity>
    );
  }
}

export default Switch;
