import React, {Component} from 'react';
import {Text, Clipboard, View, TouchableOpacity} from 'react-native';

export default class CopyContentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copyStr: '我是复制内容',
    };
  }

  async copyContent() {
    const {copyStr} = this.state;
    Clipboard.setString(copyStr);
    let str = await Clipboard.getString();
    console.warn(str);
  }

  render() {
    const {copyStr} = this.state;
    return (
      <View>
        <Text style={{fontSize: 26}}>{copyStr} </Text>
        <TouchableOpacity onPress={this.copyContent.bind(this)}>
          <Text style={{fontSize: 26}}>复制 </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
