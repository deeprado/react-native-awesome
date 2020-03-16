import React, {Component} from 'react';
import {Text, View} from 'react-native';

class WhyReactNativeIsSoGreat extends Component {
  render() {
    return (
      <View>
        <Text>如果你喜欢在Web上使用React，那你也肯定会喜欢React Native.</Text>
        <Text>
          基本上就是用原生组件比如'View'和'Text' 来代替web组件'div'和'span'。
        </Text>
      </View>
    );
  }
}

export default WhyReactNativeIsSoGreat;
