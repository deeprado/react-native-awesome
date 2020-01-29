/* 组件 cell */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// 获取设备宽高
// var Dimensions = require('Dimensions');
// var {width, height} = Dimensions.get('window');

// 引入外部的json数据
import Shops from '../../data/shops.json';

export default class ShopCenter extends React.Component {
  // props 传值，默认传的值 默认商品 id 为1.
  static defaultProps = {
    popToHomeView: 1,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollViewStyle}
          horizontal={true} // 横向
          showsHorizontalScrollIndicator={false} // 此属性为true的时候，显示一个水平方向的滚动条。
        >
          {this.renderAllItem()}
        </ScrollView>
      </View>
    );
  }

  // 返回下部分所有的Item
  renderAllItem() {
    // 定义组件数组
    var itemArr = [];
    // 取出数据
    var shopData = Shops.data;
    // 遍历
    for (var i = 0; i < shopData.length; i++) {
      // 取出单个数据
      var data = shopData[i];
      // 创建组件装入数组
      itemArr.push(
        <ShopCenterItem
          shopImage={data.img}
          shopSale={data.showtext.text}
          shopName={data.name}
          detailurl={data.detailurl}
          smid={data.smid}
          key={i}
          // 将id再次封装传递下去
          popTopShopCenter={smid => this.popTopHome(smid)}
        />,
      );
    }
    // 返回
    return itemArr;
  }

  popTopHome(smid) {
    // 判断
    //if (this.props.smid == null) return;

    // 执行回调函数 将跳转地址传递下去
    this.props.popToHomeView(smid);
  }
}

// 每一个商场
export class ShopCenterItem extends React.Component {
  static defaultProps = {
    shopImage: '',
    shopSale: '',
    shopName: '',
    detailurl: '',
    smid: '',
    popTopShopCenter: null,
  };

  render() {
    return (
      <TouchableOpacity onPress={() => this.clickItem(this.props.smid)}>
        <View style={styles.itemViewStyle}>
          <Image
            source={{uri: this.props.shopImage}}
            style={styles.imageStyle}
          />
          <Text style={styles.shopSaleStyle}>{this.props.shopSale}</Text>
          <Text style={styles.shopNameStyle}>{this.props.shopName}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  clickItem(smid) {
    // 判断
    if (this.props.smid == null) {
      return;
    }

    // 执行回调函数 再次接受传递的id
    this.props.popTopShopCenter(smid);
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  imageStyle: {
    width: 120,
    height: 100,
    borderRadius: 8,
  },

  scrollViewStyle: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
  },

  itemViewStyle: {
    margin: 8,
  },

  shopSaleStyle: {
    // 绝对定位
    position: 'absolute',
    left: 0,
    bottom: 30,
    backgroundColor: 'red',
    color: 'white',
    padding: 2,
  },

  shopNameStyle: {
    textAlign: 'center',
    marginTop: 5,
  },
});
