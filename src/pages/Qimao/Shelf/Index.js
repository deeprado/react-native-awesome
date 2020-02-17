import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  UIManager,
  ImageBackground,
  Animated,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Header, Text, Icon, Image} from 'react-native-elements';
const {width, height} = Dimensions.get('window');

const logoPng = require('../../../assets/qimao/image/logo.png');
class Index extends Component {
  static navigationOptions = {
    title: '书架',
  };

  constructor(props) {
    super(props);

    this.state = {
      hideStatusBar: false,
      fadeAnim: new Animated.Value(1),
      showMore: false,
      books: [],
      scrollStatus: false,

      recom: {
        title: '我的角色美女老板',
        summery:
          '颜家栋送外卖到一个绝色少妇家里，没想到这女人居然出钱让他陪睡，而且不同意就给差评，而且不同意就给差评而且不同意就给差评而且不同意就给差评而且不同意就给差评',
      },
      ads: [
        {
          id: 100,
          cover: logoPng,
          title: '哔哩哔哩',
          summery: '超好看的小姐姐宅舞视频~',
          source: '腾讯广告',
          type: 'ad',
        },
        {
          id: 101,
          cover: logoPng,
          title: '哔哩哔哩',
          summery: '经典国创资源，就来哔哩哔哩~',
          source: '腾讯广告',
          type: 'ad',
        },
      ],
    };

    this.signIn = this.signIn.bind(this);
    this.search = this.search.bind(this);
    this.record = this.record.bind(this);
    this.more = this.more.bind(this);
  }

  componentDidMount() {
    this._fetchRecords();
  }

  renderCenterComponent() {
    return null;
  }

