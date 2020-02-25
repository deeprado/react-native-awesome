import React, {Component} from 'react';
import {
  Platform,
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import MorePopWidows from '../../components/modal/MorePopWidows2';
import {px2dp} from '../utils/index';

const isIOS = Platform.OS === 'ios';
const {width, height} = Dimensions.get('window');
const headH = px2dp(isIOS ? 64 : 44);

class HomeActionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPop: false,
    };
    this.city = this.city.bind(this);
    this.scan = this.scan.bind(this);
  }

  city() {
    console.log('xxxx');
  }

  scan() {
    console.log('xxxxxxxx');
    this.setState({showPop: !this.state.showPop});
  }

  renderHeader() {
    return (
      <View>
        <View style={styles.headerStyle}>
          <TouchableOpacity style={styles.action} onPress={this.city}>
            <Text style={styles.text}>上海</Text>
            <Image
              source={require('../assets/image/ic_arrow_down.png')}
              style={{
                width: 12,
                height: 10,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchBar}>
            <Image
              source={require('../assets/image/ic_search.png')}
              style={styles.iconStyle}
            />
            <Text style={{fontSize: 13, color: '#666', marginLeft: 5}}>
              输入商家、商品名称
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={this.scan}>
            <Image
              style={styles.scanIcon}
              source={require('../assets/image/ic_scan_code_white.png')}
            />
            <Text style={styles.scanText}>扫码</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            top: headH,
            left: 0,
            width: width,
            height: height,
          }}>
          <MorePopWidows
            width={90}
            height={100}
            show={this.state.showPop}
            closeModal={show => {
              this.setState({showPop: show});
            }}
            {...this.props}
          />
        </View>
      </View>
    );
  }

  render() {
    return <View>{this.renderHeader()}</View>;
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#06C1AE',
    height: headH,
    paddingTop: px2dp(isIOS ? 20 : 0),
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    width: width * 0.65,
    height: 30,
    borderRadius: 19,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    paddingLeft: 10,
  },
  text: {
    fontSize: 16,
    color: '#ffffff',
    justifyContent: 'center',
  },
  iconStyle: {
    width: 22,
    height: 22,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanIcon: {
    width: 28,
    height: 28,
    alignItems: 'center',
    marginLeft: 10,
  },
  scanText: {
    fontSize: 14,
    color: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeActionBar;
