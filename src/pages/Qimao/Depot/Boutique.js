import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {Header, Text, Image, Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import data from './Data/data';

const logoPng = require('../../../assets/qimao/image/logo.png');

class Boutique extends Component {
  constructor(props) {
    super(props);

    this.state = {
      left: true,
      ...data,
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
                女生完结
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
                男生完结
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

  _renderFourItems = (bookList, showFraction) => {
    let rows = bookList.slice(0, 4);
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        {rows.map((item, index) => {
          return (
            <View style={{width: 90}} key={item.id}>
              <View style={{position: 'relative', backgroundColor: 'red'}}>
                <Image source={logoPng} style={{height: 124, width: 90}} />
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    flexDirection: 'row',
                  }}>
                  <LinearGradient
                    colors={['#FF9300', '#FFB500']}
                    start={{x: 0, y: 1}}
                    end={{x: 1, y: 1}}
                    style={{
                      paddingLeft: 5,
                    }}>
                    <Text style={{fontSize: 12, color: '#fffaf3'}}>9.5分</Text>
                  </LinearGradient>

                  <View
                    style={{
                      marginLeft: 0,
                      width: 0,
                      height: 0,
                      borderStyle: 'solid',
                      borderWidth: 8,
                      borderTopColor: '#FFB500', //下箭头颜色
                      borderLeftColor: '#FFB500', //右箭头颜色
                      borderBottomColor: 'transparent', //上箭头颜色
                      borderRightColor: 'transparent', //左箭头颜色
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap',
                }}>
                <Text
                  style={{
                    color: '#333',
                    fontSize: 16,
                    marginTop: 3,
                    marginBottom: 3,
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                  }}>
                  {item.title}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  goFilter(cateId) {
    this.props.navigation.navigate('Filter', {
      cateId,
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

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <View style={{marginTop: 30}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
                <Text style={{fontSize: 24, fontWeight: '600'}}>完结好书</Text>
              </View>
              <View>
                {this._renderFourItems(this.state.goodList, true)}
                {this._renderFourItems(this.state.goodList, true)}
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                <Text style={{fontSize: 24, fontWeight: '600'}}>现代言情</Text>
                <TouchableOpacity onPress={() => this.goFilter(1)}>
                  <Text style={{fontSize: 14, color: 'gray'}}>查看更多></Text>
                </TouchableOpacity>
              </View>
              <View>{this._renderFourItems(this.state.goodList)}</View>
            </View>
            <View style={{marginTop: 30}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                <Text style={{fontSize: 24, fontWeight: '600'}}>古代言情</Text>
                <TouchableOpacity onPress={() => this.goFilter(2)}>
                  <Text style={{fontSize: 14, color: 'gray'}}>查看更多></Text>
                </TouchableOpacity>
              </View>
              <View>{this._renderFourItems(this.state.goodList)}</View>
            </View>
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
  activeStyle: {color: 'orange', fontSize: 24},
  defaultStyle: {color: '#000', fontSize: 18},
});

export default Boutique;