  renderRightComponent() {
    return (
      <View style={styles.topBtnBox}>
        <TouchableOpacity onPress={this.signIn} style={styles.topBtn}>
          <Icon name="calendar" type="antdesign" size={24} color="#FF741C" />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.search} style={styles.topBtn}>
          <Icon name="search" type="octicon" color="#000" size={22} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.record} style={styles.topBtn}>
          <Icon name="clock" type="feather" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.more} style={styles.topBtn}>
          <Icon name="more-vertical" type="feather" size={26} />
        </TouchableOpacity>
      </View>
    );
  }

  // 滑动事件
  onScroll = event => {
    let scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY >= 50 && !this.state.scrollStatus) {
      this.setState({
        scrollStatus: true,
      });
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 200,
      }).start();
    }
    if (scrollY < 50 && this.state.scrollStatus) {
      this.setState({
        scrollStatus: false,
      });
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 200,
      }).start();
    }
  };

  // 签到
  signIn() {
    this.props.navigation.navigate('Signin');
  }
  // 搜索
  search() {
    this.props.navigation.navigate('Search');
  }
  // 记录
  record() {
    this.props.navigation.navigate('Record');
  }
  // 更多
  more() {
    this.setState({
      showMore: true,
    });
  }

  // 切换路由到书城
  goDepot = () => {
    this.props.navigation.navigate('DepotBox');
  };

  openReader = data => {
    this.props.navigation.navigate('Reader', {
      id: 'sdfad',
    });
  };

  _fetchRecords() {
    let max = 20;
    let books = [];
    for (var i = 0; i < max; i++) {
      var tmp = {
        id: i + 1,
        title: '我的绝色美女老板',
        summary: '阿斯顿发生的',
        author: '一念汪洋',
        reading: true,
        lastChapter: '第二千八百一十五章',
        hasUpdate: true,
        cover: logoPng,
        type: 'book',
      };
      books.push(tmp);
    }
    // 插入广告
    books.splice(0, 0, this.state.ads[0]);
    books.splice(3, 0, this.state.ads[1]);
    // 插入广告
    this.setState({
      books: books,
    });
  }

  _keyExtractor = (item, index) => item.id.toString();

  _renderFooter = () => {
    return (
      <TouchableOpacity style={styles.footerBox} onPress={() => this.goDepot()}>
        <View style={styles.footer}>
          <View
            style={{
              height: 90,
              width: 66,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#EBEBEB',
            }}>
            <Icon name="plus" type="feather" size={20} color="#9E9E9E" />
          </View>
          <View style={styles.footerContentBox}>
            <Text style={styles.footerContent}>添加你喜欢的小说</Text>
          </View>
        </View>
      </TouchableOpacity>
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

  openAd = data => {
    console.log(data);
  };

  _renderAd = data => {
    return (
      <TouchableOpacity onPress={() => this.openAd(data)} key={data.id}>
        <View style={styles.bookBox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Image source={logoPng} style={styles.bookImage} />
            </View>
            <View style={styles.bookTextBox}>
              <View style={styles.bookTitleBox}>
                <Text style={styles.bookTitle}>{data.title}</Text>
              </View>
              <View style={styles.bookContentBox}>
                <Text style={styles.bookContent} numberOfLines={1}>
                  {data.summery}
                </Text>
                <Text style={styles.adName} numberOfLines={1}>
                  {data.source}
                </Text>
              </View>
            </View>
          </View>
          {data.hasUpdate ? (
            <View
              style={{
                backgroundColor: '#FF8D00',
                alignItems: 'center',
                borderRadius: 3,
              }}>
              <Text
                style={{
                  paddingTop: 1,
                  paddingBottom: 3,
                  paddingLeft: 5,
                  paddingRight: 4,
                  color: '#fff',
                  fontSize: 12,
                }}>
                更新
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  _renderBook = data => {
    return (
      <TouchableOpacity onPress={() => this.openReader(data)} key={data.id}>
        <View style={styles.bookBox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Image source={logoPng} style={styles.bookImage} />
            </View>
            <View style={styles.bookTextBox}>
              <View style={styles.bookTitleBox}>
                <Text style={styles.bookTitle}>{data.title}</Text>
              </View>
              {data.reading ? (
                <View style={styles.bookContentBox}>
                  <Text style={styles.bookContent} numberOfLines={1}>
                    {data.lastChapter}
                  </Text>
                  <Text style={styles.bookRead} numberOfLines={1}>
                    继续阅读>
                  </Text>
                </View>
              ) : (
                <View style={styles.bookContentBox}>
                  <Text style={styles.bookContent} numberOfLines={1}>
                    {data.author}
                  </Text>
                </View>
              )}
            </View>
          </View>
          {data.hasUpdate ? (
            <View
              style={{
                backgroundColor: '#FF8D00',
                alignItems: 'center',
                borderRadius: 3,
              }}>
              <Text
                style={{
                  paddingTop: 1,
                  paddingBottom: 3,
                  paddingLeft: 5,
                  paddingRight: 4,
                  color: '#fff',
                  fontSize: 12,
                }}>
                更新
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  _renderItem = row => {
    let data = row.item;
    if (data.type === 'ad') {
      return this._renderAd(data);
    } else {
      return this._renderBook(data);
    }
  };

  // 打开封面
  openCover = () => {
    this.props.navigation.navigate('Cover', {
      id: '234234',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={this.state.scrollStatus ? '#fff' : '#EDEDED'}
          translucent={true}
          hidden={this.state.hideStatusBar}
          animated={true}
        />
        <Animated.View
          style={{
            opacity: this.state.fadeAnim,
          }}>
          <Header
            // backgroundImage={logoPng}
            backgroundColor={this.state.scrollStatus ? '#fff' : '#EDEDED'}
            // backgroundImageStyle={{
            //   opacity: 0.5,
            // }}
            placement="left"
            leftComponent={{
              text: '七猫免费小说',
              style: {color: '#000', fontSize: 20},
            }}
            rightComponent={this.renderRightComponent()}
            containerStyle={styles.topContainer}
          />
        </Animated.View>

        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          onScroll={this.onScroll}>
          <View style={styles.placeHolderBox}>
            <TouchableOpacity
              onPress={this.openCover}
              style={{
                height: 100,
                position: 'absolute',
                top: 0,
                left: 20,
                width: width - 40,
                zIndex: 20,
              }}>
              <View style={styles.placeHolderAd}>
                <View>
                  <Image source={logoPng} style={styles.placeHolderImage} />
                </View>
                <View style={styles.placeHolderTextBox}>
                  <View style={styles.placeHolderTitleBox}>
                    <Text style={styles.placeHolderTitle}>
                      {this.state.recom.title}
                    </Text>
                    <Icon name={'rowing'} color={'#00aced'} size={20} />
                  </View>
                  <View style={styles.placeHolderContentBox}>
                    <Text style={styles.placeHolderContent} numberOfLines={2}>
                      {this.state.recom.summery}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.placeHolderUp} />
            <View style={styles.placeHolderDow} />
          </View>

          {/* 列表 */}
          <View style={styles.booksBox}>
            <FlatList
              data={this.state.books}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              ListEmptyComponent={this._renderEmpty}
              ListFooterComponent={this._renderFooter}
              ItemSeparatorComponent={this._separator}
              initialNumToRender={10}
              numColumns={1}
              onEndReachedThreshold={0.1}
              flashScrollIndicators={true}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topContainer: {
    // backgroundColor: '#EDEDED',
    // paddingBottom: 10,
  },
  topBackImg: {width: width},
  topBtnBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBtn: {
    marginLeft: 20,
  },
  placeHolderBox: {
    position: 'relative',
    height: 100,
  },
  placeHolderAd: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 10,

    shadowColor: '#000000',
    shadowOffset: {w: 10, h: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },

  placeHolderImage: {width: 60, height: 80},
  placeHolderTextBox: {
    marginLeft: 15,
    width: width - 150,
  },
  placeHolderTitleBox: {flexDirection: 'row', marginTop: 5},
  placeHolderTitle: {fontSize: 16},

  placeHolderContentBox: {marginTop: 5},
  placeHolderContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  placeHolderUp: {
    height: 50,
    backgroundColor: '#E8E8E8',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeHolderDown: {
    height: 50,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  booksBox: {
    marginTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  bookBox: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookImage: {width: 66, height: 90},
  bookTextBox: {
    marginLeft: 20,
    width: width - 180,
  },
  bookTitleBox: {flexDirection: 'row', marginTop: 12, marginBottom: 12},
  bookTitle: {fontSize: 16},

  bookContentBox: {
    flexDirection: 'row',
  },
  bookContent: {
    fontSize: 14,
    color: '#ACACAC',
    lineHeight: 20,
    marginRight: 10,
  },
  adName: {
    fontSize: 12,
    color: '#D0D0D0',
    lineHeight: 20,
  },
  bookRead: {
    fontSize: 14,
    color: '#FF9B21',
    lineHeight: 20,
    marginRight: 10,
  },

  footerBox: {
    marginTop: 15,
    marginBottom: 15,
  },
  footer: {
    flexDirection: 'row',
  },
  footerPng: {width: 60, height: 80},
  footerContentBox: {
    marginLeft: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  footerContent: {
    fontSize: 16,
    color: '#9B9B9B',
  },
});

export default Index;
