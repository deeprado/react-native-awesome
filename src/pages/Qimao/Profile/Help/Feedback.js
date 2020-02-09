import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';

const nodataPng = require('../../../../assets/qimao/image/nodata.png');

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack = () => {
    this.props.navigation.goBack();
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
        <Text style={{color: '#000', fontSize: 22}}>我的反馈</Text>
      </View>
    );
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

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <Image source={nodataPng} style={{width: 360, height: 240}} />
          <Text style={{color: '#999999', fontSize: 18}}>暂无数据</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default Feedback;
