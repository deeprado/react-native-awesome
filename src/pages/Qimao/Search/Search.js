import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Easing,
  Animated,
  ScrollView,
  RefreshControl,
  Alert,
  Image,
} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';
import {SearchBar} from '@ant-design/react-native';

const {width} = Dimensions.get('window');
const logoPng = require('../../../assets/qimao/image/logo.png');

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      searching: false,
      readingBooks: [],
      searchList: [],
      historyList: ['最后一名', '最强兵王'],
      leftContents: [
        '新型冠状病毒肺炎预防',
        '最佳女婿',
        '无上丹尊',
        '长生归来当奶爸',
      ],
      rightContents: [
        '重生之毒妃',
        '娇妻高高在上',
        '此生不负你深情',
        '神秘老公惹不起',
      ],
    };
  }

  componentDidMount() {
    // this.fetchData('xxx');
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
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
          搜索
        </Text>
      </View>
    );
  }

  handleSearch = content => {
    let that = this;
    if (content.length > 0) {
      this.timer = setTimeout(() => {
        // 查询后台
        that.fetchData(content);
        // 查询数据
        that.setState({searching: true});
      }, 500);
    } else {
      that.setState({searching: false});
    }
  };

  onSearchChange = content => {
    this.setState({content});
    this.handleSearch(content);
  };

  onSearchClear = () => {
    this.setState({
      content: '',
      searching: false,
      searchList: [],
    });
  };

  // 给list设置的key，遍历item。这样就不会报黄线
  _keyExtractor = (item, index) => index.toString();

  _separator() {
    return <View style={{height: 1, backgroundColor: '#F1F1F1'}} />;
  }

  handleRefresh = () => {
    this.fetchData(this.state.content);
  };

  fetchData = content => {
    let readingBooks = [
      content + '阿斯蒂芬',
      content + '啊时代发生的发是的',
      content + '时代发生的发生的',
      content + '自行车V下次V现场',
    ];

    let searchList = [
      {
        id: 1,
        type: 1,
        content: content + '啊时代发生的发',
      },
      {
        id: 2,
        type: 1,
        content: content + '啊时代发生的发',
      },
      {
        id: 3,
        type: 1,
        content: content + '啊时代发生的发',
      },
      {
        id: 4,
        type: 2,
        content: content + '啊时代发生的发',
      },
      {
        id: 5,
        type: 2,
        content: content + '啊时代发生的发',
      },
      {
        id: 6,
        type: 2,
        content: content + '啊时代发生的发',
      },
      {
        id: 7,
        type: 2,
        content: content + '啊时代发生的发',
      },
      {
        id: 8,
        type: 2,
        content: content + '啊时代发生的发',
      },
      {
        id: 9,
        type: 2,
        content: content + '啊时代发生的发',
      },
      {
        id: 10,
        type: 2,
        content: content + '啊时代发生的发',
      },
      {
        id: 11,
        type: 2,
        content: content + '啊时代发生的发',
      },
      {
        id: 12,
        type: 2,
        content: content + '啊时代发生的发',
      },
    ];

    this.setState({
      searchList: searchList,
      readingBooks: readingBooks,
    });
  };

  // 返回itemView
  _renderItemView({item}) {
    return (
      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 15,
            paddingBottom: 15,
          }}>
          <View style={{width: 40}}>
            {item.type === 1 ? (
              <Icon name="torso" type="foundation" color="#979797" size={20} />
            ) : (
              <Icon name="search" type="" color="#979797" size={20} />
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              alignItems: 'center',
              maxWidth: width - 150,
            }}>
            <View>
              <Text style={{color: '#494949', fontSize: 18}} numberOfLines={1}>
                {item.content}
              </Text>
            </View>
            {item.type === 1 ? (
              <View
                style={{
                  marginLeft: 10,
                  backgroundColor: '#3BC39C',
                  borderRadius: 2,
                }}>
                <Text
                  style={{
                    paddingTop: 1,
                    paddingBottom: 3,
                    paddingLeft: 5,
                    paddingRight: 5,
                    color: '#fff',
                    fontSize: 12,
                  }}>
                  作者
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _renderHotSerch = () => {
    return (
      <View style={{paddingBottom: 20}}>
        <View style={{paddingLeft: 15, paddingRight: 15}}>
          <View>
            <Text style={{fontSize: 14, color: '#ACACAC'}}>热门搜索</Text>
          </View>
          <View
            style={{
              marginTop: 15,
              paddingBottom: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {/* 左边 */}
            <View style={{flex: 1}}>
              {this.state.leftContents.map(function(item, index) {
                let ord = index * 2 + 1;
                let bgColor =
                  ord === 1 ? 'red' : ord === 3 ? '#FFCD00' : '#CCCCCC';
                return (
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    key={index}>
                    <View
                      style={{
                        backgroundColor: bgColor,
                        width: 20,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 14,
                        }}>
                        {ord}
                      </Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 16, color: '#6A6A6A'}}>
                        {item}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
            {/* 右边 */}
            <View style={{flex: 1}}>
              {this.state.rightContents.map(function(item, index) {
                let ord = index * 2 + 2;
                let bgColor = ord === 2 ? '#FF9744' : '#CCCCCC';
                return (
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    key={index}>
                    <View
                      style={{
                        backgroundColor: bgColor,
                        width: 20,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 14,
                        }}>
                        {ord}
                      </Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 16, color: '#6A6A6A'}}>
                        {item}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        <View style={{height: 10, backgroundColor: '#F5F5F5'}} />
        {this._renderHisotryList()}
      </View>
    );
  };

  _renderBookItemView = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Image source={logoPng} style={{width: 40, height: 50}} />
            </View>
            <View style={{marginLeft: 10, maxWidth: width - 240}}>
              <Text style={{fontSize: 16, color: '#222222'}} numberOfLines={1}>
                {item}
              </Text>
            </View>
            <View
              style={{
                marginLeft: 10,
                backgroundColor: '#755338',
                borderRadius: 2,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                  paddingTop: 1,
                  paddingBottom: 3,
                  paddingLeft: 5,
                  paddingRight: 5,
                }}>
                已在书架
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: '#FF9744', borderRadius: 20}}>
          <TouchableOpacity>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                paddingTop: 3,
                paddingBottom: 3,
                paddingLeft: 20,
                paddingRight: 20,
              }}>
              阅读
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  _renderReadingBooks = () => {
    return (
      <View style={{paddingLeft: 20, paddingRight: 20}}>
        <View>
          <FlatList
            data={this.state.readingBooks}
            renderItem={this._renderBookItemView}
            ItemSeparatorComponent={this._separator}
            keyExtractor={this._keyExtractor}
          />
        </View>
        <View style={{height: 10, backgroundColor: '#F5F5F5'}} />
      </View>
    );
  };

  _renderSearchList = () => {
    return (
      <View style={{paddingLeft: 20, paddingRight: 20}}>
        <FlatList
          data={this.state.searchList}
          renderItem={this._renderItemView}
          ItemSeparatorComponent={this._separator}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  };

  _renderHistoryItemView = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 12,
          paddingBottom: 12,
        }}>
        <View style={{width: 30}}>
          <Icon name="clock" type="feather" color="#B8B8B8" size={18} />
        </View>
        <View>
          <Text style={{fontSize: 17, color: '#666666'}}>{item}</Text>
        </View>
      </View>
    );
  };

  // 清除历史
  clearHistory() {
    this.setState({
      historyList: [],
    });
  }

  _renderHisotryList = () => {
    if (this.state.historyList.length <= 0) {
      return null;
    }
    return (
      <View style={{paddingLeft: 20, paddingRight: 20}}>
        <View
          style={{
            paddingTop: 15,
            paddingBottom: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{color: '#A8A8A8', fontSize: 16}}>搜索历史</Text>
          </View>
          <TouchableOpacity onPress={() => this.clearHistory()}>
            <View>
              <Icon name="trash-2" type="feather" size={20} color="#B3B3B3" />
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.historyList}
          renderItem={this._renderHistoryItemView}
          ItemSeparatorComponent={this._separator}
          keyExtractor={this._keyExtractor}
          // 为刷新设置颜色
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.handleRefresh.bind(this)} //因为涉及到this.state
              colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
              progressBackgroundColor="#ffffff"
            />
          }
        />
      </View>
    );
  };

  _renderCurSearch = () => {
    return (
      <View>
        {this._renderReadingBooks()}
        {this._renderSearchList()}
      </View>
    );
  };

  _renderContent = () => {
    if (this.state.searching) {
      return this._renderCurSearch();
    } else {
      return this._renderHotSerch();
    }
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

        <View style={{marginTop: 10, marginBottom: 10}}>
          <SearchBar
            value={this.state.content}
            placeholder="请输入书名、作者或主要人物"
            onSubmit={value => Alert.alert(value)}
            onCancel={this.onSearchClear}
            onChange={this.onSearchChange}
            style={{
              height: 32,
            }}
            showCancelButton
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this._renderContent()}
        </ScrollView>
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

export default Search;
