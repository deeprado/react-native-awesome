import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Easing,
  Animated,
  ScrollView,
  Image,
} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';

const logoPng = require('../../../assets/qimao/image/logo.png');
const appLogoPng = require('../../../assets/qimao/image/app_logo.png');

class Download extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apps: [
        {
          id: 1,
          logo: logoPng,
          title: '七猫小游戏',
          summery: '七猫小游戏 免费好玩能赚钱',
          size: '4.6',
          gold: 50,
        },
        {
          id: 2,
          logo: appLogoPng,
          title: '挂机封神录星耀版',
          summery: '一款全新的创新型放置类卡牌游戏',
          size: '46',
          gold: 80,
        },
        {
          id: 3,
          logo: appLogoPng,
          title: '超能捕鱼',
          summery: '游戏红包不忽悠，每天可领10元',
          size: '6.5',
          gold: 50,
        },
        {
          id: 1,
          logo: logoPng,
          title: '七猫小游戏',
          summery: '七猫小游戏 免费好玩能赚钱',
          size: '4.6',
          gold: 50,
        },
        {
          id: 2,
          logo: appLogoPng,
          title: '挂机封神录星耀版',
          summery: '一款全新的创新型放置类卡牌游戏',
          size: '46',
          gold: 80,
        },
        {
          id: 3,
          logo: appLogoPng,
          title: '超能捕鱼',
          summery: '游戏红包不忽悠，每天可领10元',
          size: '6.5',
          gold: 50,
        },
        {
          id: 1,
          logo: logoPng,
          title: '七猫小游戏',
          summery: '七猫小游戏 免费好玩能赚钱',
          size: '4.6',
          gold: 50,
        },
        {
          id: 2,
          logo: appLogoPng,
          title: '挂机封神录星耀版',
          summery: '一款全新的创新型放置类卡牌游戏',
          size: '46',
          gold: 80,
        },
        {
          id: 3,
          logo: appLogoPng,
          title: '超能捕鱼',
          summery: '游戏红包不忽悠，每天可领10元',
          size: '6.5',
          gold: 50,
        },
        {
          id: 1,
          logo: logoPng,
          title: '七猫小游戏',
          summery: '七猫小游戏 免费好玩能赚钱',
          size: '4.6',
          gold: 50,
        },
        {
          id: 2,
          logo: appLogoPng,
          title: '挂机封神录星耀版',
          summery: '一款全新的创新型放置类卡牌游戏',
          size: '46',
          gold: 80,
        },
        {
          id: 3,
          logo: appLogoPng,
          title: '超能捕鱼',
          summery: '游戏红包不忽悠，每天可领10元',
          size: '6.5',
          gold: 50,
        },
        {
          id: 1,
          logo: logoPng,
          title: '七猫小游戏',
          summery: '七猫小游戏 免费好玩能赚钱',
          size: '4.6',
          gold: 50,
        },
        {
          id: 2,
          logo: appLogoPng,
          title: '挂机封神录星耀版',
          summery: '一款全新的创新型放置类卡牌游戏',
          size: '46',
          gold: 80,
        },
        {
          id: 3,
          logo: appLogoPng,
          title: '超能捕鱼',
          summery: '游戏红包不忽悠，每天可领10元',
          size: '6.5',
          gold: 50,
        },
        {
          id: 1,
          logo: logoPng,
          title: '七猫小游戏',
          summery: '七猫小游戏 免费好玩能赚钱',
          size: '4.6',
          gold: 50,
        },
        {
          id: 2,
          logo: appLogoPng,
          title: '挂机封神录星耀版',
          summery: '一款全新的创新型放置类卡牌游戏',
          size: '46',
          gold: 80,
        },
        {
          id: 3,
          logo: appLogoPng,
          title: '超能捕鱼',
          summery: '游戏红包不忽悠，每天可领10元',
          size: '6.5',
          gold: 50,
        },
        {
          id: 1,
          logo: logoPng,
          title: '七猫小游戏',
          summery: '七猫小游戏 免费好玩能赚钱',
          size: '4.6',
          gold: 50,
        },
        {
          id: 2,
          logo: appLogoPng,
          title: '挂机封神录星耀版',
          summery: '一款全新的创新型放置类卡牌游戏',
          size: '46',
          gold: 80,
        },
        {
          id: 3,
          logo: appLogoPng,
          title: '超能捕鱼',
          summery: '游戏红包不忽悠，每天可领10元',
          size: '6.5',
          gold: 50,
        },
      ],
    };
  }

  goBack = () => {
    this.props.navigation.goBack();
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
        <Text style={{color: '#000', fontSize: 24}}>应用下载</Text>
      </View>
    );
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
        key={index}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 20,
            paddingBottom: 20,
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Image source={item.logo} style={{width: 82, height: 82}} />
            </View>
            <View style={{marginLeft: 12}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <Text style={{fontSize: 20}}>{item.title}</Text>
                </View>
                <View
                  style={{
                    marginLeft: 15,
                    backgroundColor: '#FF6510',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: 8,
                    borderRadius: 10,
                    height: 20,
                  }}>
                  <Icon
                    name="bitcoin-circle"
                    type="foundation"
                    size={28}
                    color={'#FFA331'}
                  />
                  <Text style={{marginLeft: 2, fontSize: 14, color: '#fff'}}>
                    +{item.gold}
                  </Text>
                </View>
              </View>
              <View style={{marginTop: 10}}>
                <Text style={{fontSize: 14}}>{item.summery}</Text>
              </View>
              <View style={{marginTop: 10}}>
                <Text style={{fontSize: 12, color: '#9E9E9E'}}>
                  {item.size}M
                </Text>
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity>
              <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderWidth: 1,
                  borderColor: '#FF9A49',
                  borderRadius: 20,
                }}>
                <Text style={{color: '#FF9A49'}}>立即下载</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    let that = this;
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#fff'}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{backgroundColor: '#F5F5F5'}}>
            <View
              style={{paddingLeft: 20, paddingRight: 20, paddingBottom: 20}}>
              <View style={{marginTop: 15, marginBottom: 15}}>
                <Text style={{color: '#999999'}}>任务须知</Text>
              </View>
              <View style={{}}>
                <Text style={{color: '#999999'}}>
                  1. 所有应用首次安装并打开后即可领取对应相应的金币奖励
                </Text>
              </View>
              <View>
                <Text style={{color: '#999999'}}>
                  2. 完成的任务将从任务列表中消失。
                </Text>
              </View>
              <View>
                <Text style={{color: '#999999'}}>
                  3. 每个应用下载任务在你每台设备/每个账号上只能完成一次。
                </Text>
              </View>
            </View>
          </View>
          {/* 列表 */}
          <View style={{marginBottom: 30}}>
            {this.state.apps.map(function(item, index) {
              return that._renderItem({item, index});
            })}
            {/* <FlatList
            ref={flatList => (this._flatList = flatList)}
            data={this.state.apps}
            ListHeaderComponent={() => <View />}
            ListFooterComponent={() => <View />}
            ItemSeparatorComponent={() => (
              <View style={{height: 1, backgroundColor: '#EBEBEB'}} />
            )}
            renderItem={this._renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={this._keyExtractor}
          /> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default Download;
