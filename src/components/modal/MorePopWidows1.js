import React from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Text,
  Image,
  Easing,
  Animated,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');
import {px2dp} from '../../utils/index';
import {Icon} from 'react-native-elements';

const mTop = px2dp(Platform.OS === 'ios' ? 64 : 40);

let mwidth = 150;
let mheight = 110;
const marginTop = mTop;

class MorePopWidows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: this.props.show,

      w1: new Animated.Value(0),
      h1: new Animated.Value(0),
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

  _onPress1 = () => {
    Animated.parallel([
      Animated.timing(this.state.w1, {
        toValue: mwidth,
        easing: Easing.linear,
        duration: 500,
      }),
      Animated.timing(this.state.h1, {
        toValue: mheight,
        easing: Easing.linear,
        duration: 500,
      }),
    ]).start(finished => {
      // if (finished) {
      //   this.setState({
      //     isVisible: false,
      //   });
      // }
    });
  };

  _onPress2 = () => {
    Animated.parallel([
      Animated.timing(this.state.w1, {
        toValue: 0,
        easing: Easing.linear,
        duration: 500,
      }),
      Animated.timing(this.state.h1, {
        toValue: 0,
        easing: Easing.linear,
        duration: 500,
      }),
    ]).start(finished => {
      if (finished) {
        this.setState({
          isVisible: false,
        });
      }
    });
  };

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
            <Animated.View
              style={{
                width: this.state.w1,
                height: this.state.h1,
              }}>
              <View style={styles.modal}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={this.scan.bind(this)}>
                  <View style={styles.itemView}>
                    <Icon
                      name="folder-plus"
                      type="feather"
                      color="#666666"
                      size={18}
                    />
                    <Text style={styles.textStyle}>书架管理</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => Alert.alert('点击了付款码')}>
                  <View style={styles.itemView}>
                    <Icon
                      name="folder-plus"
                      type="feather"
                      color="#666666"
                      size={18}
                    />
                    <Text style={styles.textStyle}>导入书籍</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Animated.View>
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
    backgroundColor: '#FFFFFF',
    width: mwidth,
    height: mheight,
    position: 'absolute',
    left: width - mwidth - 20,
    top: marginTop,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  textStyle: {
    color: '#2E2E2E',
    fontSize: 18,
    marginLeft: 8,
  },
  imgStyle: {
    width: 20,
    height: 20,
  },
});

export default MorePopWidows;
