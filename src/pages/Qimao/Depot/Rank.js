import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Easing,
  Animated,
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
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
const logoPng = require('../../../assets/qimao/image/logo.png');
const CateData = require('./Data/rankData.json');

const tabList = [{title: '浏览记录'}, {title: '书架记录'}];

class Rank extends Component {
  static navigationOptions = {
    title: '书架',
  };
  constructor(props) {
    super(props);

    this._flatList = null;
    this._sectionList = null;
    this.state = {
      left: true,
      selectedRootCate: 0,
    };

    this.goBack = this.goBack.bind(this);
    this._renderTop = this._renderTop.bind(this);
    this._keyExtractor = this._keyExtractor.bind(this);
    this._separator = this._separator.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._renderCategoryItem = this._renderCategoryItem.bind(this);
    this._renderListHeader = this._renderListHeader.bind(this);
    this._renderContent = this._renderContent.bind(this);

    this.renderItemCate = this.renderItemCate.bind(this);
    this.renderRootCate = this.renderRootCate.bind(this);
  }

  componentDidMount() {}

  goBack() {
    this.props.navigation.navigate('DepotTab');
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
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={this._onPressLeft}>
            <View>
              <Text
                style={
                  this.state.left ? styles.activeStyle : styles.defaultStyle
                }>
                男生排行榜
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._onPressRight}
            style={{marginLeft: 20}}>
            <View>
              <Text
                style={
                  !this.state.left ? styles.activeStyle : styles.defaultStyle
                }>
                女生排行榜
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _keyExtractor = (item, index) => index.toString();

  _separator = () => {
    // 再刷新or加载的时候进行的动画或者文字效果
    return <View style={{height: 1}} />;
  };

  _renderItem = item => {
    let index = item.index;
    let title = item.item.title;
    return (
      <TouchableOpacity
        key={index}
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            height: 44,
          },
          this.state.selectedRootCate === index
            ? {
                backgroundColor: '#FFF',
                borderLeftWidth: 4,
                borderLeftColor: '#FFA93F',
              }
            : {backgroundColor: '#F5F5F5'},
        ]}
        onPress={() => {
          setTimeout(() => {
            (CateData.data.length - index) * 45 > height - 65
              ? this._flatList.scrollToOffset({
                  animated: true,
                  offset: index * 45,
                })
              : null;
          }, 100);
          this.setState({selectedRootCate: index});
        }}>
        <Text
          style={{
            fontSize: 16,
            color: this.state.selectedRootCate === index ? '#FFA93F' : '#333',
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  renderRootCate() {
    let data = [];
    CateData.data.map((item, index) => {
      data.push({key: index, title: item.firstCateName});
    });
    return (
      <View>
        <FlatList
          ref={flatList => (this._flatList = flatList)}
          data={data}
          ListHeaderComponent={() => <View />}
          ListFooterComponent={() => <View />}
          ItemSeparatorComponent={() => (
            <View style={{height: 1, backgroundColor: '#FFF'}} />
          )}
          renderItem={this._renderItem}
          onEndReachedThreshold={20}
          showsVerticalScrollIndicator={false}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }

  _renderTop(index) {
    if (index <= 0) {
      return (
        <View
          style={{
            alignItems: 'center',
            height: 20,
            width: 54,
            justifyContent: 'center',
            marginRight: 10,
            marginTop: 2,
          }}>
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            colors={['#FFAF27', '#FF8E01']}
            style={{
              height: 20,
              width: 60,
              flex: 1,
              position: 'relative',
              alignItems: 'center',
              borderRadius: 3,
            }}>
            <Text
              style={{
                fontSize: 12,
                color: '#fff',
                alignSelf: 'center',
                position: 'absolute',
              }}>
              蝉联榜首
            </Text>
          </LinearGradient>
        </View>
      );
    }
    return null;
  }

  _renderRank(index) {
    if (index < 3) {
      return (
        <Text style={{fontSize: 22, fontWeight: '700', color: '#FF4242'}}>
          {index + 1}
        </Text>
      );
    }
    return (
      <Text style={{fontSize: 22, fontWeight: '700', color: 'gray'}}>
        {index + 1}
      </Text>
    );
  }

  _renderCategoryItem(row) {
    console.log('row', row);
    let data = row.item;
    return (
      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#FFF',
          }}>
          <View>
            <Image source={logoPng} style={{width: 56, height: 80}} />
          </View>
          <View style={{marginLeft: 10, flex: 1, paddingRight: 15}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 5,
              }}>
              <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                }}>
                <Text style={{fontSize: 16, fontWeight: '600'}}>
                  {data.secondCateName}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this._renderTop(row.index)}
                {this._renderRank(row.index)}
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 14, color: 'gray'}}>
                {data.cateTitle}
              </Text>
              <Text style={{fontSize: 12, color: '#AA9379'}}>
                {data.total}热度
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _renderListHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: 3,
          paddingTop: 3,
        }}>
        <Text style={{color: 'gray', fontSize: 12}}>
          基于近7天活跃阅读综合指标计算
        </Text>
        <Text style={{color: 'gray', fontSize: 12}}>02月03日更新</Text>
      </View>
    );
  }
  renderItemCate() {
    let secondCateItems =
      CateData.data[this.state.selectedRootCate].secondCateItems;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
          marginLeft: 10,
          marginTop: 8,
        }}>
        <FlatList
          data={secondCateItems}
          ListHeaderComponent={this._renderListHeader}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderCategoryItem}
          ItemSeparatorComponent={this._separator}
          flashScrollIndicators={true}
        />
      </View>
    );
  }

  _renderContent = () => {
    if (this.state.left) {
      return (
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{backgroundColor: '#F5F5F5', width: 100}}>
            {this.renderRootCate()}
          </View>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            {this.renderItemCate()}
          </View>
        </View>
      );
    } else {
      return (
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{backgroundColor: '#F5F5F5', width: 100}}>
            {this.renderRootCate()}
          </View>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            {this.renderItemCate()}
          </View>
        </View>
      );
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
        {this._renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activeStyle: {color: 'orange', fontSize: 24},
  defaultStyle: {color: '#000', fontSize: 18},
});

export default Rank;
