import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';

class Notice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notices: [
        {
          id: 1,
          content:
            '【听书功能上线】期待已久的听书功能上线啦！解放双手，随时随机追小说~点击查看详情',
          dateTime: '2019-11-07 19:57:34',
        },
        {
          id: 2,
          content:
            '【听书功能上线】期待已久的听书功能上线啦！解放双手，随时随机追小说~点击查看详情',
          dateTime: '2019-11-07 19:57:34',
        },
        {
          id: 3,
          content:
            '【听书功能上线】期待已久的听书功能上线啦！解放双手，随时随机追小说~点击查看详情',
          dateTime: '2019-11-07 19:57:34',
        },
      ],
    };
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
        <Text style={{color: '#000', fontWeight: '700', fontSize: 24}}>
          消息通知
        </Text>
      </View>
    );
  }

  _keyExtractor = (item, index) => item.id.toString();

  _separator = () => {
    // 再刷新or加载的时候进行的动画或者文字效果
    return (
      <View
        style={{height: 1, borderBottomColor: '#F3F3F3', borderBottomWidth: 1}}
      />
    );
  };

  _renderNoticeItem = row => {
    let item = row.item;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          paddingBottom: 10,
          paddingTop: 5,
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <View
          style={{width: 40, justifyContent: 'center', alignItems: 'center'}}>
          <Icon name="volume-2" type="feather" size={24} color="#383838" />
        </View>
        <View>
          <View>
            <Text style={{fontSize: 20, color: '#676767'}}>{item.content}</Text>
          </View>
          <View style={{marginTop: 5}}>
            <Text style={{fontSize: 16, color: '#676767'}}>
              {item.dateTime}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#fff'}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
        />

        <View style={{}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.notices}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderNoticeItem}
            ItemSeparatorComponent={this._separator}
            initialNumToRender={3}
            numColumns={1}
            flashScrollIndicators={true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default Notice;
