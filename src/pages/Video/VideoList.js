'use strict';

import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class VideoList extends Component {
  static navigationOptions = {
    title: '视频列表',
  };

  constructor(props) {
    super(props);
    this.state = {
      videos: [],
    };

    this.onPress = this.onPress.bind(this);
  }

  componentDidMount() {
    this.initData();
  }

  initData() {
    let max = 20;
    let videos = [];
    let colors = ['blue', 'green', 'red'];
    for (var i = 0; i < max; i++) {
      var tmp = {
        id: i + 1,
        title:
          '啊时代发生的发啊时代发生的发是的啊沙发上的啊时代发生的发啊时代发生的发是的啊沙发上的啊时代发生的发啊时代发生的发是的啊沙发上的',
        url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        color: colors[i % 3],
      };
      videos.push(tmp);
    }
    this.setState({
      videos: videos,
    });
  }

  onPress(data) {
    this.props.navigation.navigate('VideoDetail', {
      data: data,
    });
  }

  _renderItem = row => {
    let data = row.item;

    return (
      <TouchableOpacity onPress={() => this.onPress(data)}>
        <View>
          <Text style={styles.title}>{data.title}</Text>
          <View style={[styles.videoBox, {backgroundColor: data.color}]}>
            <Text style={styles.video}>1280 x 720</Text>
          </View>
          <View style={styles.buttonBox}>
            <TouchableOpacity style={styles.zanBtn}>
              <Ionicons name={'ios-heart-empty'} size={25} />
              <Text> 点赞 </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.judgeBtn}>
              <Ionicons name={'ios-chatbubbles'} size={25} />
              <Text> 评论 </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  _keyExtractor = (item, index) => item.id.toString();

  _renderHeader = () => {
    return (
      <View style={styles.footer}>
        <Text style={{textAlign: 'center'}}>测试列表</Text>
      </View>
    );
  };

  _renderFooter = () => {
    return (
      <View style={styles.footer}>
        <Text style={{textAlign: 'center'}}>
          哥，这就是底线了 {this.state.page}
        </Text>
      </View>
    );
  };
  _separator() {
    // 再刷新or加载的时候进行的动画或者文字效果
    return <View style={{height: 1}} />;
  }

  _renderEmpty() {
    return (
      <View>
        <Text>无数据</Text>
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <FlatList
            data={this.state.videos}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            ListEmptyComponent={this._renderEmpty}
            ListFooterComponent={this._renderFooter}
            ItemSeparatorComponent={this._separator}
            ListHeaderComponent={this._renderHeader}
            initialNumToRender={10}
            numColumns={1}
            onEndReachedThreshold={0.1}
            flashScrollIndicators={true}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {width: '100%', height: '100%'},
  title: {
    padding: 10,
    fontSize: 14,
  },
  videoBox: {
    height: 200,
    width: '100%',
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {textAlign: 'center'},
  buttonBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 36,
    marginTop: 3,
  },
  zanBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  judgeBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
  },
});
export default VideoList;
