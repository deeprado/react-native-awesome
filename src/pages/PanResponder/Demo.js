import React from 'react';
import {View, StyleSheet, PanResponder, Text} from 'react-native';

export default class Demo extends React.Component {
  pan1 = PanResponder.create({
    onStartShouldSetPanResponderCapture: (_, $gs) => {
      console.log(JSON.stringify($gs));
      console.log(
        '%cpan1',
        'color:orange',
        'onStartShouldSetPanResponderCapture',
      );
    },
    onStartShouldSetPanResponder: () => {
      console.log('%cpan1', 'color:orange', 'onStartShouldSetPanResponder');
      return true;
    },
    onMoveShouldSetPanResponderCapture: () => {
      console.log(
        '%cpan1',
        'color:orange',
        'onMoveShouldSetPanResponderCapture',
      );
    },
    onMoveShouldSetPanResponder: () => {
      console.log('%cpan1', 'color:orange', 'onMoveShouldSetPanResponder');
    },
    onPanResponderTerminationRequest: () => {
      console.log('%cpan1', 'color:orange', 'onPanResponderTerminationRequest');
    },
    onPanResponderGrant: () => {
      console.log('%cpan1', 'color:orange', 'onPanResponderGrant');
    },
    onPanResponderMove: (_, $gs) => {
      console.log(JSON.stringify($gs));
      console.log('%cpan1', 'color:orange', 'onPanResponderMove');
    },
    onPanResponderRelease: () => {
      console.log('%cpan1', 'color:orange', 'onPanResponderRelease');
    },
  });

  pan2 = PanResponder.create({
    onStartShouldSetPanResponderCapture: () => {
      console.log(
        '%cpan2',
        'color:orange',
        'onStartShouldSetPanResponderCapture',
      );
    },
    onStartShouldSetPanResponder: () => {
      console.log('%cpan2', 'color:orange', 'onStartShouldSetPanResponder');
    },
    onMoveShouldSetPanResponderCapture: () => {
      console.log(
        '%cpan2',
        'color:orange',
        'onMoveShouldSetPanResponderCapture',
      );
      // return true
    },
    onMoveShouldSetPanResponder: () => {
      console.log('%cpan2', 'color:orange', 'onMoveShouldSetPanResponder');
    },
    onPanResponderTerminationRequest: () => {
      console.log('%cpan2', 'color:orange', 'onPanResponderTerminationRequest');
    },
    onPanResponderGrant: () => {
      console.log('%cpan2', 'color:orange', 'onPanResponderGrant');
    },
    onPanResponderMove: () => {
      console.log('%cpan2', 'color:orange', 'onPanResponderMove');
    },
    onPanResponderRelease: () => {
      console.log('%cpan2', 'color:orange', 'onPanResponderRelease');
    },
  });

  pan3 = PanResponder.create({
    onStartShouldSetPanResponderCapture: () => {
      console.log(
        '%cpan3',
        'color:orange',
        'onStartShouldSetPanResponderCapture',
      );
    },
    onStartShouldSetPanResponder: () => {
      console.log('%cpan3', 'color:orange', 'onStartShouldSetPanResponder');
    },
    onMoveShouldSetPanResponderCapture: () => {
      console.log(
        '%cpan3',
        'color:orange',
        'onMoveShouldSetPanResponderCapture',
      );
    },
    onMoveShouldSetPanResponder: () => {
      console.log('%cpan3', 'color:orange', 'onMoveShouldSetPanResponder');
    },
    onPanResponderTerminationRequest: () => {
      console.log('%cpan3', 'color:orange', 'onPanResponderTerminationRequest');
    },
    onPanResponderGrant: () => {
      console.log('%cpan3', 'color:orange', 'onPanResponderGrant');
    },
    onPanResponderMove: () => {
      console.log('%cpan3', 'color:orange', 'onPanResponderMove');
    },
    onPanResponderRelease: () => {
      console.log('%cpan3', 'color:orange', 'onPanResponderRelease');
    },
  });

  render() {
    return (
      <View style={styles.pan1} {...this.pan1.panHandlers}>
        <View style={styles.pan2} {...this.pan2.panHandlers}>
          <View style={styles.pan3} {...this.pan3.panHandlers}>
            <Text>responder 询问模型详解</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pan1: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  pan2: {
    height: 200,
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
  pan3: {
    height: 100,
    backgroundColor: 'blue',
  },
});
