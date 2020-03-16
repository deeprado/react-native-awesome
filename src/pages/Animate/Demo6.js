import React from 'react';
import {
  Animated,
  StyleSheet,
  View,
  PanResponder,
  TouchableOpacity,
  LayoutAnimation,
  ScrollView,
  Text,
} from 'react-native';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //设置初值
      marginBottom: 0,
    };
  }
  _textUp() {
    LayoutAnimation.spring();
    this.setState({marginBottom: this.state.marginBottom + 100});
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this._textUp()}
          style={{
            width: 120,
            height: 40,
            alignItems: 'center',
            marginBottom: this.state.marginBottom,
            justifyContent: 'center',
            backgroundColor: '#00ffff',
            borderRadius: 20,
          }}>
          <Text>Text UP</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
export default Demo;
