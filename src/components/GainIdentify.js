import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export default class GainIdentify extends Component {
  static propTypes = {
    action: PropTypes.func,
    time: PropTypes.number,
  };

  static defaultProps = {
    action: function() {
      console.log('未定义方法');
    },
    time: 60,
  };
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      timing: this.props.time,
    };
  }

  componentWillUnmount() {
    this.state.timer && clearTimeout(this.state.timer);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.codeBtn}
        activeOpacity={1}
        onPress={
          this.state.timing === this.props.time ? this.timeout.bind(this) : null
        }>
        <Text>
          {this.state.timing === this.props.time
            ? '获取验证码'
            : this.state.timing + 's'}
        </Text>
      </TouchableOpacity>
    );
  }

  countDown() {
    if (this.state.timing === 0) {
      this.setState({
        timing: 60,
      });
    } else {
      this.setState({
        timing: this.state.timing - 1,
      });
      //这里使用 setTimeout 不是因为不知道setInterval 而是因为setInterval 固有的缺陷
      // 相亲请移步到 https://www.jianshu.com/p/db9caa6bd2b1 中的超时调用一节
      setTimeout(this.countDown.bind(this), 1000);
    }
  }
  timeout() {
    try {
      if (typeof this.props.action === 'function') {
        //是函数    其中 FunName 为函数名称
        this.props.action();
      } else {
        //不是函数
        //alert("not is function");
        console.log('action not is function');
      }
    } catch (e) {}
    this.countDown();
  }
}

const styles = StyleSheet.create({
  codeBtn: {
    alignItems: 'center',
    marginLeft: 10,
    width: 90,
  },
});
