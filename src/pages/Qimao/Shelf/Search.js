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

class Search extends Component {
  render() {
    return (
      <View>
        <Text>搜索</Text>
      </View>
    );
  }
}

export default Search;
