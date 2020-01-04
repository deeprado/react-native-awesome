'use strict';

import React, {
  PureComponent,
  Component
} from 'react'
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  processColor,
} from 'react-native'


var CIRCLE_SIZE = 80;

class PanResponderExample extends Component {

  // statics: {
  //   title: 'PanResponder Sample',
  //   description: 'Shows the use of PanResponder to provide basic gesture handling.',
  // },

  constructor(props) {
    super(props);
    this.state = {
      _panResponder: {},
      _previousLeft: 0,
      _previousTop: 0,
      _circleStyles: {},
      circle: (null: ? {
        setNativeProps(props: Object): void
      }),
    }
  }


  componentWillMount() {
    this.state._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.state._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.state._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this.state._handlePanResponderGrant,
      onPanResponderMove: this.state._handlePanResponderMove,
      onPanResponderRelease: this.state._handlePanResponderEnd,
      onPanResponderTerminate: this.state._handlePanResponderEnd,
    });
    this.state._previousLeft = 20;
    this.state._previousTop = 84;
    this.state._circleStyles = {
      style: {
        left: this.state._previousLeft,
        top: this.state._previousTop,
        backgroundColor: 'green',
      }
    };
  }

  componentDidMount() {
    this.state._updateNativeStyles();
  }

  render() {
    return (
      <View style = {styles.container} >
      <View ref = {(circle) => {
          this.state.circle = circle;
        }}
      style = {styles.circle} {
        ...this.state._panResponder.panHandlers
      }
      /> </View>
    );
  },

  _highlight() {
    this.state._circleStyles.style.backgroundColor = 'blue';
    this.state._updateNativeStyles();
  }

  _unHighlight() {
    this.state._circleStyles.style.backgroundColor = 'green';
    this.state._updateNativeStyles();
  }

  _updateNativeStyles() {
    this.state.circle && this.state.circle.setNativeProps(this.state._circleStyles);
  },

  _handleStartShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    // Should we become active when the user presses down on the circle?
    return true;
  },

  _handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    // Should we become active when the user moves a touch over the circle?
    return true;
  },

  _handlePanResponderGrant(e: Object, gestureState: Object) {
    this.state._highlight();
  },
  _handlePanResponderMove(e: Object, gestureState: Object) {
    this.state._circleStyles.style.left = this.state._previousLeft + gestureState.dx;
    this.state._circleStyles.style.top = this.state._previousTop + gestureState.dy;
    this.state._updateNativeStyles();
  },
  _handlePanResponderEnd (e: Object, gestureState: Object) {
    this.state._unHighlight();
    this.state._previousLeft += gestureState.dx;
    this.state._previousTop += gestureState.dy;
  },
});

var styles = StyleSheet.create({
      circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        position: 'absolute',
        left: 0,
        top: 0,
      },
      container: {
        flex: 1,
        paddingTop: 64,
      },
    }
);

    export default PanResponderExample;
