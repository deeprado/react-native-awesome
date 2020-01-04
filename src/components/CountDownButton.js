'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  TouchableOpacity,
  ViewPropTypes,
  StyleSheet,
} from 'react-native';

const defaultShowText = '获取验证码';
export default class CountDownButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerCount: this.props.timerCount || 60,
      timerTitle: this.props.timerTitle || defaultShowText,
      counting: false,
      selfEnable: true,
    };
    this._shouldStartCount = this._shouldStartCount.bind(this);
    this._countDownAction = this._countDownAction.bind(this);
  }

  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    onClick: PropTypes.func,
    disableColor: PropTypes.string,
    timerTitle: PropTypes.string,
    enable: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    timerEnd: PropTypes.func,
    timerActiveTitle: PropTypes.array,
    executeFunc: PropTypes.func,
  };

  _countDownAction() {
    const codeTime = this.state.timerCount;
    const {timerActiveTitle, timerTitle} = this.props;
    const now = Date.now();
    const overTimeStamp = now + codeTime * 1000 + 100;
    /*过期时间戳（毫秒） +100 毫秒容错*/
    this.interval = setInterval(() => {
      const nowStamp = Date.now();
      if (nowStamp >= overTimeStamp) {
        this.interval && clearInterval(this.interval);
        this.setState({
          timerCount: codeTime,
          timerTitle: timerTitle || defaultShowText,
          counting: false,
          selfEnable: true,
        });
        if (this.props.timerEnd) {
          this.props.timerEnd();
        }
      } else {
        const leftTime = parseInt((overTimeStamp - nowStamp) / 1000, 10);
        let activeTitle = `重新获取(${leftTime}s)`;
        if (timerActiveTitle) {
          if (timerActiveTitle.length > 1) {
            activeTitle = timerActiveTitle[0] + leftTime + timerActiveTitle[1];
          } else if (timerActiveTitle.length > 0) {
            activeTitle = timerActiveTitle[0] + leftTime;
          }
        }
        this.setState({
          timerCount: leftTime,
          timerTitle: activeTitle,
        });
      }
    }, 1000);
  }

  _shouldStartCount(shouldStart) {
    if (this.state.counting) {
      return;
    }
    if (shouldStart) {
      this._countDownAction();
      this.setState({counting: true, selfEnable: false});
    } else {
      this.setState({selfEnable: true});
    }
  }

  componentDidMount() {
    const {executeFunc} = this.props;
    executeFunc && executeFunc(this._shouldStartCount);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {onClick, style, textStyle, enable, disableColor} = this.props;
    const {counting, timerTitle, selfEnable} = this.state;
    return (
      <View style={[{width: 90, height: 34}, style]}>
        <TouchableOpacity
          activeOpacity={counting ? 1 : 0.8}
          onPress={() => {
            if (!counting && enable && selfEnable) {
              this.setState({selfEnable: false});
              onClick(this._shouldStartCount);
            }
          }}
          style={[
            styles.container,
            {
              backgroundColor:
                !counting && enable && selfEnable
                  ? 'red'
                  : disableColor || '#ccc',
            },
          ]}>
          <Text style={[styles.defaultText, textStyle]}>{timerTitle}</Text>
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
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'white',
  },
  defaultText: {
    fontSize: 14,
    color: 'white',
  },
});
