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
    LayoutAnimation.spring();
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
