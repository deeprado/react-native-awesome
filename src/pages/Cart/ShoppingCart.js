import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SectionList,
  Alert,
} from 'react-native';
import ShoppingCartStyle from '../../styles/ShoppingCartStyle';
const shoppingCartData = require('../../data/ShoppingCartData.json');

const ic_selected = require('../assets/image/ic_selected.png');
const ic_default = require('../assets/image/ic_default.png');
const group = require('../assets/image/cart_group.png');
const group5 = require('../assets/image/cart_group5.png');

export default class ShoppingCart extends Component {
  static navigationOptions = {
    tabBarLabel: '购物车',
  };
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
    this.state = {
      status: [],
      isSelectedAllItem: false,
      totalNum: 0,
      totalPrice: 0.0,
    };
    this.initData();
  }

  initData() {
    let dataArr = shoppingCartData.data;
    let tempStatusArr = [];
    for (let i = 0; i < dataArr.length; i++) {
      let items = dataArr[i].shopItems;
      let shopObj = {};
      shopObj.checked = false;
      let tempItems = [];
      for (let j = 0; j < items.length; j++) {
        let item = items[j];
        item.checked = false;
        item.quantity = item.minQuantity;
        tempItems.push(item);
      }
      shopObj.items = tempItems;
      tempStatusArr.push(shopObj);
    }
    this.state.status = tempStatusArr;
    console.log(this.state.status);
  }

  // componentWillMount() {
  //   let dataArr = shoppingCartData.data;
  //   let tempStatusArr = [];
  //   for (let i = 0; i < dataArr.length; i++) {
  //     let items = dataArr[i].shopItems;
  //     let shopObj = {};
  //     shopObj.checked = false;
  //     let tempItems = [];
  //     for (let j = 0; j < items.length; j++) {
  //       let item = items[j];
  //       item.checked = false;
  //       item.quantity = item.minQuantity;
  //       tempItems.push(item);
  //     }
  //     shopObj.items = tempItems;
  //     tempStatusArr.push(shopObj);
  //   }
  //   this.state.status = tempStatusArr;
  //   console.log(this.state.status);
  // }

  componentDidMount() {
    // 网络请求获取购物车数据
  }

  checkItem(sectionIndex, index) {
    let tempStatus = this.state.status;
    let tempShop = tempStatus[sectionIndex];
    let tempShopItems = tempStatus[sectionIndex].items;
    let item = tempShopItems[index];
    item.checked = !item.checked;

    let isSelectedAllShopItem = true;
    for (let j = 0; j < tempShopItems.length; j++) {
      let tmpItem = tempShopItems[j];
      if (!tmpItem.checked) {
        isSelectedAllShopItem = false;
        break;
      }
    }

    tempShop.checked = isSelectedAllShopItem;

    let isSelectedAllShop = true;
    for (let k = 0; k < tempStatus.length; k++) {
      let shop = tempStatus[k];
      if (!shop.checked) {
        isSelectedAllShop = false;
        break;
      }
    }

    this.calculateCountAndPrice();
    this.setState({isSelectedAllItem: isSelectedAllShop, status: tempStatus});
  }

  checkedShop(index) {
    let tempStatus = this.state.status;
    let shop = tempStatus[index];
    shop.checked = !shop.checked;
    let items = shop.items;
    for (let j = 0; j < items.length; j++) {
      let item = items[j];
      item.checked = shop.checked;
    }

    let isSelectedAllShop = true;
    for (let j = 0; j < tempStatus.length; j++) {
      let tpmShop = tempStatus[j];
      if (!tpmShop.checked) {
        isSelectedAllShop = false;
        break;
      }
    }

    this.calculateCountAndPrice();
    this.setState({isSelectedAllItem: isSelectedAllShop, status: tempStatus});
  }

  checkAllShop() {
    let tempSelectedAllItem = !this.state.isSelectedAllItem;
    let tempStatus = this.state.status;
    for (let i = 0; i < tempStatus.length; i++) {
      let shop = tempStatus[i];
      shop.checked = tempSelectedAllItem;
      let items = shop.items;
      for (let j = 0; j < items.length; j++) {
        let item = items[j];
        item.checked = tempSelectedAllItem;
      }
    }

    this.calculateCountAndPrice();
    this.setState({isSelectedAllItem: tempSelectedAllItem, status: tempStatus});
  }

  minus(sectionIndex, index) {
    let tempStatus = this.state.status;
    let shop = tempStatus[sectionIndex];
    let items = shop.items;
    let item = items[index];
    if (item.quantity <= item.minQuantity) {
      Alert.alert('商品购买数量不能小于:' + item.minQuantity);
    } else {
      item.quantity -= 1;
    }

    if (item.checked) {
      this.calculateCountAndPrice();
    }
    this.setState({status: tempStatus});
  }

  add(sectionIndex, index) {
    let tempStatus = this.state.status;
    let shop = tempStatus[sectionIndex];
    let items = shop.items;
    let item = items[index];
    if (item.quantity >= item.maxQuantity) {
      Alert.alert('商品购买数量不能大于:' + item.maxQuantity);
    } else {
      item.quantity += 1;
    }
    if (item.checked) {
      this.calculateCountAndPrice();
    }
    this.setState({status: tempStatus});
  }

  calculateCountAndPrice() {
    let tempTotalNum = 0;
    let tempTotalPrice = 0;
    let tempStatus = this.state.status;
    for (let i = 0; i < tempStatus.length; i++) {
      let shop = tempStatus[i];
      let items = shop.items;
      for (let j = 0; j < items.length; j++) {
        let item = items[j];
        if (item.checked) {
          tempTotalNum += 1;
          tempTotalPrice += item.itemPrice * item.quantity;
        }
      }
    }
    this.setState({totalNum: tempTotalNum, totalPrice: tempTotalPrice});
  }

  _extraUniqueKey(item, index) {
    return 'index' + index + item;
  }

  renderItem = info => {
    let item = info.item;
    let index = info.index;
    let sectionIndex = info.section.index;
    let shop = this.state.status[sectionIndex];
    let statusItem = shop.items[index];
    return (
      <View style={styles.cellStyle}>
        <TouchableOpacity onPress={() => this.checkItem(sectionIndex, index)}>
          <Image
            style={styles.checkBox}
            source={statusItem.checked ? ic_selected : ic_default}
            resizeMode={'center'}
          />
        </TouchableOpacity>
        <Image style={styles.goods_img} source={{uri: item.itemimg}} />
        <View style={styles.goods_detail}>
          <Text style={styles.goods_title}>{item.itemName}</Text>
          <Text style={styles.goods_price}>{`￥${item.itemPrice}`}</Text>
        </View>
        <View style={styles.goods_num}>
          <TouchableOpacity onPress={() => this.minus(sectionIndex, index)}>
            <Image source={group} />
          </TouchableOpacity>
          <Text style={styles.goods_quantity}>{statusItem.quantity}</Text>
          <TouchableOpacity onPress={() => this.add(sectionIndex, index)}>
            <Image source={group5} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderSectionHeader = info => {
    let section = info.section.key;
    let index = info.section.index;
    let shop = this.state.status[index];
    return (
      <View style={styles.sectionHeader}>
        <TouchableOpacity onPress={() => this.checkedShop(index)}>
          <Image
            style={styles.checkBox}
            source={shop.checked ? ic_selected : ic_default}
            resizeMode={'center'}
          />
        </TouchableOpacity>
        <Text style={styles.section}>{section}</Text>
      </View>
    );
  };

  render() {
    let tempArr = shoppingCartData.data.map((item, index) => {
      let tempData = {};
      tempData.key = item.shopName;
      tempData.index = index;
      tempData.data = item.shopItems;
      return tempData;
    });
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <Text style={styles.cart_title}>购物车</Text>
        </View>
        <SectionList
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderItem}
          sections={tempArr}
          ItemSeparatorComponent={() => <View />}
          ListHeaderComponent={() => <View />}
          ListFooterComponent={() => <View />}
          keyExtractor={this._extraUniqueKey}
        />
        <View style={styles.toolBar}>
          <View style={styles.chooseAll}>
            <TouchableOpacity onPress={() => this.checkAllShop()}>
              <Image
                style={styles.checkBox}
                source={this.state.isSelectedAllItem ? ic_selected : ic_default}
                resizeMode={'center'}
              />
            </TouchableOpacity>
            <Text>全选</Text>
          </View>
          <Text style={{marginHorizontal: 10}}>
            合计:
            <Text style={{color: ShoppingCartStyle.red}}>
              ￥{parseFloat(this.state.totalPrice).toFixed(2)}
            </Text>
          </Text>
          <View style={styles.settlement_container}>
            <Text style={{color: ShoppingCartStyle.white}}>
              去结算({this.state.totalNum})
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ShoppingCartStyle.white,
  },
  navBar: {
    height: ShoppingCartStyle.navHeight,
    alignItems: ShoppingCartStyle.center,
    justifyContent: ShoppingCartStyle.center,
    borderBottomWidth: ShoppingCartStyle.lineWidth,
    borderBottomColor: ShoppingCartStyle.lineColor,
  },
  cellStyle: {
    flexDirection: ShoppingCartStyle.row,
    alignItems: ShoppingCartStyle.center,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: ShoppingCartStyle.lineColor,
  },
  sectionHeader: {
    height: 40,
    flexDirection: ShoppingCartStyle.row,
    backgroundColor: ShoppingCartStyle.bgColor,
    alignItems: ShoppingCartStyle.center,
  },
  section: {color: ShoppingCartStyle.gray, fontSize: 12},
  checkBox: {
    width: 40,
    height: 40,
  },
  toolBar: {
    height: ShoppingCartStyle.cellHeight,
    flexDirection: ShoppingCartStyle.row,
    alignItems: ShoppingCartStyle.center,
  },
  goods_img: {width: 80, height: 80},
  goods_detail: {
    justifyContent: ShoppingCartStyle.around,
    flex: 1,
    marginHorizontal: 10,
    height: 50,
  },
  goods_price: {
    fontSize: 13,
    color: ShoppingCartStyle.textBlockColor,
  },
  goods_num: {
    flexDirection: ShoppingCartStyle.row,
    alignItems: ShoppingCartStyle.center,
    marginHorizontal: 10,
  },
  goods_title: {fontSize: 13, color: ShoppingCartStyle.textBlockColor},
  goods_quantity: {width: 30, textAlign: 'center'},
  chooseAll: {
    flex: 1,
    flexDirection: ShoppingCartStyle.row,
    alignItems: ShoppingCartStyle.center,
  },
  settlement_container: {
    width: 120,
    backgroundColor: ShoppingCartStyle.red,
    alignItems: ShoppingCartStyle.center,
    justifyContent: ShoppingCartStyle.center,
    height: ShoppingCartStyle.cellHeight,
  },
  cart_title: {marginTop: 15, fontSize: 17},
});
