import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import {Header, Text, Icon, Image} from 'react-native-elements';
const {width, height} = Dimensions.get('window');

const logoPng = require('../../../assets/qimao/image/logo.png');
const signinPng = require('../../../assets/qimao/image/signin.png');

class Index extends Component {
  static navigationOptions = {
    title: '书架',
  };

  constructor(props) {
    super(props);

    this.state = {
      showMore: false,
      books: [],
    };

    this.signIn = this.signIn.bind(this);
    this.record = this.record.bind(this);
    this.more = this.more.bind(this);
  }

  renderCenterComponent() {
    return (
      <View>
        <Text>xxxxxxxxxxx</Text>
      </View>
    );
  }

  renderRightComponent() {
    return (
      <View style={styles.topBtnBox}>
        <TouchableHighlight onPress={this.signIn} style={styles.topBtn}>
          <Image source={signinPng} style={{width: 30, height: 30}} />
        </TouchableHighlight>
        {/* <TouchableHighlight onPress={this.search} style={styles.topBtn}>
          <Icon name="search" type="octicon" color="#000" size={22} />
        </TouchableHighlight> */}
        <TouchableHighlight onPress={this.record} style={styles.topBtn}>
          <Icon name="clock" type="feather" size={24} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.more} style={styles.topBtn}>
          <Icon name="more-vertical" type="feather" size={26} />
        </TouchableHighlight>
      </View>
    );
  }

  componentDidMount() {
    this._fetchRecords();
  }

  // 签到
  signIn() {
    this.props.navigation.navigate('Pencil');
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
    this.props.navigation.navigate('DepotStack');
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
      };
      books.push(tmp);
    }
    this.setState({
      books: books,
    });
  }

  _keyExtractor = (item, index) => item.id.toString();

  _renderFooter = () => {
    return (
      <TouchableHighlight
        style={styles.footerBox}
        onPress={() => this.goDepot()}>
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
      </TouchableHighlight>
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

  _renderItem = row => {
    let data = row.item;

    return (
      <TouchableHighlight onPress={() => this.onPress(data)}>
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
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#E8E8E8'}
          placement="left"
          leftComponent={{
            text: '七猫免费小说',
            style: {color: '#000', fontSize: 20},
          }}
          // centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
          containerStyle={styles.topContainer}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.placeHolderBox}>
            <View style={styles.placeHolderAd}>
              <View>
                <Image source={logoPng} style={styles.placeHolderImage} />
              </View>
              <View style={styles.placeHolderTextBox}>
                <View style={styles.placeHolderTitleBox}>
                  <Text style={styles.placeHolderTitle}>我的角色美女老板</Text>
                  <Icon name={'rowing'} color={'#00aced'} size={20} />
                </View>
                <View style={styles.placeHolderContentBox}>
                  <Text style={styles.placeHolderContent} numberOfLines={2}>
                    颜家栋送外卖到一个绝色少妇家里，没想到这女人居然出钱让他陪睡，而且不同意就给差评，而且不同意就给差评而且不同意就给差评而且不同意就给差评而且不同意就给差评
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.placeHolderUp}>
              <Text>==</Text>
            </View>
            <View style={styles.placeHolderDown}>
              <Text>==</Text>
            </View>
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
    opacity: 0.8,
    paddingBottom: 20,
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
    backgroundColor: '#fff',
    borderWidth: 0,
    borderColor: '#ccc',
    height: 100,
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    left: 20,
    width: width - 40,
    zIndex: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    flexDirection: 'row',

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
    color: '#9D9D9D',
    lineHeight: 20,
    marginRight: 10,
  },
  bookRead: {
    fontSize: 14,
    color: '#FF9B21',
    lineHeight: 20,
    marginRight: 10,
  },

  footerBox: {
    marginLeft: 20,
    marginRight: 20,
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
