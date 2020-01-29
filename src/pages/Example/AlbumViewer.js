import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Modal,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class AlbumViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      images: props.navigation.state.params.images,
      modalVisible: true,
    };
  }

  render() {
    return (
      <View>
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => {
            this.props.navigation.goBack();
            this.setState({modalVisible: false});
          }}>
          <ImageViewer
            imageUrls={this.state.images}
            index={this.state.index}
            enableImageZoom={true}
            menuContext={{saveToLocal: '保存到相册', cancel: '取消'}}
            onSwipeDown={() => {
              console.log('onSwipeDown');
            }}
            enableSwipeDown={true}
          />
        </Modal>
      </View>
    );
  }
}
