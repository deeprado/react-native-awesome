import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Actions,
  View,
} from 'react-native';

let totalPage = 5; //总的页数
let itemNo = 0; //item的个数

const REQUEST_URL = 'http://183.131.205.41/Bbs?page=';

export default class More extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      isLoading: true,
      //网络请求状态
      error: false,
      errorInfo: '',
      dataArray: [],
      showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
      isRefreshing: false, //下拉控制
    };
  }

  //网络请求——获取数据
  fetchData() {
    //这个是js的访问网络的方法
    console.log(REQUEST_URL + this.state.page);
    fetch(REQUEST_URL + this.state.page, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseData => {
        let data = responseData.data; //获取json 数据并存在data数组中
        let dataBlob = []; //这是创建该数组，目的放存在key值的数据，就不会报黄灯了
        let i = itemNo;
        //将data循环遍历赋值给dataBlob
        data.map(function(item) {
          dataBlob.push({
            key: i,
            title: item.title,
            createtime: item.createtime,
          });
          i++;
        });
        itemNo = i;
        let foot = 0;
        if (this.state.page >= totalPage) {
          foot = 1; //listView底部显示没有更多数据了
        }
        this.setState({
          //复制数据源
          dataArray: this.state.dataArray.concat(dataBlob),
          isLoading: false,
          showFoot: foot,
          isRefreshing: false,
        });

        data = null; //重置为空
        dataBlob = null;
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: true,
          errorInfo: error,
        });
      })
      .done();
  }

  componentDidMount() {
    this.fetchData();
  }

  // (true 的话进行下2步操作componentWillUpdate和componentDidUpdate
  shouldComponentUpdate() {
    return true;
  }

  handleRefresh = () => {
    this.setState({
      page: 1,
      isRefreshing: true, //tag,下拉刷新中，加载完全，就设置成flase
      dataArray: [],
    });
    this.fetchData();
  };

  //加载等待页
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color="blue" size="large" />
      </View>
    );
  }

  // 给list设置的key，遍历item。这样就不会报黄线
  _keyExtractor = (item, index) => index.toString();

  //加载失败view
  renderErrorView() {
    return (
      <View style={styles.container}>
        <Text>{this.state.errorInfo}</Text>
      </View>
    );
  }

  //返回itemView
  _renderItemView({item}) {
    //onPress={gotoDetails()}
    const gotoDetails = () => Actions.news({url: item.url}); //跳转并传值
    return (
      // <TouchableNativeFeedback onPress={() => {Actions.news({'url':item.url})}} >////切记不能带（）不能写成gotoDetails()
      <TouchableNativeFeedback onPress={gotoDetails}>
        <View>
          <Text style={styles.title}>标题：{item.title}</Text>
          <Text style={styles.content}>时间: {item.createtime}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }

  renderData() {
    return (
      <FlatList
        data={this.state.dataArray}
        renderItem={this._renderItemView}
        ListFooterComponent={this._renderFooter.bind(this)}
        onEndReached={this._onEndReached.bind(this)}
        onEndReachedThreshold={1}
        ItemSeparatorComponent={this._separator}
        keyExtractor={this._keyExtractor}
        //为刷新设置颜色
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.handleRefresh.bind(this)} //因为涉及到this.state
            colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
            progressBackgroundColor="#ffffff"
          />
        }
      />
    );
  }

  render() {
    //第一次加载等待的view
    if (this.state.isLoading && !this.state.error) {
      return this.renderLoadingView();
    } else if (this.state.error) {
      //请求失败view
      return this.renderErrorView();
    }
    //加载数据
    return this.renderData();
  }

  _separator() {
    return <View style={{height: 1, backgroundColor: '#999999'}} />;
  }

  _renderFooter() {
    if (this.state.showFoot === 1) {
      return (
        <View
          style={{
            height: 30,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              color: '#999999',
              fontSize: 14,
              marginTop: 5,
              marginBottom: 5,
            }}>
            没有更多数据了
          </Text>
        </View>
      );
    } else if (this.state.showFoot === 2) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
          <Text>正在加载更多数据...</Text>
        </View>
      );
    } else if (this.state.showFoot === 0) {
      return (
        <View style={styles.footer}>
          <Text></Text>
        </View>
      );
    }
  }

  _onEndReached() {
    //如果是正在加载中或没有更多数据了，则返回
    if (this.state.showFoot != 0) {
      return;
    }
    //如果当前页大于或等于总页数，那就是到最后一页了，返回
    if (this.state.page != 1 && this.state.page >= totalPage) {
      return;
    } else {
      this.state.page++;
    }
    //底部显示正在加载更多数据
    this.setState({showFoot: 2});
    //获取数据，在componentDidMount()已经请求过数据了
    if (this.state.page > 1) {
      this.fetchData();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 15,
    color: '#ffa700',
  },
  footer: {
    flexDirection: 'row',
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  content: {
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 14,
    color: 'black',
  },
});
