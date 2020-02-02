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
  static navigationOptions = {
    title: '搜索',
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>搜索</Text>
      </View>
    );
  }
}

export default Search;
