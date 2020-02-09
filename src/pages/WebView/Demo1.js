import React, {Component} from 'react';
import {StyleSheet, View, ProgressViewIOS} from 'react-native';
import {WebView} from 'react-native-webview';

export default class WebViewDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleBar} />

        {this.state.progress !== 1 && (
          <ProgressViewIOS
            //这是进度条颜色
            progressTintColor="red"
            progress={this.state.progress}
          />
        )}

        <WebView
          source={{uri: 'https://www.jianshu.com/u/df38c1b1414a'}}
          //设置进度 progress值为0～1
          onLoadProgress={({nativeEvent}) =>
            this.setState({progress: nativeEvent.progress})
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleBar: {
    height: 64,
    backgroundColor: '#ffc0cb',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
