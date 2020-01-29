import React, {PureComponent, Component} from 'react';
import {StyleSheet, Text, View, PanResponder} from 'react-native';

export default class TouchStartAndRelease extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'red',
      marginTop: 100,
      marginLeft: 100,
    };
    this.lastX = this.state.marginLeft;
    this.lastY = this.state.marginTop;
  }

  UNSAFE_componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      onPanResponderGrant: (evt, gestureState) => {
        this._highlight();
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log(
          `gestureState.dx : ${gestureState.dx}   gestureState.dy : ${gestureState.dy}`,
        );
        this.setState({
          marginLeft: this.lastX + gestureState.dx,
          marginTop: this.lastY + gestureState.dy,
        });
      },
      onPanResponderRelease: (evt, gestureState) => {
        this._unhighlight();
        this.lastX = this.state.marginLeft;
        this.lastY = this.state.marginTop;
      },
      onPanResponderTerminate: (evt, gestureState) => {},
    });
  }

  _unhighlight() {
    this.setState({
      backgroundColor: 'red',
    });
  }

  _highlight() {
    this.setState({
      backgroundColor: 'blue',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.redView,
            {
              backgroundColor: this.state.backgroundColor,
              marginTop: this.state.marginTop,
              marginLeft: this.state.marginLeft,
            },
          ]}
          {...this._panResponder.panHandlers}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  redView: {
    width: 100,
    height: 100,
  },
});
