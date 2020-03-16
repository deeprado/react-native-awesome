import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import {Header, Text, Icon, ThemeProvider, Image} from 'react-native-elements';
const {width, height} = Dimensions.get('window');

class Pencil extends Component {
  render() {
    return (
      <View>
        <Text>签到</Text>
      </View>
    );
  }
}

export default Pencil;
