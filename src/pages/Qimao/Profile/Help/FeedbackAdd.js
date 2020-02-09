import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Modal, Toast, Provider} from '@ant-design/react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';

const {width} = Dimensions.get('window');
const rootPath =
  Platform.OS === 'ios' ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;

class FeedbackAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      mobile: '',
      qq: '',
      imgList: [],
      imgLists: [],
      imgListMax: 6,
      imgVisible: false,
    };
    this.onContentChange = this.onContentChange.bind(this);
    this.onMobileChange = this.onMobileChange.bind(this);
    this.onQQChange = this.onQQChange.bind(this);

    this.closeImgModal = this.closeImgModal.bind(this);
    this.showImgModal = this.showImgModal.bind(this);

    this.choosePic = this.choosePic.bind(this);
  }

  componentDidMount() {
    this.handleImgList();
  }

  cancelTitle() {
    return (
      <View>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 16,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
          }}>
          请问是否放弃提交反馈？
        </Text>
      </View>
    );
  }

  goBack = () => {
    Modal.alert(
      '',
      this.cancelTitle(),
      [
        {
          text: '放弃提交',
          onPress: () => this.props.navigation.goBack(),
          style: {
            color: '#696969',
            fontSize: 16,
          },
        },
        {
          text: '取消',
          style: {
            color: '#FF8D00',
            fontWeight: '700',
            fontSize: 16,
          },
        },
      ],
      Platform.OS,
    );
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
        <Text style={{color: '#000', fontSize: 22}}>我要反馈</Text>
      </View>
    );
  }

  // 修改内容
  onContentChange(txt) {
    this.setState({
      content: txt,
    });
  }

  // 修改手机号
  onMobileChange(txt) {
    this.setState({
      mobile: txt,
    });
  }

  // 修改QQ
  onQQChange(txt) {
    this.setState({
      qq: txt,
    });
  }

  // 打开模态矿
  showImgModal() {
    this.setState({
      imgVisible: true,
    });
  }

  // 关闭模态矿
  closeImgModal() {
    this.setState({
      imgVisible: false,
    });
  }

  // 选择图片
  choosePic() {
    let that = this;
    that.setState({
      imgVisible: false,
    });
    this.props.navigation.navigate('MultiplePic', {
      max: this.state.imgListMax - this.state.imgList.length,
      setImgList: imgList => {
        that.handleImgList(imgList);
      },
    });
  }

  // 拍摄图片
  takePic() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  }

  // 上传图片
  uploadFile() {
    var uploadUrl = 'http://requestb.in/XXXXXXX';
    var files = [
      {
        name: 'test1',
        filename: 'test1.w4a',
        filepath: rootPath + '/test1.w4a',
        filetype: 'audio/x-m4a',
      },
      {
        name: 'test2',
        filename: 'test2.w4a',
        filepath: rootPath + '/test2.w4a',
        filetype: 'audio/x-m4a',
      },
    ];

    var uploadBegin = response => {
      var jobId = response.jobId;
      console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
    };

    var uploadProgress = response => {
      var percentage = Math.floor(
        (response.totalBytesSent / response.totalBytesExpectedToSend) * 100,
      );
      console.log('UPLOAD IS ' + percentage + '% DONE!');
    };

    // 开始上传
    RNFS.uploadFiles({
      toUrl: uploadUrl,
      files: files,
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      fields: {
        hello: 'world',
      },
      begin: uploadBegin,
      progress: uploadProgress,
    })
      .promise.then(response => {
        if (response.statusCode == 200) {
          console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
        } else {
          console.log('SERVER ERROR');
        }
      })
      .catch(err => {
        if (err.description === 'cancelled') {
          // cancelled by user
        }
        console.log(err);
      });
  }

  arraySlice = (array, sliceNum, newArray) => {
    let viod = 0; // 数组初始量
    for (let i = 0; i < array.length; i++) {
      if (i % sliceNum === 0 && i !== 0) {
        newArray.push(array.slice(viod, i));
        viod = i;
      }
      if (i + 1 === array.length) {
        newArray.push(array.slice(viod, i + 1));
      }
    }
    return newArray;
  };

  // 处理图片数组
  handleImgList = imgList => {
    let oldImgList = this.state.imgList;
    let newImgList = imgList ? oldImgList.concat(imgList) : this.state.imgList;

    let tmpImgList = imgList ? oldImgList.concat(imgList) : this.state.imgList;

    let imgLists = [];
    this.arraySlice(tmpImgList, 3, imgLists);
    if (newImgList.length === 0 || newImgList.length === 3) {
      imgLists.push([false, false, false]);
    }
    this.setState({
      imgList: newImgList,
      imgLists: imgLists,
    });
  };

  _renderAddBtn = index => {
    if (this.state.imgList.length >= this.state.imgListMax) {
      return;
    }
    return (
      <TouchableOpacity onPress={() => this.showImgModal()} key={index}>
        <View
          style={{
            height: 119,
            width: 119,
            borderWidth: 1,
            borderColor: '#DFDFDF',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="plus" type="foundation" color="#A0A0A0" size={20} />
        </View>
      </TouchableOpacity>
    );
  };

  removeImg = index => {
    this.state.imgList.splice(index, 1);
    this.handleImgList();
  };

  _renderImgBox = (show, url, index) => {
    let that = this;
    return (
      <View
        key={index}
        style={{
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          height: 120,
          width: 120,
        }}>
        {show ? (
          <Image
            source={{uri: `file:///${url}`}}
            style={{width: 120, height: 120}}
          />
        ) : null}

        {show ? (
          <View
            style={{
              position: 'absolute',
              top: -10,
              right: -10,
              zIndex: 99,
            }}>
            <TouchableOpacity onPress={() => that.removeImg(index)}>
              <Icon name="x-circle" type="feather" size={24} color={'#000'} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };
  // 显示图片
  _renderThreeImgList(imgList, ort) {
    let that = this;
    let hasShowBtn = false;
    let n = imgList.length;
    if (imgList.length < 3) {
      for (let i = 0; i < 3 - n; i++) {
        imgList.push(false);
      }
    }
    let allOrt = ort * 3;
    return (
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        {imgList.map(function(url, index) {
          if (url) {
            return that._renderImgBox(true, url, allOrt + index);
          } else {
            if (hasShowBtn) {
              return that._renderImgBox(false, url, allOrt + index);
            } else {
              hasShowBtn = true;
              return that._renderAddBtn(allOrt + index);
            }
          }
        })}
      </View>
    );
  }

  // 提交反馈
  pushFeedback = () => {
    // 校验
    if (this.state.content.length <= 0) {
      Toast.info('请输入问题描述', 1);
      return;
    }
    if (this.state.mobile.length <= 0 && this.state.qq.length <= 0) {
      Toast.info('请输入联系方式', 1);
      return;
    }
    // 先上传图片
    Toast.loading('提交中...', 1, () => {
      Toast.info('提交成功', 1);
    });
  };

  render() {
    let that = this;
    let imgLists = this.state.imgLists;
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
            <View style={{marginTop: 10, paddingLeft: 15, paddingRight: 15}}>
              <View style={{}}>
                <TextInput
                  multiline={true}
                  maxLength={200}
                  selectionColor={'#FA900D'}
                  autoCapitalize="none"
                  autoCorrect={false}
                  blurOnSubmit={true}
                  style={styles.contentEdit}
                  placeholder={
                    '为更好地解决您遇到的问题，请尽量将问题描述详细，如提供问题书籍名称或截图等。（必填）'
                  }
                  secureTextEntry={false}
                  value={this.state.content}
                  placeholderTextColor={'#BBBBBB'}
                  selectTextOnFocus={false}
                  textAlignVertical="top"
                  onChangeText={this.onContentChange}
                />
              </View>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  paddingTop: 5,
                  paddingBottom: 5,
                }}>
                <Text style={{fontSize: 14, color: '#9A9A9A'}}>
                  {this.state.content.length}/200
                </Text>
              </View>
              <View
                style={{
                  height: 1,
                  borderBottomColor: '#F2F2F2',
                  borderBottomWidth: 1,
                }}
              />
              <View style={{paddingTop: 20, paddingBottom: 20}}>
                <Text style={{fontSize: 16, color: '#9A9A9A'}}>
                  上传问题图片(选填)
                </Text>
                <View
                  style={{
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}>
                  {imgLists.map(function(imgList, index) {
                    return that._renderThreeImgList(imgList, index);
                  })}
                </View>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  <Text style={{fontSize: 14, color: '#A0A0A0'}}>
                    {this.state.imgList.length}/{this.state.imgListMax}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{marginTop: 10, backgroundColor: '#fff'}}>
            <View style={{paddingLeft: 15, paddingRight: 15}}>
              <View style={{paddingTop: 15, paddingBottom: 15}}>
                <Text style={{fontSize: 16, color: '#222222'}}>
                  联系方式（必填，可2选1）
                </Text>
              </View>
              <View
                style={{
                  height: 1,
                  borderBottomColor: '#F2F2F2',
                  borderBottomWidth: 1,
                }}
              />
              <View style={{paddingTop: 5, paddingBottom: 5}}>
                <TextInput
                  multiline={false}
                  maxLength={11}
                  selectionColor={'#FA900D'}
                  autoCapitalize="none"
                  autoCorrect={false}
                  blurOnSubmit={true}
                  style={styles.mobileEdit}
                  placeholder={'请输入手机号'}
                  secureTextEntry={false}
                  value={this.state.mobile}
                  placeholderTextColor={'#BBBBBB'}
                  selectTextOnFocus={false}
                  textAlignVertical="top"
                  onChangeText={this.onMobileChange}
                />
              </View>
              <View
                style={{
                  height: 1,
                  borderBottomColor: '#F2F2F2',
                  borderBottomWidth: 1,
                }}
              />
              <View style={{paddingTop: 5, paddingBottom: 5}}>
                <TextInput
                  multiline={false}
                  maxLength={11}
                  selectionColor={'#FA900D'}
                  autoCapitalize="none"
                  autoCorrect={false}
                  blurOnSubmit={true}
                  style={styles.qqEdit}
                  placeholder={'请输入QQ号'}
                  secureTextEntry={false}
                  value={this.state.qq}
                  placeholderTextColor={'#BBBBBB'}
                  selectTextOnFocus={false}
                  textAlignVertical="top"
                  onChangeText={this.onQQChange}
                />
              </View>
            </View>
          </View>

          <View
            style={{position: 'absolute', bottom: 0, left: 0, width: width}}>
            <LinearGradient
              colors={['#FFB129', '#FF9108']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}
              style={styles.linearGradient}>
              <TouchableOpacity
                onPress={() => this.pushFeedback()}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 12,
                  paddingBottom: 12,
                  borderRadius: 25,
                }}>
                <Icon name="save" type="foundation" size={20} color="#fff" />
                <Text
                  style={{
                    marginLeft: 10,
                    color: '#fff',
                    fontSize: 16,
                    backgroundColor: 'transparent',
                  }}>
                  提交反馈
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <Modal
            popup
            maskClosable={true}
            visible={this.state.imgVisible}
            animationType="slide-up"
            onClose={this.closeImgModal}>
            <View style={{paddingLeft: 20, paddingRight: 20}}>
              <TouchableOpacity onPress={() => this.takePic()}>
                <View
                  style={{
                    paddingTop: 15,
                    paddingBottom: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#222222', fontSize: 16}}>拍一张</Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: 1,
                  borderBottomColor: '#F2F2F2',
                  borderBottomWidth: 1,
                }}
              />
              <TouchableOpacity onPress={() => this.choosePic()}>
                <View
                  style={{
                    paddingTop: 15,
                    paddingBottom: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#222222', fontSize: 16}}>
                    从相册选取
                  </Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  height: 1,
                  borderBottomColor: '#F2F2F2',
                  borderBottomWidth: 1,
                }}
              />
              <TouchableOpacity onPress={() => this.closeImgModal()}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}>
                  <Text style={{color: '#FF920C', fontSize: 16}}>取消</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
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
  linearGradient: {},
  contentEdit: {
    fontSize: 16,
    height: 144,
    color: '#272727',
    // borderWidth: 1,
  },
  qqEdit: {
    fontSize: 16,
    color: '#272727',
  },
  mobileEdit: {
    fontSize: 16,
    color: '#272727',
  },
});

export default FeedbackAdd;
