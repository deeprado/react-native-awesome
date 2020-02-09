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
import {Header, Text, Icon, ThemeProvider, Image} from 'react-native-elements';
const {width, height} = Dimensions.get('window');

const logoPng = require('../../../assets/qimao/image/logo.png');
const signinPng = require('../../../assets/qimao/image/signin.png');

const theme = {
  Button: {
    raised: true,
  },
};

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

  _fetchRecords() {
    let max = 20;
    let books = [];
    for (var i = 0; i < max; i++) {
      var tmp = {
        id: i + 1,
        title: '我的绝色美女老板',
        summary:
          '我的绝色美女老板我的绝色美女老板我的绝色美女老板我的绝色美女老板我的绝色美女老板',
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
      <TouchableHighlight style={styles.footerBox}>
        <View style={styles.footer}>
          <Image source={logoPng} style={styles.footerPng} />
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
          <View>
            <Image source={logoPng} style={styles.bookImage} />
          </View>
          <View style={styles.bookTextBox}>
            <View style={styles.bookTitleBox}>
              <Text style={styles.bookTitle}>{data.title}</Text>
            </View>
            <View style={styles.bookContentBox}>
              <Text style={styles.bookContent} numberOfLines={1}>
                {data.summary}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ThemeProvider theme={theme}>
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
                    <Text style={styles.placeHolderTitle}>
                      我的角色美女老板
                    </Text>
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
        </ThemeProvider>
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

  booksBox: {marginTop: 15},
  bookBox: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    flexDirection: 'row',
  },
  bookImage: {width: 60, height: 80},
  bookTextBox: {
    marginLeft: 20,
    width: width - 150,
  },
  bookTitleBox: {flexDirection: 'row', marginTop: 12, marginBottom: 12},
  bookTitle: {fontSize: 16},

  bookContentBox: {},
  bookContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
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
    fontSize: 14,
    color: '#666',
  },
});

export default Index;
