import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Modal, Toast, Provider} from '@ant-design/react-native';

const teenagerModePng = require('../../../assets/qimao/image/teenager_mode.png');

class Teenager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: false,
    };
  }

  componentDidMount() {}

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
        <Text style={{color: '#000', fontSize: 22}} numberOfLines={1}>
          青少年模式
        </Text>
      </View>
    );
  }

  confirmContent() {
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
            color: '#696969',
          }}>
          是否确认开启青少年模式？
        </Text>
      </View>
    );
  }

  startMode = () => {
    this.setState({
      mode: true,
    });
    Toast.info('青少年模式已开启');
  };

  showStartMode = () => {
    let that = this;
    Modal.alert(
      '温馨提示',
      this.confirmContent(),
      [
        {
          text: '取消',
          style: {
            color: '#696969',
            fontSize: 16,
          },
        },
        {
          text: '确认',
          onPress: () => that.startMode(),
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

  render() {
    return (
      <Provider>
        <View style={styles.container}>
          <Header
            backgroundColor={'#fff'}
            leftComponent={this.renderLeftComponent()}
            centerComponent={this.renderCenterComponent()}
            rightComponent={this.renderRightComponent()}
          />

          <View
            style={{
              marginTop: 30,
              paddingLeft: 40,
              paddingRight: 40,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View>
                <Image
                  source={teenagerModePng}
                  style={{width: 210, height: 140}}
                />
              </View>
              <View>
                <Text
                  style={{fontSize: 20, fontWeight: '700', color: '#222222'}}>
                  青少年模式
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 17, color: '#222222', lineHeight: 24}}>
                  1.
                  为呵护青少年健康成长，七猫免费小说特别推出青少年模式，该模式下将有部分功能不开放使用。该模式下，我们精选了一批教育类、知识类内容呈现在书城，以供青少年模式下的用户阅读。
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 17, color: '#222222', lineHeight: 24}}>
                  2.
                  青少年模式是我们为促使青少年健康成长做出的一次尝试，我们优先针对核心场景进行了优化，也将继续致力于更多场景。
                </Text>
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <LinearGradient
                colors={['#FFB129', '#FF9108']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
                style={styles.linearGradient}>
                <TouchableOpacity
                  onPress={() => this.showStartMode()}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 15,
                    paddingBottom: 15,
                    borderRadius: 25,
                  }}>
                  <Text
                    style={{
                      marginLeft: 10,
                      color: '#fff',
                      fontSize: 20,
                      fontWeight: '700',
                      backgroundColor: 'transparent',
                    }}>
                    开启青少年模式
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
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
  linearGradient: {
    borderRadius: 30,
  },
});

export default Teenager;
