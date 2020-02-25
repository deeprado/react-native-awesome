import React, {Component} from 'react';

import {
  Animated,
  Easing,
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Alert,
  Switch,
  Platform,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import {Icon, Slider} from 'react-native-elements';
import moment from 'moment';
import {Provider, Modal, Toast} from '@ant-design/react-native';

import Util from './utils/util';
import Request from './lib/request';
import Battery from '../../components/qimao/Battery';

const logoPng = require('../../assets/qimao/image/logo.png');

let chapter1 = {
  _id: '58ccc05923ff5c6b9d5053cc',
  title: '上架感言',
  postfix: '2352954.html',
  number: 0,
  novel: '58ccc05923ff5c6b9d5053cb',
  __v: 0,
  content:
    '&nbsp;&nbsp;&nbsp;&nbsp;《1852铁血中华》已经上架。&nbsp;&nbsp;&nbsp;&nbsp;这次写太平天国时代有很多原因，不过最重要的原因之一，是因为太平天国运动是清末民初最后一次体制外的造反，也是中国到现在为止的最后一次大规模农民起义。&nbsp;&nbsp;&nbsp;&nbsp;一提起太平天国来，现在的人很容易想起的就是拜上帝教、洪教主，而实际情况又是如何？&nbsp;&nbsp;&nbsp;&nbsp;在那个时代，满清朝廷虽然给洋人跪了，但是整个中国各阶层却远没有20世纪初面临亡国灭种危局的绝望之情。&nbsp;&nbsp;&nbsp;&nbsp;这就是太平天国时代的中国。&nbsp;&nbsp;&nbsp;&nbsp;在全世界主要大国正向着空前激烈的时代突飞猛进的时候，中国的变化远没有世界来的激烈。本书的主角要承担的责任，就是在中国掀起比世界更加激烈的变化。&nbsp;&nbsp;&nbsp;&nbsp;对大家以往的支持，绯红万分感谢！绯红一定会努力继续写书，请大家继续支持，继续订阅！谢谢！！&nbsp;&nbsp;&nbsp;&nbsp;[三七中文 www.37zw.com]百度搜索“37zw.com”',
};
let chapter2 = {
  _id: '58ccc05923ff5c6b9d5053cd',
  title: '第1章 韦泽（一）',
  postfix: '2352958.html',
  number: 1,
  novel: '58ccc05923ff5c6b9d5053cb',
  content:
    '&nbsp;&nbsp;&nbsp;&nbsp;1852年2月6日上午，广西大瑶山一处山岭上的树林旁边。&nbsp;&nbsp;&nbsp;&nbsp;二十几名年轻的战士正在战场上，他们都穿着广西普通百姓的服色，身上是黑色的粗布短衣短裤，腰间束了白色的粗布腰带，腿上打着白布绑腿，脚上则是草鞋。因为天冷，战士们脚上缠了原本可能是白色，现在已经脏兮兮看不出颜色的裹脚布。众人脑袋上并不是广西那种包头布，因为大家都把长发在头上扎了一个发髻，所以在脑袋上箍了一条白色粗布发带，猛看上仿佛是一支奔丧的队伍。&nbsp;&nbsp;&nbsp;&nbsp;一位浓眉大眼的青年停在战场中央，棱角分明脸庞有着少年轻人特有的圆润感觉，怎么看都不超过20岁的模样。这名笑道：“辫子又不重，带回去正好请功！”&nbsp;&nbsp;&nbsp;&nbsp;广西号称百万大山，大瑶山山峦叠翠，在战场附近就有山谷。清军的尸体被抛入山谷，转眼就没了踪影。清军还能留在战场上的是他们的武器，十几名清军的武器中一半是长枪，另一半则是火绳枪。这就是韦泽回到这个时代之后另一件不能立刻接受的事情。这个时业化的日本进行着艰苦卓绝的战斗，并且顽强的不断扩大敌后根据地，把中国的国土从侵略者手中一寸寸的夺回来。&nbsp;&nbsp;&nbsp;&nbsp;满清的火绳枪固然与这时代流行的燧发枪有不小差距，却远没有到达一场战斗只有五发子弹的八路军与敌人之间的差距。在武器装备差距有限的局面下还能被打得签署了无数丧权辱国的条约，这样的满清是必须消灭掉的。不消灭掉满清，就注定没有中国的未来。韦泽对此坚信不移。&nbsp;&nbsp;&nbsp;&nbsp;十几名清军携带的钱财不多，韦泽登记造册后让负责后勤的伍长林阿生把财物收起来。&nbsp;&nbsp;&nbsp;&nbsp;“出发！”韦泽命道。26人的小队扛起自己的装备，在韦泽的带领下向着东北方向继续前进了。&nbsp;&nbsp;&nbsp;&nbsp;[三七中文 www.37zw.com]百度搜索“37zw.com”',
};
let chapters = [chapter1, chapter2];
let firstRenderChapters = {
  chapters: chapters,
  progress: 0,
  countChapter: 23232,
};

// console.log(
//   DeviceInfo.getPowerStateSync(),
//   DeviceInfo.getPhoneNumberSync(),
//   DeviceInfo.getBrand(),
// );

// 背景颜色
const Colors = [
  '#F6D998',
  '#DBE6C5',
  '#FAFAFA',
  '#E7E1C6',
  '#463D3D',
  '#3A3F44',
];
// 翻页方式
const PageTurns = ['无', '覆盖', '平滑', '仿真'];
// 间距（行高）
const Spaces = [5, 10, 15];
// 所有章节
const allChapters = [
  {
    id: 1,
    title: '娶个媳妇',
  },
  {
    id: 2,
    title: '娶个媳妇',
  },
  {
    id: 3,
    title: '娶个媳妇',
  },
  {
    id: 1,
    title: '娶个媳妇',
  },
  {
    id: 2,
    title: '娶个媳妇',
  },
  {
    id: 3,
    title: '娶个媳妇',
  },
  {
    id: 1,
    title: '娶个媳妇',
  },
  {
    id: 2,
    title: '娶个媳妇',
  },
  {
    id: 3,
    title: '娶个媳妇',
  },
  {
    id: 1,
    title: '娶个媳妇',
  },
  {
    id: 2,
    title: '娶个媳妇',
  },
  {
    id: 3,
    title: '娶个媳妇',
  },
  {
    id: 1,
    title: '娶个媳妇',
  },
  {
    id: 2,
    title: '娶个媳妇',
  },
  {
    id: 3,
    title: '娶个媳妇',
  },
  {
    id: 1,
    title: '娶个媳妇',
  },
  {
    id: 2,
    title: '娶个媳妇',
  },
  {
    id: 3,
    title: '娶个媳妇',
  },
  {
    id: 1,
    title: '娶个媳妇',
  },
  {
    id: 2,
    title: '娶个媳妇',
  },
  {
    id: 3,
    title: '娶个媳妇',
  },
  {
    id: 1,
    title: '娶个媳妇',
  },
  {
    id: 2,
    title: '娶个媳妇',
  },
  {
    id: 3,
    title: '娶个媳妇',
  },

  {
    id: 1,
    title: '娶个媳妇',
  },
  {
    id: 2,
    title: '娶个媳妇',
  },
  {
    id: 3,
    title: '娶个媳妇',
  },
];
// 书签
const allBookmarks = [
  {
    id: 1,
    title: '娶个媳妇',
  },
  {
    id: 2,
    title: '娶个媳妇',
  },
  {
    id: 3,
    title: '娶个媳妇',
  },
];

class Reader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideStatusBar: true,
      opacity: new Animated.Value(0),

      offsetOption: new Animated.Value(0),
      offsetRead: new Animated.Value(0),
      offsetLight: new Animated.Value(0),
      offsetDirectory: new Animated.Value(0),
      opacityDirectory: new Animated.Value(0),
      hideMask: true,

      hideOption: true,
      hideRead: true,
      hideLight: true,
      hideDirectory: true,

      searching: false,
      first: true,

      showSliderChapter: false,
      maxChapterNum: 1000,
      chapterNum: 100,
      _data: [],
      firstRenderChapters: null,

      firstOpen: true,
      curTime: null,
      batteryLevel: 100,

      curFontSize: 24,
      curColorInt: 0,
      curSpaceInt: 0,
      curPageTurnInt: 1,

      lightNum: 20,
      maxLightNum: 100,

      flowSystem: false,
      protectMode: false,

      showChapters: true,
      chapters: allChapters,
      bookmarks: allBookmarks,

      isInnShelf: false, // 是否书架中
      showAddShelfModal: false, // 是否显示加入书架弹窗
      bookId: 232,
    };
    this.uuid = DeviceInfo ? DeviceInfo.getDeviceId() : '12123123';

    this.count = 0;
    this.currentChapter = '';
    this.nextChapter = '';
    this.number = 0;
    this.x = 0;
    this.a = 0;
    this.i = 0;

    this.hideReadOption = this.hideReadOption.bind(this);
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    //
    this.initData();
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    this.clearTimer();
    this.clearData();
  }

  // 返回
  onBackPress = () => {
    if (!this.state.isInnShelf) {
      if (this.state.showAddShelfModal) {
        this.closeAddShelfModal();
      } else {
        this.showAddShelfModal();
      }
      return true;
    }
    return false;
  };

  addShelf = () => {
    const {goBack, state} = this.props.navigation;
    if (state.params && state.params.addShelf) {
      let bookId = this.state.bookId;
      state.params.addShelf(bookId);
    }
    goBack();
  };

  showAddShelfModal = () => {
    this.setState({
      showAddShelfModal: true,
    });
  };

  closeAddShelfModal = () => {
    this.setState({
      showAddShelfModal: false,
    });
  };

  initData = () => {
    // 临时
    AsyncStorage.setItem('userToken', 'adfasdfsdfas');
    this.setState({
      batteryLevel: this.getBatteryInfo(),
      curTime: this.getCurTime(),
    });
    this.getFirstRenderChapters(this.uuid);
    this.startTimer();
  };

  getBatteryInfo = () => {
    let tmpbatteryLevel = DeviceInfo.getBatteryLevelSync();
    let batteryLevel = Math.round(tmpbatteryLevel * 100).toFixed(2);
    return batteryLevel;
  };

  getCurTime = () => {
    return moment().format('HH:mm');
  };

  startTimer = () => {
    let that = this;
    // 每分钟获取一次时间
    this.timer = setInterval(function() {
      that.setState({
        batteryLevel: that.getBatteryInfo(),
        curTime: that.getCurTime(),
      });
    }, 60 * 1000);
  };

  clearTimer = () => {
    this.timer && clearInterval(this.timer);
  };

  clearData = () => {
    if (this.a !== 0) {
      this.a = this.a + 375;
    }

    // if (this.i === 1) {
    //   this.a = this.a + 750
    // }

    const json = {
      novel: {
        id: this.uuid,
        num: this.number,
        x: this.x - this.a,
      },
    };

    AsyncStorage.getItem('userToken')
      .then(token => {
        console.log('token', token);
        // Request.post('/bookshelfs/change', json, token).then(res => {
        //   return true;
        // });
      })
      .catch(e => {
        console.log('err', e);
      });
    // this.props.firstRenderChapters = {}
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   return true;
  // }

  UNSAFE_componentWillUpdateXXX(nextProps, nextState) {
    const that = this;
    if (nextProps.navigation.state.params.first) {
      nextProps.navigation.state.params.first = false;
      AsyncStorage.getItem('userToken').then(token => {
        Request.get(`/chapters/firstRender/${that.uuid}`, '', token).then(
          data => {
            let progress = data.response.progress;
            this.number = data.response.chapters[0].number;
            const lists = data.response.chapters;
            let arr = [];
            let content = that.nbsp2Space(lists[0].content);
            let _arr = Util.handleContent(content);
            that.currentChapter = _arr.length;
            _arr.forEach(function(_item) {
              let chapterInfo = {
                title: lists[0].title,
                num: lists[0].number,
                content: _item,
              };
              arr.push(chapterInfo);
            });
            if (lists.length === 2) {
              content = that.nbsp2Space(lists[1].content);
              _arr = Util.handleContent(content);
              that.nextChapter = _arr.length;
              _arr.forEach(function(_item) {
                let chapterInfo = {
                  title: lists[1].title,
                  num: lists[1].number,
                  content: _item,
                };
                arr.push(chapterInfo);
              });
            }
            that._data = arr;
            let scrollView = that.refs.scrollView;
            scrollView.scrollTo({x: progress * 375, y: 0, animated: false});
          },
        );
      });
    }
    if (
      Object.keys(this.props.firstRenderChapters).length !== 0 &&
      nextState.first
    ) {
      this.setState({
        first: false,
      });

      let progress = nextProps.firstRenderChapters.progress;
      this.number = nextProps.firstRenderChapters.chapters[0].number;
      const list = Object.keys(nextProps.firstRenderChapters).map(
        key => nextProps.firstRenderChapters[key],
      );

      let arr = [];
      if (list.length !== 0) {
        let content = that.nbsp2Space(list[0][0].content);
        let _arr = Util.handleContent(content);
        this.currentChapter = _arr.length;
        _arr.forEach(function(_item) {
          let chapterInfo = {
            title: list[0][0].title,
            num: list[0][0].number,
            content: _item,
          };
          arr.push(chapterInfo);
        });
        if (list[0].length === 2) {
          content = that.nbsp2Space(list[0][1].content);
          _arr = Util.handleContent(content);
          this.nextChapter = _arr.length;
          _arr.forEach(function(_item) {
            let chapterInfo = {
              title: list[0][1].title,
              num: list[0][1].number,
              content: _item,
            };
            arr.push(chapterInfo);
          });
        }
      }
      this._data = arr;
      let scrollView = this.scrollView;
      scrollView.scrollTo({x: progress * 375, y: 0, animated: false});
    }
  }

  // 获取第一个章节
  getFirstRenderChapters(uuid) {
    // axios.get(`/chapters/firstRender/${uuid}`).then(res => {
    //   that.firstRenderChapters = res.data.response;
    // });
    this.setState({
      firstRenderChapters: firstRenderChapters,
    });
    this.parseResponse(firstRenderChapters);
  }

  nbsp2Space(str) {
    if (!str) {
      return null;
    }
    return str.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, '        ');
  }

  parseResponse = () => {
    // let firstRenderChapters = this.state.firstRenderChapters;
    let that = this;
    let progress = firstRenderChapters.progress;
    this.number = firstRenderChapters.chapters[0].number;
    const lists = firstRenderChapters.chapters;
    let arr = [];
    let content = that.nbsp2Space(lists[0].content);
    let _arr = Util.handleContent(content);
    that.currentChapter = _arr.length;
    _arr.forEach(function(_item) {
      let chapterInfo = {
        title: lists[0].title,
        num: lists[0].number,
        content: _item,
      };
      arr.push(chapterInfo);
    });
    if (lists.length === 2) {
      content = that.nbsp2Space(lists[1].content);
      _arr = Util.handleContent(content);
      that.nextChapter = _arr.length;
      _arr.forEach(function(_item) {
        let chapterInfo = {
          title: lists[1].title,
          num: lists[1].number,
          content: _item,
        };
        arr.push(chapterInfo);
      });
    }
    that.setState({
      _data: arr,
    });
    let scrollView = that.scrollView;
    scrollView.scrollTo({x: progress * 375, y: 0, animated: false});
  };

  // 切换目录
  openDerictory() {
    this.hideAll();
    // this.props.navigation.navigate('Directory', {
    //   id: this.props.navigation.state.params.id,
    //   name: this.props.navigation.state.params.name,
    // });
  }

  goTarget = routeName => {
    this.props.navigation.navigate(routeName);
  };

  // 返回
  goBack() {
    this.hideAll();
    this.props.navigation.goBack();
  }

  _concatData(newData) {
    let _data = this.state._data.concat(newData);
    this.setState({
      _data,
    });
  }

  _unshiftData(newData) {
    const that = this;
    newData = newData.concat(this.state._data);

    setTimeout(function() {
      that.setState({
        _data: newData,
        searching: false,
      });
    }, 300);
  }

  // 通过章节获取内容
  getContent = chapterInfo => {
    const content = chapterInfo.content;
    let arr = [];
    let _content = this.nbsp2Space(content);
    let _arr = Util.handleContent(_content);
    this.currentChapter = this.nextChapter;
    this.nextChapter = _arr.length;
    _arr.forEach(function(_item) {
      let _chapterInfo = {
        title: chapterInfo.title,
        num: chapterInfo.number,
        content: _item,
      };
      arr.push(_chapterInfo);
    });
    return arr;
  };

  // 滑动事件
  handleScroll(e) {
    let arr = [];
    let chapterInfo;
    // let listView = this.refs.listView;
    let x = e.nativeEvent.contentOffset.x;
    const that = this;
    if (this.count === 0) {
      this.count = (this.currentChapter - 1) * 375;
    }

    this.x = x;
    if (x > this.count) {
      this.a = this.count;
      this.count += this.nextChapter * 375;
      if (
        this.number + 2 <
        parseInt(this.state.firstRenderChapters.countChapter)
      ) {
        let json = {
          novelId: that.uuid,
          num: that.number + 2,
        };
        Request.post('/chapters', json).then(data => {
          chapterInfo = data.response;
          that.number = that.number + 1;
          let chapterInfoArr = that.getContent(chapterInfo);
          that._concatData(chapterInfoArr);
        });
      } else {
        this.a = 0;
      }
    }

    if (x < 0 && this.number === 0) {
      Alert.alert('已是第一页');
    }

    if (x < 0) {
      this.i = 1;
      let json = {
        novelId: that.uuid,
        num: that.number - 1,
      };
      Request.post('/chapters', json).then(data => {
        chapterInfo = data.response;
        that.number = that.number - 1;
        let content = that.nbsp2Space(chapterInfo.content);
        let _arr = Util.handleContent(content);
        that.currentChapter = _arr.length;
        that.nextChapter = that.currentChapter;
        _arr.forEach(function(_item) {
          let _chapterInfo = {
            title: chapterInfo.title,
            num: chapterInfo.number,
            content: _item,
          };
          arr.push(_chapterInfo);
        });
        that.setState({searching: true});
        that._unshiftData(arr);
      });
    }
  }

  _keyContentExtractor = (item, index) => index.toString() + 'content';
  _keyChapterExtractor = (item, index) => index.toString() + 'chapter';

  _renderItem = ({item, index}) => {
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}} key={index}>
        {this.renderContent(item)}
      </View>
    );
  };

  _renderEmpty = () => {
    return (
      <View>
        <Text>无数据</Text>
      </View>
    );
  };

  _separator = () => {
    // 再刷新or加载的时候进行的动画或者文字效果
    return <View style={{height: 1}} />;
  };

  _renderSliderChapter = () => {
    if (!this.state.showSliderChapter) {
      return null;
    }
    return (
      <View
        style={{
          position: 'absolute',
          top: -100,
          left: 0.2 * Util.size.width,
          height: 72,
          width: 0.6 * Util.size.width,
          backgroundColor: '#222222',
          borderRadius: 10,
        }}>
        <View
          style={{
            paddingTop: 10,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, color: '#fff'}} numberOfLines={1}>
            第二百九十五章 羞花代言
          </Text>
          <Text style={{fontSize: 16, color: '#F48801', marginTop: 10}}>
            {this._getPercentage()}%
          </Text>
        </View>
      </View>
    );
  };

  _getPercentage = () => {
    let tmpNum = this.state.chapterNum / this.state.maxChapterNum;
    return (tmpNum * 100).toFixed(2);
  };

  _renderFooter = () => {
    return null;
  };

  // 渲染章节内容
  renderChapter() {
    return (
      <View
        style={{
          backgroundColor: Colors[this.state.curColorInt],
          // backgroundColor: 'red',
        }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal={true}
          data={this.state._data}
          extraData={this.state}
          keyExtractor={this._keyChapterExtractor}
          renderItem={this._renderItem}
          ListEmptyComponent={this._renderEmpty}
          ListFooterComponent={this._renderFooter}
          ItemSeparatorComponent={this._separator}
          initialNumToRender={10}
          numColumns={1}
          flashScrollIndicators={true}
        />
        <View style={styles.foot}>{this._renderBottomInfo()}</View>
      </View>
    );
  }

  loading() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{height: Util.size.height, width: Util.size.width}}
          activeOpacity={1}
          onPress={() => this.show()}>
          <Text>搜索中...</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _renderContentItem = ({item, index}) => {
    // console.log('item', item)
    return (
      <Text
        style={{
          color: '#604733',
          fontSize: this.state.curFontSize,
          marginTop: Spaces[this.state.curSpaceInt],
          flexWrap: 'wrap',
        }}
        key={index}>
        {item}
      </Text>
    );
  };
  // 渲染内容
  renderContent = rowData => {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.topBox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.showReaderOptions()}>
              <View style={styles.topMenuBox}>
                <Icon
                  name="align-justify"
                  type="feather"
                  color="#A69673"
                  size={14}
                />
                <Text style={{marginLeft: 5, color: '#A69673', fontSize: 12}}>
                  菜单
                </Text>
              </View>
            </TouchableOpacity>

            <View style={{marginLeft: 20}}>
              <Text style={styles.chapterName}>{rowData.title}</Text>
            </View>
          </View>
          <View style={{marginRight: 10}}>
            <TouchableOpacity>
              <Icon
                name="bitcoin-circle"
                type="foundation"
                color="#A69673"
                size={28}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.chapterContent}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={rowData.content}
            extraData={this.state}
            renderItem={this._renderContentItem}
            keyExtractor={this._keyContentExtractor}
            numColumns={1}
            flashScrollIndicators={true}
          />
        </View>
      </View>
    );
  };

  _renderBottomInfo = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
          paddingBottom: 5,
        }}>
        <View style={styles.footLeft}>
          <Battery
            type={'nogrid'}
            size={20}
            percent={this.state.batteryLevel}
            color={'#948A6B'}
          />
          <Text
            style={{
              marginLeft: 3,
              fontSize: 12,
              color: '#A58F72',
            }}>
            {this.state.curTime}
          </Text>
        </View>
        <View>
          <Text style={{color: '#9E9474', fontSize: 12}}>
            提醒：请勿向他人泄露银行卡信息
          </Text>
        </View>
        <View style={styles.footRight}>
          <Text
            style={{
              fontSize: 12,
              color: '#A58F72',
            }}>
            本章进度100%
          </Text>
        </View>
      </View>
    );
  };

  _renderBottomAd = () => {
    if (this.state.firstOpen) {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: Colors[this.state.curColorInt],
            paddingTop: 13,
            paddingBottom: 13,
          }}>
          <Text style={{fontSize: 24, color: '#D3C093', fontWeight: '700'}}>
            免费看书100年
          </Text>
          <Text style={{fontSize: 24, color: '#D3C093', fontWeight: '700'}}>
            七猫免费小说
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: Colors[this.state.curColorInt],
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderRadius: 5,
                overflow: 'hidden',
              }}>
              <Image source={logoPng} style={{width: 100, height: 48}} />
            </View>
            <View style={{marginLeft: 10}}>
              <View>
                <Text
                  style={{fontSize: 16, color: '#353028', fontWeight: '600'}}>
                  快手
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{fontSize: 12, color: '#D3C093', fontWeight: '700'}}
                  numberOfLines={1}>
                  一场自导自演的首富认证与梦想
                </Text>
                <Text
                  style={{fontSize: 12, color: '#D3C093', fontWeight: '700'}}>
                  腾讯广告
                </Text>
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: '#FAB337',
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: 15,
                  paddingRight: 15,
                  borderRadius: 10,
                }}>
                <Text style={{color: '#eee', fontSize: 14}}>点击下载</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  _prev = () => {
    console.log('上一页');
  };

  _next = () => {
    console.log('下一页');
  };

  _renderDefaultOption = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 45,
          left: 0,
          width: Util.size.width,
          height: Util.size.height - 110,
          backgroundColor: 'rgb(0,0,0,0)',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => this._prev()}>
          <View
            style={{
              width: (Util.size.width - 120) / 2,
              height: Util.size.height - 110,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._next()}>
          <View
            style={{
              width: 120,
              height: Util.size.height - 110,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => this.showReaderOptions()}>
              <View
                style={{
                  width: 100,
                  height: Util.size.height - 320,
                }}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._next()}>
          <View
            style={{
              width: (Util.size.width - 120) / 2,
              height: Util.size.height - 110,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <Provider>
        <View style={styles.container}>
          <StatusBar
            backgroundColor={'#3B3A38'}
            translucent={true}
            hidden={this.state.hideStatusBar}
            animated={true}
            barStyle="light-content"
          />
          <ScrollView
            ref={scrollView => (this.scrollView = scrollView)}
            scrollEventThrottle={800}
            horizontal={true}
            onScroll={e => this.handleScroll(e)}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            pagingEnabled={true}>
            {this.state.searching ? this.loading() : this.renderChapter()}
          </ScrollView>
          <View style={{}}>{this._renderBottomAd()}</View>

          {/* {this._renderDefaultOption()} */}
          {this._renderReaderOptions()}
          {this._renderReadSetting()}
          {this._renderLightSetting()}
          {this._renderDirectorySetting()}
        </View>
        <Modal
          popup
          closable
          maskClosable
          visible={this.state.showAddShelfModal}
          animationType="slide-up"
          onClose={this.closeAddShelfModal}>
          <View style={{}}>
            {/* 标题 */}
            <View
              style={{
                paddingLeft: 30,
                paddingRight: 15,
                paddingTop: 10,
                paddingBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 22, color: '#333'}}>加入书架</Text>
              <TouchableOpacity onPress={() => this.closeAddShelfModal()}>
                <Icon name="x" type="feather" color="#D8D8D8" size={30} />
              </TouchableOpacity>
            </View>
            {/* 内容 */}
            <View
              style={{
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 30,
                paddingBottom: 40,
              }}>
              <Text style={{fontSize: 18, color: '#333'}}>
                喜欢本书就加入书架吧！
              </Text>
            </View>
            {/* 按钮 */}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                borderTopColor: '#EBEBEB',
                borderTopWidth: 1,
              }}>
              <TouchableOpacity
                onPress={() => this.goBack()}
                style={{
                  flexGrow: 1,
                  flexBasis: '50%',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}>
                  <Text style={{color: '#666666', fontSize: 20}}>取消</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.addShelf()}
                style={{
                  flexGrow: 1,
                  flexBasis: '50%',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    paddingTop: 15,
                    paddingBottom: 15,
                    backgroundColor: '#FFDC34',
                  }}>
                  <Text style={{color: '#222222', fontSize: 20}}>确定</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Provider>
    );
  }

  _renderReaderShelfBox = () => {
    if (this.state.alAddShelf) {
      return null;
    }
    return (
      <Animated.View
        style={[
          styles.shelfBox,
          {
            transform: [
              {
                translateX: this.state.offsetOption.interpolate({
                  inputRange: [0, 1],
                  outputRange: [120, 0],
                }),
              }, // x轴移动
            ],
          },
        ]}>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: '#444444',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 10,
              paddingBottom: 10,

              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}>
            <Text style={{fontSize: 18, color: '#fff'}}>加入书架</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // 操作顶部
  _renderReaderOptionsTop = () => {
    return (
      <Animated.View
        style={{
          transform: [
            {
              translateY: this.state.offsetOption.interpolate({
                inputRange: [0, 1],
                outputRange: [-90, 0],
              }),
            },
          ],
        }}>
        <View style={styles.alertTop}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                this.goBack();
              }}>
              <Image
                style={styles.backImg}
                source={require('./imgs/back.png')}
              />
              <Text style={{fontSize: 20, color: '#fff'}}>返回</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginRight: 20,
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#F58902',
                  marginTop: 1,
                  paddingTop: 3,
                  paddingBottom: 3,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 15,
                  alignItems: 'center',
                }}>
                <Text style={{color: '#F58902', fontSize: 16}}>全本下载</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{marginLeft: 30, alignItems: 'center'}}>
                <Icon name="headphones" type="feather" color="#fff" size={24} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={{marginLeft: 30, alignItems: 'center'}}>
                <Icon
                  name="more-horizontal"
                  type="feather"
                  color="#fff"
                  size={24}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  _renderReaderOptionsMiddle = () => {
    return (
      <TouchableOpacity onPress={() => this.hideReadOption()}>
        <View style={{height: Util.size.height}} />
      </TouchableOpacity>
    );
  };

  _renderReaderOptionsBottom = () => {
    return (
      <Animated.View
        style={{
          transform: [
            {
              translateY: this.state.offsetOption.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -240],
              }),
            },
          ],
          zIndex: 99,
        }}>
        <View style={[styles.alertFoot, styles.alertFootOption]}>
          {this._renderSliderChapter()}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingTop: 20,
              paddingBottom: 20,
            }}>
            <TouchableOpacity>
              <View>
                <Text style={{color: '#C8C8C8', fontSize: 16}}>上一章</Text>
              </View>
            </TouchableOpacity>
            <View style={{justifyContent: 'center', width: 200}}>
              <Slider
                value={this.state.chapterNum}
                maximumValue={this.state.maxChapterNum}
                step={1}
                minimumValue={1}
                minimumTrackTintColor={'#F18500'}
                maximumTrackTintColor={'#666666'}
                thumbTintColor={'#F18500'}
                onValueChange={chapterNum =>
                  this.setState({chapterNum, showSliderChapter: true})
                }
              />
            </View>
            <TouchableOpacity>
              <View>
                <Text style={{color: '#C8C8C8', fontSize: 16}}>下一章</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingBottom: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.openDirectorySetting();
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                }}>
                <Icon name="list" type="feather" color="#A8A8A8" size={24} />
                <Text style={styles.directoryText}>目录</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.openDerictory();
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                }}>
                <Icon
                  name="ios-moon"
                  type="ionicon"
                  color="#A8A8A8"
                  size={24}
                />
                <Text style={styles.directoryText}>夜间模式</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.openLightSetting();
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                }}>
                <Icon name="list" type="feather" color="#A8A8A8" size={24} />

                <Text style={styles.directoryText}>亮度</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.openReadSetting();
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                }}>
                <Icon
                  name="widget"
                  type="foundation"
                  color="#A8A8A8"
                  size={24}
                />
                <Text style={styles.directoryText}>阅读设置</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  _renderReaderOptions = () => {
    if (this.state.hideOption) {
      return null;
    }
    return (
      <View style={[styles.alertContainer, {zIndex: 20}]}>
        {this._renderReaderOptionsTop()}
        {this._renderReaderShelfBox()}
        {this._renderReaderOptionsMiddle()}
        {this._renderReaderOptionsBottom()}
      </View>
    );
  };

  _renderReadSettingMiddle = () => {
    return (
      <TouchableOpacity onPress={() => this.outReadSetting()}>
        <View style={{height: Util.size.height}} />
      </TouchableOpacity>
    );
  };

  chooseBackColor = index => {
    this.setState({
      curColorInt: index,
    });
  };

  _renderBackColor = (index = 0) => {
    let bgcolor = Colors[index];
    let curColorInt = this.state.curColorInt;
    return (
      <TouchableOpacity onPress={() => this.chooseBackColor(index)}>
        <View style={[{backgroundColor: bgcolor}, styles.backColorBox]}>
          {curColorInt === index ? (
            <Icon name="check" type="feather" color="#FBA205" size={20} />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  chooseSpace = index => {
    this.setState({
      curSpaceInt: index,
    });
  };

  _renderSpaceBox = (index = 0) => {
    let n;
    let mp;
    if (index === 0) {
      n = 5;
      mp = 2;
    } else if (index === 1) {
      n = 4;
      mp = 4;
    } else {
      n = 3;
      mp = 5;
    }
    let curSpaceInt = this.state.curSpaceInt;
    let bgcolor = index === curSpaceInt ? '#FCA000' : '#B6B6B6';
    let brcolor = index === curSpaceInt ? '#FCA000' : '#B6B6B6';
    let brwidth = index === curSpaceInt ? 2 : 1;
    let renderItem = key => {
      return (
        <View
          style={{
            height: 2,
            backgroundColor: bgcolor,
            width: 30,
            marginTop: mp,
          }}
          key={key}
        />
      );
    };

    let ar = Array(n).fill(true);
    return (
      <TouchableOpacity
        onPress={() => this.chooseSpace(index)}
        style={
          {
            // backgroundColor: 'red',
          }
        }>
        <View
          style={{
            height: 45,
            paddingLeft: 45,
            paddingRight: 45,
            borderWidth: brwidth,
            borderColor: brcolor,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {ar.map(function(item, index) {
            return renderItem(index);
          })}
        </View>
      </TouchableOpacity>
    );
  };

  changeFontSize = chfs => {
    let curFontSize = this.state.curFontSize;
    let newFontSize = curFontSize + chfs / 2;
    this.setState({
      curFontSize: newFontSize,
    });
  };

  _renderPageTurn = index => {
    let curPageTurnInt = this.state.curPageTurnInt;
    let tmpPageTurn = PageTurns[index];
    let brcolor = index === curPageTurnInt ? '#F29A02' : '#636363';
    let brwidth = index === curPageTurnInt ? 2 : 1;
    let fontcolor = index === curPageTurnInt ? '#F29A02' : '#BDBDBD';
    return (
      <TouchableOpacity>
        <View
          style={{
            width: 80,
            alignContent: 'center',
            borderRadius: 20,
            borderWidth: brwidth,
            borderColor: brcolor,
            alignItems: 'center',
            paddingTop: 8,
            paddingBottom: 8,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 14, color: fontcolor}}>{tmpPageTurn}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  _renderReadSettingBottom = () => {
    return (
      <Animated.View
        style={{
          transform: [
            {
              translateY: this.state.offsetRead.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -370],
              }),
            },
          ],
        }}>
        <View style={[styles.alertFoot, styles.alertFootSetting]}>
          <View style={{paddingTop: 12, paddingBottom: 12}}>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 15,
                paddingBottom: 15,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  alignItems: 'center',
                }}>
                <Text style={{color: '#8F8F8F', fontSize: 16}}>字号</Text>
              </View>
              <View
                style={{
                  width: Util.size.width - 90,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => this.changeFontSize(-2)}
                    style={{}}>
                    <View
                      style={{
                        paddingTop: 2,
                        paddingBottom: 5,
                        paddingLeft: 40,
                        paddingRight: 40,
                        borderWidth: 1,
                        borderColor: '#646464',
                        borderRadius: 25,
                      }}>
                      <Text style={{fontSize: 24, color: '#CCCCCC'}}>A-</Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}>
                    <Text style={{fontSize: 16, color: '#969696'}}>
                      {this.state.curFontSize * 2}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => this.changeFontSize(2)}>
                    <View
                      style={{
                        paddingTop: 2,
                        paddingBottom: 5,
                        paddingLeft: 40,
                        paddingRight: 40,
                        borderWidth: 1,
                        borderColor: '#646464',
                        borderRadius: 25,
                      }}>
                      <Text style={{fontSize: 24, color: '#CCCCCC'}}>A+</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    paddingTop: 9,
                    paddingBottom: 9,
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderWidth: 1,
                    borderColor: '#646464',
                    borderRadius: 25,
                  }}>
                  <Text style={{fontSize: 16, color: '#CCCCCC'}}>切换字体</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 15,
                paddingBottom: 15,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  alignItems: 'center',
                }}>
                <Text style={{color: '#8F8F8F', fontSize: 16}}>背景</Text>
              </View>
              <View
                style={{
                  width: Util.size.width - 90,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {this._renderBackColor(0)}
                {this._renderBackColor(1)}
                {this._renderBackColor(2)}
                {this._renderBackColor(3)}
                {this._renderBackColor(4)}
                {this._renderBackColor(5)}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 15,
                paddingBottom: 15,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  alignItems: 'center',
                }}>
                <Text style={{color: '#8F8F8F', fontSize: 16}}>间距</Text>
              </View>
              <View
                style={{
                  width: Util.size.width - 90,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {this._renderSpaceBox(0)}
                {this._renderSpaceBox(1)}
                {this._renderSpaceBox(2)}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 15,
                paddingBottom: 15,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  alignItems: 'center',
                }}>
                <Text style={{color: '#8F8F8F', fontSize: 16}}>翻页</Text>
              </View>
              <View
                style={{
                  width: Util.size.width - 90,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {this._renderPageTurn(0)}
                {this._renderPageTurn(1)}
                {this._renderPageTurn(2)}
                {this._renderPageTurn(3)}
              </View>
            </View>
          </View>
          <View style={{backgroundColor: '#404040', height: 1}} />
          <View>
            <TouchableOpacity onPress={() => this.goTarget('ReadSetting')}>
              <View
                style={{
                  paddingTop: 20,
                  paddingBottom: 20,
                  alignContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 14, color: '#C3C3C3'}}>
                  更多阅读设置
                </Text>
                <Icon
                  name="chevron-right"
                  type="feather"
                  color="#C3C3C3"
                  size={14}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  _renderReadSetting = () => {
    if (this.state.hideRead) {
      return null;
    }
    return (
      <View style={[styles.alertContainer, {zIndex: 30}]}>
        {this._renderReadSettingMiddle()}
        {this._renderReadSettingBottom()}
      </View>
    );
  };

  _renderLightSettingMiddle = () => {
    return (
      <TouchableOpacity onPress={() => this.hideLightSetting()}>
        <View style={{height: Util.size.height}} />
      </TouchableOpacity>
    );
  };

  _renderLightSettingBottom = () => {
    return (
      <Animated.View
        style={{
          transform: [
            {
              translateY: this.state.offsetLight.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -230],
              }),
            },
          ],
        }}>
        <View style={[styles.alertFoot, styles.alertFootLight]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 20,
              paddingBottom: 20,
            }}>
            <View
              style={{
                width: 40,
                alignContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <Icon name="circle" type="feather" color="#B8B8B8" size={12} />
            </View>
            <View
              style={{justifyContent: 'center', width: Util.size.width - 160}}>
              <Slider
                value={this.state.lightNum}
                maximumValue={this.state.maxLightNum}
                step={1}
                minimumValue={1}
                minimumTrackTintColor={'#F18500'}
                maximumTrackTintColor={'#666666'}
                thumbTintColor={'#F18500'}
                onValueChange={lightNum => this.setState({lightNum})}
              />
            </View>
            <View
              style={{
                width: 40,
              }}>
              <Icon name="sun" type="feather" color="#B8B8B8" size={20} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 20,
              paddingBottom: 20,
            }}>
            <Text style={{color: '#C9C9C9', fontSize: 17}}>亮度跟随系统</Text>
            <Switch
              trackColor="red"
              thumbColor="blue"
              value={this.state.flowSystem}
              onValueChange={flowSystem => {
                this.setState({
                  flowSystem,
                });
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 20,
              paddingBottom: 20,
            }}>
            <Text style={{color: '#C9C9C9', fontSize: 17}}>护眼模式</Text>
            <Switch
              trackColor="red"
              thumbColor="blue"
              value={this.state.protectMode}
              onValueChange={protectMode => {
                this.setState({
                  protectMode,
                });
              }}
            />
          </View>
        </View>
      </Animated.View>
    );
  };

  _renderLightSetting = () => {
    if (this.state.hideLight) {
      return null;
    }
    return (
      <View style={[styles.alertContainer, {zIndex: 30}]}>
        {this._renderLightSettingMiddle()}
        {this._renderLightSettingBottom()}
      </View>
    );
  };

  _renderDirectorySettingMiddle = () => {
    // if (this.state.hideMask) {
    //   return null;
    // }
    return (
      <TouchableOpacity onPress={() => this.hideDirectorySetting()}>
        {/* <Animated.View
          style={{
            height: Util.size.height,
            width: Util.size.width,
            backgroundColor: '#000',
            opacity: this.state.opacityDirectory,
          }}
        /> */}
        <View
          style={{
            height: Util.size.height,
            width: Util.size.width,
            backgroundColor: '#000',
            opacity: this.state.opacityDirectory,
          }}
        />
      </TouchableOpacity>
    );
  };

  _renderChapterItem = ({item, index}) => {
    return (
      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 15,
            paddingBottom: 15,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#EFA62B',
              fontWeight: '700',
              fontSize: 18,
            }}>
            第一章 百诡维嘉宅
          </Text>
          <Text style={{fontSize: 14, color: '#EFA62B'}}>免费</Text>
        </View>
      </TouchableOpacity>
    );
  };

  _renderDirectoryContent = () => {
    // 展示目录
    if (this.state.showChapters) {
      return (
        <View>
          {/* 章节数量 */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  color: '#5E4B28',
                }}>
                已完结
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 13,
                  color: '#5E4B28',
                }}>
                共733章
              </Text>
            </View>
            <View>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="arrow-down"
                    type="foundation"
                    color="#6F5C3B"
                    size={14}
                  />
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 14,
                      color: '#5E4B28',
                    }}>
                    倒序
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* 章节列表 */}
          <View
            style={{
              paddingTop: 20,
              paddingBottom: 40,
            }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={this.state.chapters}
              extraData={this.state.chapters}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderChapterItem}
              ListEmptyComponent={this._renderEmpty}
              initialNumToRender={10}
              numColumns={1}
              flashScrollIndicators={true}
            />
          </View>
        </View>
      );
    } else {
      // 展示书签
      return (
        <View>
          {/* 书签列表 */}
          <View
            style={{
              paddingTop: 20,
              paddingBottom: 40,
            }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={this.state.bookmarks}
              extraData={this.state.bookmarks}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderChapterItem}
              ListEmptyComponent={this._renderEmpty}
              initialNumToRender={10}
              numColumns={1}
              flashScrollIndicators={true}
            />
          </View>
        </View>
      );
    }
  };

  switchChapter = showChapters => {
    this.setState({
      showChapters,
    });
  };

  _renderDirectorySettingBottom = () => {
    return (
      <Animated.View
        style={{
          transform: [
            {
              translateX: this.state.offsetDirectory.interpolate({
                inputRange: [0, 1],
                outputRange: [-(Util.size.width * 0.8), 0],
              }),
            },
          ],
          width: Util.size.width * 0.8,
        }}>
        <View
          style={{
            height: Util.size.height,
            // backgroundColor: Colors[this.state.curColorInt],
            backgroundColor: '#FAECCD',
            width: Util.size.width * 0.8,
          }}>
          <View
            style={{
              paddingTop: 30,
              paddingLeft: 20,
              paddingRight: 20,
              position: 'relative',
              height: Util.size.height,
            }}>
            {/* 小说名称 */}
            <View
              style={{
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: '#5E4B28',
                }}>
                活人禁忌
              </Text>
            </View>
            {this._renderDirectoryContent()}
            {/* Tabbar */}
            <View
              style={{
                width: Util.size.width * 0.8,
                position: 'absolute',
                bottom: 0,
                left: 0,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                paddingTop: 10,
                paddingBottom: 20,
                backgroundColor: '#FAECCD',
              }}>
              <TouchableOpacity onPress={() => this.switchChapter(true)}>
                <View>
                  <Text
                    style={
                      this.state.showChapters
                        ? styles.activeDirectoryText
                        : styles.defaultDirectoryText
                    }>
                    目录
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.switchChapter(false)}>
                <View>
                  <Text
                    style={
                      !this.state.showChapters
                        ? styles.activeDirectoryText
                        : styles.defaultDirectoryText
                    }>
                    书签
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

  _renderDirectorySetting = () => {
    if (this.state.hideDirectory) {
      return null;
    }
    return (
      <View style={[styles.alertContainer, {zIndex: 30, flexDirection: 'row'}]}>
        {this._renderDirectorySettingBottom()}
        {this._renderDirectorySettingMiddle()}
      </View>
    );
  };

  // 打开阅读器选型
  openReadSetting = () => {
    this.hideReadOption();
    this.setState(
      {
        hideRead: false,
      },
      () => {
        this.inReadSetting();
      },
    );
  };

  // 打开亮度
  openLightSetting = () => {
    this.hideReadOption();
    this.setState(
      {
        hideLight: false,
      },
      () => {
        this.inLightSetting();
      },
    );
  };

  // 打开目录
  openDirectorySetting = () => {
    this.hideReadOption();
    // this.setState(
    //   {
    //     // hideMask: false,
    //     hideDirectory: false,
    //   },
    //   () => {
    //     this.inDirectorySetting();
    //   },
    // );
  };

  //显示动画
  inReaderOption() {
    Animated.parallel([
      Animated.timing(this.state.offsetOption, {
        easing: Easing.linear,
        duration: 300,
        toValue: 1,
      }),
    ]).start();
  }

  // 隐藏动画
  outReaderOption() {
    Animated.parallel([
      Animated.timing(this.state.offsetOption, {
        easing: Easing.linear,
        duration: 300,
        toValue: 0,
      }),
    ]).start(finished =>
      this.setState({
        hideOption: true,
        showSliderChapter: false,
      }),
    );
  }

  // 阅读设置
  inReadSetting() {
    Animated.parallel([
      Animated.timing(this.state.offsetRead, {
        easing: Easing.linear,
        duration: 500,
        toValue: 1,
      }),
    ]).start();
  }

  outReadSetting() {
    Animated.parallel([
      Animated.timing(this.state.offsetRead, {
        easing: Easing.linear,
        duration: 500,
        toValue: 0,
      }),
    ]).start(finished =>
      this.setState({
        hideRead: true,
      }),
    );
  }

  hideReadSetting = () => {
    if (!this.state.hideRead) {
      this.outReadSetting();
    }
  };

  // 亮度设置
  inLightSetting() {
    Animated.parallel([
      Animated.timing(this.state.offsetLight, {
        easing: Easing.linear,
        duration: 300,
        toValue: 1,
      }),
    ]).start();
  }

  outLightSetting() {
    Animated.parallel([
      Animated.timing(this.state.offsetLight, {
        easing: Easing.linear,
        duration: 300,
        toValue: 0,
      }),
    ]).start(finished =>
      this.setState({
        hideLight: true,
      }),
    );
  }

  hideLightSetting = () => {
    if (!this.state.hideLight) {
      this.outLightSetting();
    }
  };

  // 目录设置
  inDirectorySetting() {
    Animated.parallel([
      // Animated.timing(this.state.opacityDirectory, {
      //   easing: Easing.linear,
      //   duration: 100,
      //   toValue: 0.2,
      // }),
      Animated.timing(this.state.offsetDirectory, {
        easing: Easing.linear,
        duration: 500,
        toValue: 1,
      }),
    ]).start();
  }

  outDirectorySetting() {
    // this.setState({
    //   hideMask: true,
    // });
    Animated.parallel([
      // Animated.timing(this.state.opacityDirectory, {
      //   easing: Easing.linear,
      //   duration: 100,
      //   toValue: 0,
      // }),
      Animated.timing(this.state.offsetDirectory, {
        easing: Easing.linear,
        duration: 500,
        toValue: 0,
      }),
    ]).start(finished =>
      this.setState({
        hideDirectory: true,
      }),
    );
  }

  hideDirectorySetting = () => {
    if (!this.state.hideDirectory) {
      this.outDirectorySetting();
    }
  };

  // 取消
  hideReadOption = () => {
    if (!this.state.hideOption) {
      this.outReaderOption();
    }
  };

  hideAll = () => {
    this.hideReadOption();
    this.hideReadSetting();
  };

  showReaderOptions() {
    if (this.state.hideOption) {
      this.setState({hideOption: false}, this.inReaderOption);
    }
  }

  nbsp2Space = str => {
    return !str ? null : str.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, '        ');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#E9DFC7',
  },
  contentContainer: {
    position: 'relative',
    width: Util.size.width,
    flexWrap: 'wrap',
  },
  topBox: {
    width: Util.size.width - 20,
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topMenuBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4BA90',
    paddingTop: 3,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
  },
  chapterContent: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    width: Util.size.width - 20,
    height: Util.size.height - 140,
    // backgroundColor: 'red',
  },
  chapterName: {
    fontSize: 14,
    color: '#A58F72',
  },
  bigChapterName: {
    fontSize: 22,
  },
  ficContent: {
    color: '#604733',
    fontSize: 24,
    lineHeight: 40,
  },
  foot: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: Util.size.width,
  },
  footLeft: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  footRight: {
    flexDirection: 'row',
  },
  shelfBox: {
    position: 'absolute',
    top: 120,
    right: 0,
    width: 120,
    height: 50,
    zIndex: 99,
  },
  alertContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Util.size.width,
    height: Util.size.height,
  },
  alertTop: {
    backgroundColor: '#3B3A38',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 42,
    paddingBottom: 20,
  },
  alertMiddle: {
    height: Util.size.height - 140,
  },
  alertFoot: {
    backgroundColor: '#333333',
  },
  alertFootOption: {
    minHeight: 240,
  },
  alertFootSetting: {
    minHeight: 400,
    paddingLeft: 20,
    paddingRight: 20,
  },
  alertFootLight: {
    minHeight: 320,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  backImg: {
    marginLeft: 10,
  },
  directoryImg: {
    marginLeft: 10,
    marginTop: 10,
  },
  directoryText: {
    marginTop: 2,
    color: '#B6B6B6',
    fontSize: 14,
  },

  backColorBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  activeBackColor: {
    borderWidth: 1,
    borderColor: '#FBA204',
  },
  activeDirectoryText: {
    color: '#5E4B28',
    fontSize: 16,
    fontWeight: '700',
  },
  defaultDirectoryText: {
    color: '#937743',
    fontSize: 14,
  },
});

export default Reader;
