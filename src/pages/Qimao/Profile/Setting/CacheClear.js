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
} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';

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
    return null;
  }

  _renderAd() {
    if (this.state.adClear) {
      return <Text style={{fontSize: 16, color: '#A4A4A4'}}>已清理</Text>;
    }
    return null;
  }

  clearShelf() {
    this.setState({
      shelfClear: true,
    });
  }

  clearAd() {
    this.setState({
      shelfClear: true,
    });
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

        <View style={{backgroundColor: '#fff'}}>
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <TouchableOpacity onPress={() => this.clearShelf()}>
              <View
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
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

            <TouchableOpacity onPress={() => this.clearAd()}>
              <View
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
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
