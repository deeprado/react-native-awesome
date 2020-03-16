import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/Ionicons';

export default class MyTabBar extends Component {
  static propTypes = {
    goToPage: PropTypes.func, // 跳转到对应tab的方法
    activeTab: PropTypes.number, // 当前被选中的tab下标
    tabs: PropTypes.array, // 所有tabs集合
    tabNames: PropTypes.array, // 保存Tab名称
    tabIconNames: PropTypes.array, // 保存Tab图标
  };

  componentDidMount() {
    // Animated.Value监听范围 [0, tab数量-1]
    this.props.scrollValue.addListener(this.setAnimationValue);
  }

  setAnimationValue({value}) {
    console.log('动画值：' + value);
  }

  //处理tabbar的颜色和字体及图标
  renderTabOption(tab, i) {
    let color = this.props.activeTab === i ? '#1FB9FF' : '#ADADAD'; // 判断i是否是当前选中的tab，设置不同的颜色
    return (
      // 因为要有点击效果 所以要引入可触摸组件
      <TouchableOpacity
        onPress={() => this.props.goToPage(i)}
        style={styles.tab}
        key={tab}>
        <View style={styles.tabItem}>
          <Icon
            name={this.props.tabIconNames[i]} // 图标 调用传入的属性
            size={30}
            color={color}
          />
          <Text style={{color: color}}>{this.props.tabNames[i]}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={styles.tabs}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    height: 50,
  },

  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
