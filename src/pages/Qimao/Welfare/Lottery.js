import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Easing,
  Animated,
  ScrollView,
} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';
import {WebView} from 'react-native-webview';

class Lottery extends Component {
  constructor(props) {
    super(props);
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
    return (
      <Icon
        name="left"
        color="#9D9D9D"
        type="antdesign"
        onPress={this.goBack}
      />
    );
  }

  renderCenterComponent() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name="x"
          color="#333333"
          type="feather"
          onPress={this.goBack}
          size={28}
        />
        <Text style={{marginLeft: 15, color: '#000', fontSize: 24}}>
          幸运大转盘
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          placement="left"
          backgroundColor={'#fff'}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          // rightComponent={this.renderRightComponent()}
        />
        <WebView source={{uri: 'https://www.baidu.com/'}} />
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

export default Lottery;
