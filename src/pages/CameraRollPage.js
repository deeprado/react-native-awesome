import React, {Component} from 'react';
import {Button, View, ScrollView, Image, StyleSheet} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';

class CameraRollPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
    };
  }

  _handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then(r => {
        this.setState({photos: r.edges});
      })
      .catch(err => {
        // Error Loading Images
        console.log(err);
      });
  };

  render() {
    return (
      <View>
        <Button title="Load Images" onPress={this._handleButtonPress} />
        <ScrollView>
          {this.state.photos.map((p, i) => {
            return (
              <Image
                key={i}
                style={styles.img}
                source={{uri: p.node.image.uri}}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    width: 300,
    height: 100,
  },
});
export default CameraRollPage;
