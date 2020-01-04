import React, {Component} from 'react';

import {StyleSheet, View, Text} from 'react-native';

export default class NewsList extends Component {
  render() {
    return (
      <View style={styles.list_item}>
        <Text style={styles.list_item_font}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list_item: {
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'center',
  },
  list_item_font: {
    fontSize: 16,
  },
});
