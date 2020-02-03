import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  findNodeHandle,
  UIManager,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Header, Text, Image, Icon} from 'react-native-elements';
import {IS_IOS} from '../../../config';

import data from './Data/data';

const logoPng = require('../../../assets/qimao/image/logo.png');

const filterData = require('./Data/filterData.json');

class Filter extends Component {
  static navigationOptions = {
    title: '书架',
  };
  constructor(props) {
    super(props);

    let routeParams = props.navigation.state.params;
    let cateId = routeParams ? routeParams.cateId : 0;
    let cateTitle = filterData.data.cates[cateId];

    let types = ['全部'].concat(filterData.data.types[cateId]);
    let comps = ['全部'].concat(filterData.data.comps);
    let nums = ['全部'].concat(filterData.data.nums);
    this.state = {
      cateId: cateId,
      cateTitle: cateTitle,
      types: types,
      comps: comps,
      nums: nums,
      orders: filterData.data.orders,
      specialList: filterData.data.specialList,
      ...data,

      curType: 0,
      curNum: 0,
      curOrder: 0,
      curComp: 0,
      isExpand: false,

      stop: false,
      showAno: false,
      pos: 1,
      filterBorderPos: {},
    };

    this.goBack = this.goBack.bind(this);
    this._keyExtractor = this._keyExtractor.bind(this);
    this._separator = this._separator.bind(this);
  }

  componentDidMount() {}

  goBack() {
    this.props.navigation.goBack();
  }

  _onPressLeft = () => {
    this.setState({
      left: true,
    });
  };

  _onPressRight = () => {
    this.setState({
      left: false,
    });
  };

  renderLeftComponent() {
    return (
      <Icon name="left" color="#000" type="antdesign" onPress={this.goBack} />
    );
  }

