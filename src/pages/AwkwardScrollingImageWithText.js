import React, {Component} from 'react';
import {Image, ScrollView, Text} from 'react-native';

class AwkwardScrollingImageWithText extends Component {
  render() {
    return (
      <ScrollView>
        <Image
          source={{uri: 'https://i.chzbgr.com/full/7345954048/h7E2C65F9/'}}
          style={{width: 320, height: 180}}
        />
        <Text>
          在iOS上，React Native的ScrollView组件封装的是原生的UIScrollView。
          在Android上，封装的则是原生的ScrollView。 在iOS上，React
          Native的Image组件封装的是原生的UIImageView。
          在Android上，封装的则是原生的ImageView。 React
          Native封装了这些基础的原生组件，使你在得到媲美原生应用性能的同时，还能受益于React优雅的架构设计。
        </Text>
      </ScrollView>
    );
  }
}

export default AwkwardScrollingImageWithText;
