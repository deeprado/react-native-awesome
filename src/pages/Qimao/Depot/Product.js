import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
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
import data from './Data/data';

const {width, height} = Dimensions.get('window');
const logoPng = require('../../../assets/qimao/image/logo.png');

class Product extends Component {
  static navigationOptions = {
    title: '书架',
  };
  constructor(props) {
    super(props);
    this.state = {
      ...data,
    };

    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {}

  goBack() {
    this.props.navigation.navigate('DepotTab');
  }

  renderLeftComponent() {
    if (this.state.editing) {
      return null;
    } else {
      return (
        <Icon name="left" color="#000" type="antdesign" onPress={this.goBack} />
      );
    }
  }

  renderRightComponent() {
    return null;
  }

  _keyExtractor = (item, index) => item.id.toString();

  _separator() {
    // 再刷新or加载的时候进行的动画或者文字效果
    return <View style={{height: 1}} />;
  }

  _renderEmpty() {
    return (
      <View>
        <Text>无数据</Text>
      </View>
    );
  }

  _renderFourItems = bookList => {
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
              <Image source={logoPng} style={{height: 124, width: 90}} />
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

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#fff'}
          leftComponent={this.renderLeftComponent()}
          centerComponent={{
            text: '独家新书',
            style: {color: '#000', fontSize: 24},
          }}
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
                <Text style={{fontSize: 24, fontWeight: '600'}}>主编精选</Text>
              </View>
              <View>
                {this._renderFourItems(this.state.goodList)}
                {this._renderFourItems(this.state.goodList)}
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                <Text style={{fontSize: 24, fontWeight: '600'}}>本周上新</Text>
              </View>
              <View>{this._renderFourItems(this.state.goodList)}</View>
              <View>{this._renderFourItems(this.state.goodList)}</View>
            </View>
            <View style={{marginTop: 30}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                <Text style={{fontSize: 24, fontWeight: '600'}}>穿越架空</Text>
              </View>
              <View>{this._renderFourItems(this.state.goodList)}</View>
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
});

export default Product;