  renderRightComponent() {
    return null;
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#000', fontSize: 24}}>
          {this.state.cateTitle}
        </Text>
      </View>
    );
  }

  _keyExtractor = (item, index) => index.toString();

  _separator = () => {
    // 再刷新or加载的时候进行的动画或者文字效果
    return <View style={{height: 1}} />;
  };

  _renderSpecialItem = row => {
    let item = row.item;
    return (
      <View
        style={{
          marginBottom: 20,
          flexDirection: 'row',
        }}
        key={item.id}>
        <View style={{width: 90, height: 120, overflow: 'hidden'}}>
          <Image source={logoPng} style={{width: 90, height: 120}} />
        </View>
        <View
          style={{
            marginLeft: 10,
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 20}}>
              {item.title}
              {item.id}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <View>
                <Text
                  style={{
                    color: '#FF8D00',
                    fontSize: 20,
                    fontWeight: '700',
                  }}>
                  {item.fraction}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: '#FF8D00',
                    paddingBottom: 2,
                  }}>
                  分
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <Text style={{fontSize: 16, color: '#6D6963'}} numberOfLines={2}>
              {item.summery}
            </Text>
          </View>
          <Text style={{fontSize: 14, color: '#6D6963'}}>
            连载 {item.count} 万字
          </Text>
        </View>
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

  _renderFooter = () => {
    if (this.state.hasMore) {
      if (this.state.loading) {
        return (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 5,
              marginBottom: 15,
            }}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        );
      } else {
        return null;
      }
    }
    return (
      <View
        style={{
          backgroundColor: '#F5F5F5',
          paddingBottom: 15,
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <Text
          style={{
            color: '#6D6963',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            marginTop: 15,
          }}>
          已经到底了~
        </Text>
      </View>
    );
  };

  _onScroll = event => {
    let that = this;
    if (this.state.stop) {
      return;
    }
    let showAno = that.state.showAno;
    let scrollY = event.nativeEvent.contentOffset.y;
    let filterBorderPos = this.state.filterBorderPos;
    if (filterBorderPos) {
      let finalHeight = filterBorderPos.pageY + filterBorderPos.height;
      if (scrollY > finalHeight && !showAno) {
        that.setState({
          showAno: true,
        });
      }
      if (scrollY < finalHeight && showAno) {
        that.setState({
          showAno: false,
        });
      }
    }
  };

  _fetchMore = info => {
    console.log('xxxx', info);
  };

  _renderFilterDown = () => {
    if (this.state.isExpand) {
      return (
        <View>
          <View style={styles.filterBox}>
            {this.state.nums.map(function(item, index) {
              if (index === 0) {
                return <Text style={styles.activeStyle}>{item}</Text>;
              } else {
                return <Text style={styles.defaultStyle}>{item}</Text>;
              }
            })}
          </View>
          <View style={styles.filterBox}>
            {this.state.orders.map(function(item, index) {
              if (index === 0) {
                return <Text style={styles.activeStyle}>{item}</Text>;
              } else {
                return <Text style={styles.defaultStyle}>{item}</Text>;
              }
            })}
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  _getFilterBorderPos(filterBorder) {
    let that = this;
    const handle = findNodeHandle(filterBorder);
    setTimeout(() => {
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        that.setState({
          filterBorderPos: {
            x,
            y,
            width,
            height,
            pageX,
            pageY,
          },
        });
      });
    }, 100);
  }

  _renderFilterBorder() {
    if (this.state.isExpand) {
      return (
        <View
          ref={c => {
            this.filterBorder = c;
          }}
          onLayout={() => this._getFilterBorderPos(this.filterBorder)}
          style={{
            height: 1,
            borderBottomColor: '#F5F5F5',
            borderBottomWidth: 1,
            marginBottom: 20,
          }}
        />
      );
    } else {
      return (
        <View
          ref={c => {
            this.filterBorder = c;
          }}
          onLayout={() => this._getFilterBorderPos(this.filterBorder)}
          style={{marginBottom: 20}}>
          <View
            style={{
              height: 1,
              borderBottomColor: '#F5F5F5',
              borderBottomWidth: 1,
            }}
          />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  isExpand: true,
                });
              }}>
              <Text
                style={{
                  color: '#B3B3B3',
                  backgroundColor: '#F5F5F5',
                  paddingTop: 2,
                  paddingBottom: 2,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}>
                展开更多筛选条件
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  _renderFilter(pos) {
    if (this.state.showAno) {
      return null;
    }
    if (this.state.pos === pos) {
      return (
        <View style={{marginTop: 15}}>
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <View style={styles.filterBox}>
              {this.state.types.map(function(item, index) {
                if (index === 0) {
                  return <Text style={styles.activeStyle}>{item}</Text>;
                } else {
                  return <Text style={styles.defaultStyle}>{item}</Text>;
                }
              })}
            </View>
            <View style={styles.filterBox}>
              {this.state.comps.map(function(item, index) {
                if (index === 0) {
                  return <Text style={styles.activeStyle}>{item}</Text>;
                } else {
                  return <Text style={styles.defaultStyle}>{item}</Text>;
                }
              })}
            </View>
            {this._renderFilterDown()}
          </View>
          {this._renderFilterBorder()}
        </View>
      );
    }
    return null;
  }

  _renderAnoFilter() {
    if (this.state.showAno) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.setState({
              showAno: false,
              pos: 0,
              isExpand: true,
              stop: true,
            });
          }}>
          <View
            style={{
              paddingTop: 20,
              paddingBottom: 20,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{color: '#FF9006', fontSize: 16}}>完结 - 按热度</Text>
            <Icon
              name="chevron-down"
              type="feather"
              color="#DADADA"
              size={20}
            />
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#fff'}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
        />
        {this._renderFilter(0)}
        {this._renderAnoFilter()}
        <ScrollView
          onScroll={this._onScroll}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={IS_IOS ? 0.02 : 0.2}
          onEndReached={this._fetchMore}>
          {this._renderFilter(1)}
          <View
            style={{
              marginTop: 15,
              flexShrink: 0,
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.specialList}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderSpecialItem}
              ListEmptyComponent={this._renderEmpty}
              ItemSeparatorComponent={this._separator}
              initialNumToRender={10}
              numColumns={1}
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
  },
  filterBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 10,
  },
  activeStyle: {
    marginTop: 3,
    marginRight: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 3,
    fontSize: 16,
    fontWeight: '700',
    color: 'orange',
    backgroundColor: '#FFF4E1',
    borderRadius: 15,
  },
  defaultStyle: {
    marginTop: 3,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 3,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Filter;
