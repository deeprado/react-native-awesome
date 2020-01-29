import React, {Component} from 'react';
import {StyleSheet, View, Text, Clipboard, TextInput} from 'react-native';

export default class ClipboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {textFromClipboard: '', content: ''};
  }

  //从剪贴板种读取字符串
  pasteFromClipboard() {
    Clipboard.getString()
      .then(textFromClipboard => {
        this.setState({textFromClipboard});
      })
      .catch(error => {
        console.log(error);
      });
  }

  //从剪贴板中存入字符串
  copyToClipboard() {
    let con = this.state.content ? this.state.content : '欢迎访问我的简书。';
    Clipboard.setString(con);
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="笔记内容"
          editable={true} //是否可编辑
          multiline={true} //多行输入
          value={this.state.content}
          maxLength={200}
          onChangeText={text => this.setState({content: text})}
        />
        <View style={styles.second}>
          <Text
            style={styles.textStyle}
            onPress={this.copyToClipboard.bind(this)}>
            存入剪贴板
          </Text>

          <Text
            style={styles.textStyle}
            onPress={this.pasteFromClipboard.bind(this)}>
            读取剪贴板
          </Text>
        </View>

        <Text style={styles.info}>{this.state.textFromClipboard}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },

  second: {
    flexDirection: 'row',
  },

  textStyle: {
    textAlign: 'center',
    color: 'white',
    margin: 10,
    backgroundColor: '#4CA300',
    width: 140,
    fontSize: 20,
  },

  info: {
    fontSize: 18,
    margin: 10,
  },
});
