import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

class Lists extends React.Component {
  constructor(porps) {
    super(porps);
    this.state = {
      datas: [],
    };
    // 设置翻页标志位全局变量
    this.flag = 0;
    this.getPageData = this.getPageData.bind(this);
  }

  componentDidMount() {
    this.getPageData();
  }

  // 页面加载时，获取前几条数据
  getPageData() {
    var lists = this.props.tools.slice(0, 6);
    this.setState({
      datas: lists,
    });
    console.log('lists------>', lists);
  }

  // 左右翻页功能
  changePage(num) {
    var newArr = [];
    const NUM = 6;
    /*var flag = 0;*/
    var arr = this.props.tools;
    //如果是向左滑动，首先判断标志位flag是否小于等于0
    if (num === -1) {
      //如果标志位为0，则表示不能向左滑动，把flag标志位置位0
      if (this.flag <= 0) {
        this.flag = 0;
        newArr = arr.slice(this.flag * NUM, this.flag * NUM + NUM);
      } else {
        this.flag = this.flag - 1;
        newArr = arr.slice(this.flag * NUM, this.flag * NUM + NUM);
      }
    } else {
      // 如果向右滑动，则需要判断上限
      // 首先判断是不是NUM的整数倍
      // 如果是NUM的整数倍
      /*debugger;*/
      if (arr.length % NUM === 0) {
        // 如果flag大于等于arr.length/NUM-1，把flag置为arr.length/NUM-1
        if (this.flag >= arr.length / NUM - 1) {
          this.flag = arr.length / NUM - 1;
          newArr = arr.slice(this.flag * NUM, this.flag * NUM + NUM);
        } else {
          // 如果flag小于arr.length/NUM-1
          this.flag = this.flag + 1;
          newArr = arr.slice(this.flag * NUM, this.flag * NUM + NUM);
        }
      } else {
        // 如果不是NUM的整数倍
        // 如果flag大于等于Math.floor(arr.length/NUM),把flag置为Math.floor(arr.length/NUM)
        if (this.flag >= Math.floor(arr.length / NUM)) {
          this.flag = Math.floor(arr.length / NUM);
          newArr = arr.slice(this.flag * NUM, this.flag * NUM + NUM);
        } else {
          //如果flag小于Math.floor(arr.length/NUM)
          this.flag = this.flag + 1;
          newArr = arr.slice(this.flag * NUM, this.flag * NUM + NUM);
        }
      }
    }
    console.log(newArr);
    this.setState({
      datas: newArr,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.changePage(-1)}>
          <View style={styles.left} />
        </TouchableOpacity>
        <View style={styles.middle}>
          {this.state.datas.map((value, index) => {
            return (
              <View style={styles.content} key={index}>
                <Text>{value}</Text>
              </View>
            );
          })}
        </View>
        <TouchableOpacity onPress={() => this.changePage(1)}>
          <View style={styles.right} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Lists;
