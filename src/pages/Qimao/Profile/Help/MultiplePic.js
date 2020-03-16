import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';
import {Modal, Toast, Provider} from '@ant-design/react-native';
import RNFS from 'react-native-fs';

const rootPath =
  Platform.OS === 'ios' ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;

class MultiplePic extends Component {
  constructor(props) {
    super(props);

    let params = this.props.navigation.state.params;
    this.state = {
      imgMax: params ? params.max : 6,
      imgList: [],
      imgLists: [],
      selectIDs: [],
      selectUrls: [],
      rootPath: rootPath,
    };
    this.goBack = this.goBack.bind(this);
    this.handleImgList = this.handleImgList.bind(this);
    this._renderThreeImgList = this._renderThreeImgList.bind(this);
  }

  componentDidMount() {
    this.listImgFiles();
  }

  // 本地图片
  listImgFiles() {
    const that = this;
    RNFS.readDir(rootPath)
      .then(result => {
        let imgReg = /\.(png|jpg|gif|jpeg|webp)$/i;
        let images = [];
        let id = 0;
        result.map(function(item, index) {
          if (item.isFile() && imgReg.test(item.name)) {
            id += 1;
            images.push({
              id,
              url: item.path,
            });
          }
        });
        that.setState({
          imgList: images,
        });
        that.handleImgList();
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  }

  goBack = () => {
    const {goBack, state} = this.props.navigation;
    if (state.params && state.params.setImgList) {
      let imgList = this.state.selectUrls;
      state.params.setImgList(imgList);
    }
    goBack();
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
    return (
      <TouchableOpacity onPress={() => this.goBack()}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 16, color: '#333333'}}>完成</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#000', fontSize: 22}}>选择图片</Text>
      </View>
    );
  }

  arraySlice = (array, sliceNum, newArray) => {
    let viod = 0; // 数组初始量
    for (let i = 0; i <= array.length; i++) {
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
  handleImgList() {
    let imgLists = [];
    this.arraySlice(this.state.imgList, 3, imgLists);
    this.setState({
      imgLists: imgLists,
    });
  }

  // 选择
  _chooseImg = item => {
    let selectIDs = this.state.selectIDs;
    let selectUrls = this.state.selectUrls;
    let index = selectIDs.indexOf(item.id);
    if (index > -1) {
      selectIDs.splice(index, 1);
      selectUrls.splice(index, 1);
    } else {
      selectIDs.push(item.id);
      selectUrls.push(item.url);
    }
    if (selectIDs.length > this.state.imgMax) {
      Toast.info('最多能选' + this.state.imgMax + '张图片');
      return;
    }
    this.setState({
      selectIDs: selectIDs,
      selectUrls: selectUrls,
    });
  };

  _renderMask = selected => {
    if (selected) {
      return (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: 120,
            width: 120,
            zIndex: 89,
            backgroundColor: '#000',
            opacity: 0.5,
          }}
        />
      );
    }
  };

  // 显示图片
  _renderThreeImgList(imgList) {
    let that = this;
    let selectIDs = that.state.selectIDs;
    if (imgList.length < 3) {
      for (let i = 0; i < 3 - imgList.length; i++) {
        imgList.push(false);
      }
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 15,
        }}>
        {imgList.map(function(item, index) {
          if (item) {
            let selected = selectIDs.indexOf(item.id) > -1;
            return (
              <TouchableOpacity onPress={() => that._chooseImg(item)}>
                <View
                  key={index}
                  style={{
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 120,
                    width: 120,
                  }}>
                  <Image
                    source={{uri: `file:///${item.url}`}}
                    style={{width: 120, height: 120}}
                    // resizeMode="contain"
                  />

                  {that._renderMask(selected)}

                  <View
                    style={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      zIndex: 99,
                    }}>
                    <Icon
                      name="check-circle"
                      type="feather"
                      size={18}
                      color={selected ? '#FFB028' : '#ccc'}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          } else {
            return (
              <View
                key={index}
                style={{
                  position: 'relative',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 120,
                  width: 120,
                }}
              />
            );
          }
        })}
      </View>
    );
  }

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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{backgroundColor: '#fff'}}>
              <View style={{marginTop: 10, paddingLeft: 15, paddingRight: 15}}>
                {imgLists.map(function(imgList, index) {
                  return that._renderThreeImgList(imgList);
                })}
              </View>
            </View>
          </ScrollView>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default MultiplePic;
