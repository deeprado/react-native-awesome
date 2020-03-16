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

import {px2dp} from '../../utils/index';
import {Icon} from 'react-native-elements';

const {width, height} = Dimensions.get('window');

const mTop = px2dp(Platform.OS === 'ios' ? 64 : 40);

let mwidth = 150;
let mheight = 110;
const marginTop = mTop;

class MorePopWidows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: this.props.showMore,

      w1: new Animated.Value(0),
      h1: new Animated.Value(0),

      w2: new Animated.Value(0),
      h2: new Animated.Value(0),

      f1: new Animated.Value(0),
    };
    // console.log('this.state', this.state);
    // mwidth = this.props.width;
    // mheight = this.props.height;
    // console.log('mwidth', mwidth);
    // console.log('mheight', mheight);
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   console.log('nextProps.showMore', nextProps.showMore);
  //   console.log('this.state.isVisible', this.state.isVisible);
  //   // if (nextProps.showMore ) {
  //   //   this.showModal();
  //   // }
  //   // if (!nextProps.showMore ) {
  //   //   this.closeModal();
  //   // }
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {showMore} = nextProps;
    console.log('prevState.showMore', showMore, prevState.isVisible);
    // 当传入的type发生变化的时候，更新state
    if (showMore !== prevState.showMore) {
      return {
        showMore,
      };
    }
    // 否则，对于state不进行任何操作
    return null;
  }

  scan() {
    console.log('scan');
  }

  showModal = () => {
    console.log('showModal');
    this.setState(
      {
        isVisible: true,
      },
      () => {
        Animated.parallel([
          Animated.timing(this.state.w2, {
            toValue: 18,
            easing: Easing.linear,
            duration: 300,
          }),
          Animated.timing(this.state.h2, {
            toValue: 18,
            easing: Easing.linear,
            duration: 300,
          }),
          Animated.timing(this.state.f1, {
            toValue: 18,
            easing: Easing.linear,
            duration: 300,
          }),
          Animated.timing(this.state.w1, {
            toValue: mwidth,
            easing: Easing.linear,
            duration: 360,
          }),
          Animated.timing(this.state.h1, {
            toValue: mheight,
            easing: Easing.linear,
            duration: 360,
          }),
        ]).start(finished => {
          // if (finished) {
          //   this.setState({
          //     isVisible: false,
          //   });
          // }
        });
      },
    );
  };

  closeModal = () => {
    Animated.parallel([
      Animated.timing(this.state.w2, {
        toValue: 0,
        easing: Easing.linear,
        duration: 120,
      }),
      Animated.timing(this.state.h2, {
        toValue: 0,
        easing: Easing.linear,
        duration: 120,
      }),
      Animated.timing(this.state.f1, {
        toValue: 0,
        easing: Easing.linear,
        duration: 120,
      }),
      Animated.timing(this.state.w1, {
        toValue: 0,
        easing: Easing.linear,
        duration: 300,
      }),
      Animated.timing(this.state.h1, {
        toValue: 0,
        easing: Easing.linear,
        duration: 300,
      }),
    ]).start(finished => {
      if (finished) {
        this.setState({
          isVisible: false,
        });
        this.props.closeModal(false);
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
          <View style={styles.modalBox}>
            <Animated.View
              style={[
                styles.modal,
                {
                  width: this.state.w1,
                  height: this.state.h1,
                },
              ]}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={this.scan.bind(this)}>
                <View style={styles.itemView}>
                  <Animated.View
                    style={{
                      width: this.state.w2,
                      height: this.state.h2,
                    }}>
                    <Icon
                      name="folder-plus"
                      type="feather"
                      color="#666666"
                      size={18}
                    />
                  </Animated.View>
                  <Animated.Text
                    style={[
                      styles.textStyle,
                      {
                        fontSize: this.state.f1,
                      },
                    ]}>
                    书架管理
                  </Animated.Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => Alert.alert('点击了付款码')}>
                <View style={styles.itemView}>
                  <Animated.View
                    style={{
                      width: this.state.w2,
                      height: this.state.h2,
                    }}>
                    <Icon
                      name="folder-plus"
                      type="feather"
                      color="#666666"
                      size={18}
                    />
                  </Animated.View>
                  <Animated.Text
                    style={[
                      styles.textStyle,
                      {
                        fontSize: this.state.f1,
                      },
                    ]}>
                    导入书籍
                  </Animated.Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: 'relative',
  },
  modalBox: {
    position: 'absolute',
    right: 20,
    top: marginTop,
    width: mwidth,
    height: mheight,
  },
  modal: {
    backgroundColor: '#FFFFFF',
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
