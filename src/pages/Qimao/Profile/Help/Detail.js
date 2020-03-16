import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';
import {WebView} from 'react-native-webview';

const urlList = [
  {
    id: 1,
    title: '新用户如何获得新用户红包并提现？',
    url: 'https://www.baidu.com',
  },
  {
    id: 2,
    title: '如何邀请好友？',
    url: 'https://www.baidu.com',
  },
  {
    id: 3,
    title: '如何对阅读器界面进行调整？',
    url: 'https://www.baidu.com',
  },
  {
    id: 4,
    title: '如何开启听书功能？',
    url: '',
  },
  {
    id: 5,
    title: '重装APP之后如何找回之前书架上的书？',
    url: 'https://www.baidu.com',
  },
  {
    id: 6,
    title: '版权声明',
    url: 'https://www.baidu.com',
  },
];

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      title: '',
    };
  }

  componentDidMount() {
    let that = this;
    let params = this.props.navigation.state.params;
    let id = params.id ? params.id : 1;
    urlList.map(function(item, index) {
      if (item.id === id) {
        that.setState({
          url: item.url,
          title: item.title,
        });
      }
    });
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  renderLeftComponent() {
    return (
      <Icon
        name="left"
        color="#9D9D9D"
        type="antdesign"
        onPress={this.goBack}
      />
    );
  }

  renderRightComponent() {
    return null;
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#000', fontSize: 22}} numberOfLines={1}>
          {this.state.title}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#fff'}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
        />
        <WebView source={{uri: this.state.url}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F5F5F5',
  },
  linearGradient: {},
});

export default Detail;
