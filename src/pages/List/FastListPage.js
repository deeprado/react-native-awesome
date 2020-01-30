import React, {Component} from 'react';
import {
  View,
  RefreshControl,
  TouchableWithoutFeedback,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ListView,
} from 'react-native';

class Row extends Component {
  constructor(props) {
    super(props);
    let data = this.props.data;
    this.state = {
      id: data ? data.id : 0,
      text: data ? data.text : 'xxx',
      clicks: data ? data.clicks : 0,
    };
  }
  _onClick = () => {
    let clicks = this.state.clicks;
    this.setState({
      clicks: clicks + 1,
    });
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={this._onClick}>
        <View style={styles.row}>
          <Text style={styles.rowText}>
            {this.state.text + '(' + this.state.clicks + ' clicks)'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
export default class FastListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      page: 1,
      count: 10,
      loaded: 0,
      // 使用map创建对象数组
      rowData: [],
      isLoadingMore: false,
      loading: false,
      timer: null,

      // 执行次数
      cc: 0,
    };
  }

  componentDidMount() {
    let that = this;
    // 间隔2秒结束下拉刷新
    let timer = setTimeout(function() {
      that._fetchData();
    }, 1000);

    that.setState({
      timer: timer,
    });
  }

  _fetchData = () => {
    let page = this.state.page;
    let count = this.state.count;

    let rowData = Array.from(new Array(count)).map((val, i) => ({
      id: this.state.loaded + i,
      text: '加载_' + '页码' + page + '_' + (this.state.loaded + i),
      clicks: 0,
    }));

    // 若是上滑加载
    if (this.state.isLoadingMore) {
      // .concat拼接字符串，数组
      rowData = rowData.concat(this.state.rowData);
    }

    // 初始化和刷新直接覆盖
    this.setState({
      loaded: this.state.loaded + count,
      isRefreshing: false,
      isLoadingMore: false,
      rowData: rowData,
      loading: false,
      cc: this.state.cc + 1,
    });
  };

  componentWillUnmount() {
    this.state.timer && clearTimeout(this.state.timer);
  }

  _hasMore = () => {
    if (this.state.isLoadingMore) {
      return true;
    }
    return false;
  };

  _renderItem = row => {
    return <Row key={row.index} data={row.item} />;
  };
  _keyExtractor = (item, index) => item.id.toString();

  _onRefresh = () => {
    this.setState({
      page: 1,
      isRefreshing: true,
      isLoadingMore: false,
      loaded: 0,
      cc: 0,
    });
    let that = this;

    // 间隔2秒结束下拉刷新
    let timer = setTimeout(function() {
      that._fetchData();
    }, 1000);

    that.setState({
      timer: timer,
    });
  };

  _renderEmpty = () => {
    return (
      <View style={[styles.container, styles.emptyData]}>
        <Text style={styles.emptyText}>暂无数据</Text>
      </View>
    );
  };

  _renderFooter = () => {
    return this._hasMore() ? (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <View style={styles.footer}>
        <Text style={{textAlign: 'center'}}>
          哥，这就是底线了 {this.state.page}
        </Text>
      </View>
    );
  };

  _renderHeader = () => {
    return this.state.isRefreshing ? (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <View style={styles.footer}>
        <Text>测试列表</Text>
      </View>
    );
  };

  _loadMore = distanceFromEnd => {
    let page = this.state.page + 1;
    this.setState({
      page: page,
      isRefreshing: false,
      isLoadingMore: true,
    });
    this._fetchData();
  };

  _separator() {
    // 再刷新or加载的时候进行的动画或者文字效果
    return <View style={{height: 1}} />;
  }

  _renderData1 = () => {
    return (
      <FlatList
        data={this.state.rowData}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmpty}
        ListFooterComponent={this._renderFooter}
        ItemSeparatorComponent={this._separator}
        ListHeaderComponent={this._renderHeader}
        initialNumToRender={10}
        numColumns={1}
        onEndReached={this._loadMore}
        onEndReachedThreshold={0.1}
        extraData={this.state}
        flashScrollIndicators={true}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="加载中..."
            titleColor="#00ff00"
          />
        }
      />
    );
  };

  _renderData2 = () => {
    return (
      <ListView
        dataSource={this.state.rowData}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        renderFooter={this._renderFooter}
        renderHeader={this._renderHeader}
        onEndReached={this._loadMore}
        onEndReachedThreshold={20}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="加载中..."
            titleColor="#00ff00"
          />
        }
      />
    );
  };

  render() {
    return this.state.loading ? (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <View style={styles.container}>{this._renderData1()}</View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#3a5795',
    borderWidth: 1,
    padding: 20,
    borderColor: 'grey',
    margin: 5,
  },
  rowText: {alignSelf: 'center', color: '#fff'},

  container: {
    flex: 1,
    backgroundColor: '#ffaaff',
    borderBottomColor: 'red',
    borderBottomWidth: 5,
  },
  horizontal: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  emptyData: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
  footer: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
