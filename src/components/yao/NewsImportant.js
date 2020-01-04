import React, {Component} from 'react';

import {StyleSheet, View, Text, Alert, TextInput, Button} from 'react-native';

export default class NewsImportant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      title: this.props.title ? this.props.title : '今日要闻',
      data: this.props.news ? this.props.news : [],
    };
  }

  _press = content => {
    Alert.alert(content);
  };

  _delete = content => {
    let news = this.state.data;
    news.forEach(function(item, index, arr) {
      if (item === content) {
        news.splice(index, 1);
      }
    });
    this.setState({
      data: news,
    });
  };

  addNews = () => {
    let newNews = this.state.data;
    newNews.push(this.state.content);
    this.setState({
      content: '',
      data: newNews,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.title}</Text>
        <View style={{marginBottom: 10}}>
          <TextInput
            placeholder="笔记内容"
            editable={true} //是否可编辑
            multiline={true} //多行输入
            value={this.state.content}
            maxLength={200}
            onChangeText={text => this.setState({content: text})}
          />
          <Button title="添加" onPress={this.addNews} />
        </View>

        {this.state.data.map((content, key) => {
          return (
            <View style={styles.list_item} key={key}>
              <Text
                style={styles.list_item_font}
                numberOfLines={1}
                onPress={() => this._press(content)}>
                {content}
              </Text>
              <Button
                style={styles.list_item_btn}
                title="删除"
                onPress={() => this._delete(content)}
              />
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginLeft: 10,
  },
  list_item: {
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  list_item_font: {
    fontSize: 16,
  },
  list_item_btn: {},
});
