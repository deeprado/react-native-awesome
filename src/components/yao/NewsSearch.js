import React, {Component} from 'react';

import {StyleSheet, View, Text, TextInput, PixelRatio} from 'react-native';

const onePT = 1 / PixelRatio.get();

export default class NewsSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      show: true,
    };
  }

  getValue(text) {
    this.setState({
      show: true,
      value: text,
    });
  }
  hide(text) {
    this.setState({
      show: false,
      value: text,
    });
  }

  render() {
    return (
      <View style={styles.flex}>
        <View style={styles.flexDirection}>
          <View style={[styles.flex, styles.input]}>
            <TextInput
              returnKeyType="search"
              keyboardType="web-search"
              placeholder="请输入关键词"
              value={this.state.value}
              onChangeText={this.getValue.bind(this)}
            />
          </View>
          <View style={styles.btn}>
            <Text
              style={styles.search}
              onPress={this.hide.bind(this, this.state.value)}>
              搜索
            </Text>
          </View>
        </View>
        {this.state.show ? (
          <View style={styles.result}>
            <Text
              onPress={this.hide.bind(this, this.state.value + 'qq')}
              numberOfLines={1}
              style={styles.item}>
              {this.state.value + 'qq'}
            </Text>
            <Text
              onPress={this.hide.bind(this, this.state.value + 'qq')}
              numberOfLines={1}
              style={styles.item}>
              {this.state.value + 'qq'}
            </Text>
            <Text
              onPress={this.hide.bind(this, this.state.value + 'qq')}
              numberOfLines={1}
              style={styles.item}>
              {this.state.value + 'qq'}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flexDirection: {
    flexDirection: 'row',
  },
  input: {
    height: 45,
    borderColor: 'blue',
    borderWidth: 1,
    marginLeft: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
  btn: {
    width: 80,
    marginLeft: -5,
    marginRight: 5,
    marginTop: -1,
    backgroundColor: '#23BEFF',
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  result: {
    marginLeft: 15,
    marginTop: 0,
  },
  item: {},
});
