import React from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');
import {px2dp} from '../../utils/index';

const mTop = px2dp(Platform.OS === 'ios' ? 64 : 44);

let mwidth = 95;
let mheight = 100;
const marginTop = mTop;

export default class MorePopWidows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: this.props.show,
    };
    mwidth = this.props.width;
    mheight = this.props.height;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({isVisible: nextProps.show});
  }

  closeModal() {
    this.setState({
      isVisible: false,
    });
    this.props.closeModal(false);
  }

  scan() {
    console.log('scan');
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          transparent={true}
          visible={this.state.isVisible}
          animationType={'fade'}
          onRequestClose={() => this.closeModal()}>
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPress={() => this.closeModal()}>
            <View style={styles.modal}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={this.scan.bind(this)}
                style={styles.itemView}>
                <Image
                  style={styles.imgStyle}
                  source={require('../assets/image/ic_scan_code_white.png')}
                />
                <Text style={styles.textStyle}>扫一扫</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => Alert.alert('点击了付款码')}
                style={styles.itemView}>
                <Image
                  style={styles.imgStyle}
                  source={require('../assets/image/ic_scan_code_white.png')}
                />
                <Text style={styles.textStyle}>付款码</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  modal: {
    backgroundColor: '#696969',
    width: mwidth,
    height: mheight,
    position: 'absolute',
    left: width - mwidth - 10,
    top: marginTop,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textStyle: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 2,
  },
  imgStyle: {
    width: 20,
    height: 20,
  },
});
