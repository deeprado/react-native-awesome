import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';
import {Toast, Modal, Provider} from '@ant-design/react-native';

class CacheClear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shelfClear: false,
      adClear: false,
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
        <Text style={{color: '#000', fontSize: 24}}>清理缓存</Text>
      </View>
    );
  }

  _renderShelf() {
    if (this.state.shelfClear) {
      return <Text style={{fontSize: 16, color: '#A4A4A4'}}>已清理</Text>;
    }
    return <Text style={{fontSize: 16, color: '#A4A4A4'}}>0.18M</Text>;
  }

  _renderAd() {
    if (this.state.adClear) {
      return <Text style={{fontSize: 16, color: '#A4A4A4'}}>已清理</Text>;
    }
    return <Text style={{fontSize: 16, color: '#A4A4A4'}}>97.2M</Text>;
  }

  clearShelf() {
    this.setState({
      shelfClear: true,
    });
  }

  clearAdContent() {
    return (
      <View>
        <Text
          style={{
            color: '#676767',
            fontSize: 16,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
          }}>
          已下载的广告安装包将被全比清空，请问是否清理？
        </Text>
      </View>
    );
  }

  clearAd() {
    this.setState({
      adClear: true,
    });
    Toast.info('清理成功');
  }

  showClearAd() {
    let that = this;
    Modal.alert(
      '清理广告缓存',
      this.clearAdContent(),
      [
        {
          text: '取消',
          style: {
            color: '#696969',
            fontSize: 16,
          },
        },
        {
          text: '清理',
          onPress: () => that.clearAd(),
          style: {
            color: '#FF8D00',
            fontWeight: '700',
            fontSize: 16,
          },
        },
      ],
      false,
    );
  }

  render() {
    return (
      <Provider>
        <View style={styles.container}>
          <Header
            backgroundColor={'#fff'}
            leftComponent={this.renderLeftComponent()}
            centerComponent={this.renderCenterComponent()}
            rightComponent={this.renderRightComponent()}
          />

          <View style={{backgroundColor: '#fff'}}>
            <View style={{paddingLeft: 20, paddingRight: 20}}>
              <TouchableOpacity onPress={() => this.clearShelf()}>
                <View
                  style={{
                    paddingTop: 18,
                    paddingBottom: 18,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 20, color: '#393939'}}>
                        清理书籍缓存
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 14, color: '#686868'}}>
                        已移出书架的书籍缓存
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {this._renderShelf()}
                    <Icon
                      name="chevron-right"
                      type="feather"
                      size={24}
                      color="#DADADA"
                    />
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    borderBottomColor: '#F2F2F2',
                    borderBottomWidth: 1,
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.showClearAd()}>
                <View
                  style={{
                    paddingTop: 18,
                    paddingBottom: 18,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 20, color: '#393939'}}>
                        清理广告缓存
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 14, color: '#686868'}}>
                        已下载的广告安装包
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {this._renderAd()}
                    <Icon
                      name="chevron-right"
                      type="feather"
                      size={24}
                      color="#DADADA"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F5F5F5',
  },
});

export default CacheClear;
