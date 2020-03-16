import React, {Component} from 'react';
import {
  View,
  Easing,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  StatusBar,
} from 'react-native';
import moment from 'moment';
import {
  Header,
  Text,
  Image,
  Icon,
  Button,
  CheckBox,
} from 'react-native-elements';
import {Tabs, Provider, Modal, Toast} from '@ant-design/react-native';

const {width, height} = Dimensions.get('window');
const logoPng = require('../../../assets/qimao/image/logo.png');

const tabList = [{title: '浏览记录'}, {title: '书架记录'}];

const offsetLeftLength = (width / 2 - 20) / 2;
const offsetRightLength = width / 2 + (width / 2 - 20) / 2;
const offsetLength = width / 2;

class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabOffset: new Animated.Value(0),
      offsetLeft: true,
      offsetIndex: 0,
      offsetLength: offsetLength,
      offsetLeftLength: offsetLeftLength,
      offsetRightLength: offsetRightLength,

      hideStatusBar: false,
      editing: false,
      edittext: '',

      tabIndex: 0,
      shelfBooks: [],
      viewBooks: [],

      selectTotal: 0,
      allSelect: false,
      allSelectText: '全选',
      selectIds: [],

      deleteVisible: false,
      joinVisible: false,
    };
    this.startMa = this.startMa.bind(this);
    this.completeMa = this.completeMa.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.clickTab = this.clickTab.bind(this);
    this._fetchViewRecords = this._fetchViewRecords.bind(this);
    this._fetchShelfRecords = this._fetchShelfRecords.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.deleteBooks = this.deleteBooks.bind(this);
    this.joinShelf = this.joinShelf.bind(this);
    this._pressShelfItem = this._pressShelfItem.bind(this);
    this._pressViewItem = this._pressViewItem.bind(this);
    this._renderOpItems = this._renderOpItems.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    this._fetchViewRecords();
    this._fetchShelfRecords();
  }
  startMa() {
    this.setState({
      editing: true,
    });
  }
  completeMa() {
    this.setState({
      editing: false,
    });
  }

  goBack() {
    this.props.navigation.goBack();
  }
  renderLeftComponent() {
    if (this.state.editing) {
      return null;
    } else {
      return (
        <Icon
          name="left"
          color="#9D9D9D"
          type="antdesign"
          onPress={this.goBack}
        />
      );
    }
  }

  renderRightComponent() {
    if (this.state.editing) {
      return (
        <TouchableOpacity onPress={this.completeMa}>
          <Text>完成</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={this.startMa}
          style={{
            marginRight: 10,
          }}>
          <Text style={{color: '#3C3C3C', fontSize: 16}}>管理</Text>
        </TouchableOpacity>
      );
    }
  }

  changeTab(tab, index) {
    if (this.state.editing) {
      return;
    }
    this.setState({
      editing: false,
      tabIndex: index,
    });
  }
  clickTab(tab, index) {
    if (this.state.editing) {
      return;
    }
    this.setState({
      tabIndex: index,
    });
  }

  _fetchViewRecords() {
    let max = 5;
    let books = [];
    for (var i = 0; i < max; i++) {
      var tmp = {
        id: i + 1,
        title: '流浪地球' + (i + 1),
        author: '刘雨鑫',
        viewAt: '20111031',
        checked: false,
      };
      books.push(tmp);
    }
    this.setState({
      viewBooks: books,
    });
  }

  _fetchShelfRecords() {
    let max = 10;
    let books = [];
    for (var i = 5; i < max; i++) {
      var tmp = {
        id: i + 1,
        title: '三体' + (i + 1),
        author: '刘雨鑫',
        addAt: '20111031',
        checked: false,
      };
      books.push(tmp);
    }
    this.setState({
      shelfBooks: books,
    });
  }

  _keyExtractor = (item, index) => item.id.toString();

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

  _pressViewItem(book) {
    var books = this.state.viewBooks;
    books.forEach(function(tmp, index) {
      if (tmp.id === book.id) {
        tmp.checked = !tmp.checked;
      }
    });
    this.setState({
      viewBooks: books,
    });
    this._recalculate();
  }

  _pressShelfItem(book) {
    let books = this.state.shelfBooks;
    books.forEach(function(tmp, index) {
      if (tmp.id === book.id) {
        tmp.checked = !tmp.checked;
      }
    });
    this.setState({
      shelfBooks: books,
    });
    this._recalculate();
  }

  _renderViewItem = row => {
    let data = row.item;
    return (
      <TouchableOpacity onPress={() => this._pressViewItem(data)}>
        <View style={styles.bookBox}>
          <View>
            <Image source={logoPng} style={styles.bookImage} />
          </View>
          <View style={styles.bookTextBox}>
            <View style={styles.bookTitleBox}>
              <Text style={styles.bookTitle}>{data.title}</Text>
            </View>
            <View style={styles.bookAuthorBox}>
              <Text style={styles.bookAuthor} numberOfLines={1}>
                {data.author}
              </Text>
            </View>
            <View style={styles.bookTimeBox}>
              <Text style={styles.bookTime} numberOfLines={1}>
                浏览时间：{moment(data.viewAt, 'YYYYMMDD').fromNow()}
              </Text>
            </View>
          </View>
          <View style={styles.bookBtnBox}>
            {this.state.editing ? (
              <CheckBox
                title=" "
                checked={data.checked}
                onPress={() => this._pressViewItem(data)}
              />
            ) : (
              <Button
                title="打开"
                type="outline"
                buttonStyle={styles.bookBtn}
                titleStyle={styles.bookBtnTitle}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _renderShelfItem = row => {
    let data = row.item;
    return (
      <TouchableOpacity onPress={() => this._pressShelfItem(data)}>
        <View style={styles.bookBox}>
          <View>
            <Image source={logoPng} style={styles.bookImage} />
          </View>
          <View style={styles.bookTextBox}>
            <View style={styles.bookTitleBox}>
              <Text style={styles.bookTitle}>{data.title}</Text>
            </View>
            <View style={styles.bookAuthorBox}>
              <Text style={styles.bookAuthor} numberOfLines={1}>
                {data.author}
              </Text>
            </View>
            <View style={styles.bookTimeBox}>
              <Text style={styles.bookTime} numberOfLines={1}>
                加入书架时间：
                {moment(data.addAt).format('YYYY-MM-DD')}
              </Text>
            </View>
          </View>
          <View style={styles.bookBtnBox}>
            {this.state.editing ? (
              <CheckBox
                title=" "
                checked={data.checked}
                onPress={() => this._pressShelfItem(data)}
              />
            ) : (
              <Button
                title="打开"
                type="outline"
                buttonStyle={styles.bookBtn}
                titleStyle={styles.bookBtnTitle}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _recalculate() {
    let selectIds = [];
    let selectTotal = 0;
    // 选中数量
    let books;
    if (this.state.tabIndex > 0) {
      books = this.state.shelfBooks;
    } else {
      books = this.state.viewBooks;
    }
    books.forEach(function(book, index) {
      if (book.checked) {
        selectTotal += 1;
        selectIds.push(book.id);
      }
    });
    // 是否全选
    let allSelect = selectTotal === books.length;
    //
    this.setState({
      allSelect: allSelect,
      selectTotal: selectTotal,
      allSelectText: allSelect ? '取消全选' : '全选',
      selectIds: selectIds,
    });
  }

  // 全选
  selectAll() {
    let selectIds = [];
    let allSelect = !this.state.allSelect;
    if (this.state.tabIndex > 0) {
      // 书架
      let books = this.state.shelfBooks;
      // 浏览
      books.forEach(function(book, index) {
        book.checked = allSelect;
        if (allSelect) {
          selectIds.push(book.id);
        }
      });
      this.setState({
        allSelect: allSelect,
        shelfBooks: books,
        allSelectText: allSelect ? '取消全选' : '全选',
        selectTotal: allSelect ? books.length : 0,
        selectIds: selectIds,
      });
    } else {
      let books = this.state.viewBooks;
      // 浏览
      books.forEach(function(book, index) {
        book.checked = allSelect;
        if (allSelect) {
          selectIds.push(book.id);
        }
      });
      this.setState({
        allSelect: allSelect,
        viewBooks: books,
        allSelectText: allSelect ? '取消全选' : '全选',
        selectTotal: allSelect ? books.length : 0,
        selectIds: selectIds,
      });
    }
  }

  // 移除书籍
  _removeBooks(selectIds) {
    let books;
    if (this.state.tabIndex > 0) {
      // 书架
      books = this.state.shelfBooks;
      let newBooks = books.filter(function(book, index, arr) {
        return selectIds.indexOf(book.id) < 0;
      });
      this.setState({
        shelfBooks: newBooks,
      });
    } else {
      // 浏览
      books = this.state.viewBooks;
      let newBooks = books.filter(function(book, index, arr) {
        return selectIds.indexOf(book.id) < 0;
      });
      this.setState({
        viewBooks: newBooks,
      });
    }
  }
  // 删除
  deleteBooks() {
    if (this.state.selectTotal <= 0) {
      Toast.info('请选择记录');
      return;
    }
    let selectIds = this.state.selectIds;
    Modal.alert('', '确定将选中书籍从当前账号中删除？', [
      {
        text: '取消',
        onPress: () => console.log('cancel'),
        style: 'cancel',
      },
      {
        text: '确定',
        onPress: () => {
          this._removeBooks(selectIds);
        },
      },
    ]);
  }
  // 加入书架
  joinShelf() {
    if (this.state.selectTotal <= 0) {
      Toast.info('请选择记录');
      return;
    }
    //
    let selectIds = this.state.selectIds;
    if (this.state.tabIndex > 0) {
      // 书架
      Toast.info('已在书架中');
      return;
    } else {
      // 浏览
    }
  }

  _renderOpItems() {
    if (this.state.editing) {
      return (
        <View style={styles.opBox}>
          <TouchableOpacity onPress={this.selectAll}>
            <Text>{this.state.allSelectText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.deleteBooks}
            style={{opacity: this.state.selectTotal > 0 ? 1 : 0.5}}>
            <Text>删除 ({this.state.selectTotal})</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.joinShelf}
            style={{opacity: this.state.selectTotal > 0 ? 1 : 0.5}}>
            <Text style={{color: '#FF9105', fontWeight: '600'}}>
              加入书架 ({this.state.selectTotal})
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  // 向右
  toRight() {
    this.setState({
      offsetIndex: 1,
    });
    Animated.parallel([
      Animated.timing(this.state.tabOffset, {
        easing: Easing.linear,
        duration: 200,
        toValue: 1,
      }),
    ]).start(finished => {
      console.log('finished', finished);
      // if (finished) {

      // }
    });
  }

  // 向左
  toLeft() {
    this.setState({
      offsetIndex: 0,
    });
    Animated.parallel([
      Animated.timing(this.state.tabOffset, {
        easing: Easing.linear,
        duration: 200,
        toValue: 0,
      }),
    ]).start(finished => {
      console.log('finished', finished);

      // if (finished) {

      // }
    });
  }

  _renderTabUnderline = () => {
    return (
      <Animated.View
        style={[
          styles.tabBarUnderlineStyleBox,
          {
            transform: [
              {
                translateX: this.state.tabOffset.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, this.state.offsetLength],
                }),
              }, // x轴移动
            ],
          },
        ]}>
        <View
          style={{
            width: 20,
            height: 4,
            borderRadius: 5,
            backgroundColor: '#FF8D00',
          }}
        />
      </Animated.View>
    );
  };

  _renderTabContent = () => {
    if (this.state.offsetIndex === 0) {
      return (
        <View
          style={[styles.tabBox, {marginBottom: this.state.editing ? 60 : 20}]}>
          <FlatList
            data={this.state.viewBooks}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderViewItem}
            ListEmptyComponent={this._renderEmpty}
            ItemSeparatorComponent={this._separator}
            initialNumToRender={10}
            extraData={this.state}
            numColumns={1}
            onEndReachedThreshold={0.1}
            flashScrollIndicators={true}
          />
        </View>
      );
    } else {
      return (
        <View
          style={[styles.tabBox, {marginBottom: this.state.editing ? 60 : 20}]}>
          <FlatList
            data={this.state.shelfBooks}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderShelfItem}
            ListEmptyComponent={this._renderEmpty}
            ItemSeparatorComponent={this._separator}
            initialNumToRender={10}
            extraData={this.state}
            numColumns={1}
            onEndReachedThreshold={0.1}
            flashScrollIndicators={true}
          />
        </View>
      );
    }
  };

  render() {
    return (
      <Provider>
        <View style={styles.container}>
          <StatusBar
            backgroundColor={'#fff'}
            translucent={true}
            hidden={this.state.hideStatusBar}
            animated={true}
          />
          <Header
            backgroundColor={'#fff'}
            leftComponent={this.renderLeftComponent()}
            centerComponent={{
              text: '阅读记录',
              style: {color: '#000', fontSize: 24},
            }}
            rightComponent={this.renderRightComponent()}
          />

          <View style={{marginTop: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 10,
              }}>
              <TouchableOpacity
                onPress={() => this.toLeft()}
                style={{alignContent: 'center', justifyContent: 'center'}}>
                <View
                  style={{
                    width: offsetLength,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={
                      this.state.offsetIndex === 0
                        ? styles.activeTtabBarTextStyle
                        : styles.tabBarTextStyle
                    }>
                    浏览记录
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.toRight()}
                style={{alignContent: 'center', justifyContent: 'center'}}>
                <View
                  style={{
                    width: offsetLength,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={
                      this.state.offsetIndex === 1
                        ? styles.activeTtabBarTextStyle
                        : styles.tabBarTextStyle
                    }>
                    书架记录
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {this._renderTabUnderline()}
          </View>
          <View style={styles.tabBarBox}>{this._renderTabContent()}</View>
          {/* <View style={styles.tabBarBox}>
            <Tabs
              tabs={tabList}
              initialPage={0}
              animated={true}
              tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
              tabBarActiveTextColor={'#FF9105'}
              tabBarInactiveTextColor={'#6C6C6C'}
              tabBarTextStyle={styles.tabBarTextStyle}
              onChange={this.changeTab}
              onTabClick={this.clickTab}
              renderUnderline={false}>
              <View
                style={[
                  styles.tabBox,
                  {marginBottom: this.state.editing ? 60 : 20},
                ]}>
                <FlatList
                  data={this.state.viewBooks}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderViewItem}
                  ListEmptyComponent={this._renderEmpty}
                  ItemSeparatorComponent={this._separator}
                  initialNumToRender={10}
                  extraData={this.state}
                  numColumns={1}
                  onEndReachedThreshold={0.1}
                  flashScrollIndicators={true}
                />
              </View>
              <View
                style={[
                  styles.tabBox,
                  {marginBottom: this.state.editing ? 60 : 20},
                ]}>
                <FlatList
                  data={this.state.shelfBooks}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderShelfItem}
                  ListEmptyComponent={this._renderEmpty}
                  ItemSeparatorComponent={this._separator}
                  initialNumToRender={10}
                  extraData={this.state}
                  numColumns={1}
                  onEndReachedThreshold={0.1}
                  flashScrollIndicators={true}
                />
              </View>
            </Tabs>
          </View> */}
          {this._renderOpItems()}
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarBox: {flex: 1},
  tabBarUnderlineStyleBox: {
    marginLeft: offsetLeftLength,
    marginBottom: 10,
  },
  tabBarUnderlineStyle: {
    width: 20,
    backgroundColor: '#FF9105',
    borderWidth: 2,
    borderColor: '#FF9105',
    marginLeft: width / 4 - 10,
    borderRadius: 2,
  },
  tabBarTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: '#6C6C6C',
  },
  activeTtabBarTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#FF9105',
  },
  tabBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 0,
  },

  bookBox: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    flexDirection: 'row',
    width: width - 40,
  },
  bookImage: {width: 60, height: 80},
  bookTextBox: {
    marginLeft: 20,
    width: width - 210,
  },
  bookTitleBox: {flexDirection: 'row', marginTop: 3, marginBottom: 3},
  bookTitle: {fontSize: 16},

  bookAuthorBox: {marginTop: 3, marginBottom: 3},
  bookAuthor: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bookTimeBox: {},
  bookTime: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bookBtnBox: {width: 80, justifyContent: 'center'},
  bookBtn: {
    borderColor: '#DDDDDD',
    borderRadius: 15,
    height: 30,
  },
  bookBtnTitle: {fontSize: 14, color: '#666666'},

  opBox: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 40,
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
});

export default Record;
