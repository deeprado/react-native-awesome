import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';

const aboutPng = require('../../../../assets/qimao/image/about.png');

class About extends Component {
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
    return null;
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#000', fontSize: 24}}>关于七猫免费小说</Text>
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
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <Image source={aboutPng} style={{width: 200, height: 200}} />
        </View>

        <View style={{marginTop: 40, backgroundColor: '#fff'}}>
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <TouchableOpacity>
              <View
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 16, color: '#686868'}}>
                    版本信息： 3.11
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="chevron-right"
                    type="feather"
                    size={24}
                    color="#DADADA"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: 1,
                borderBottomColor: '#F2F2F2',
                borderBottomWidth: 1,
              }}
            />
            <TouchableOpacity>
              <View
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 16, color: '#686868'}}>
                    官方QQ群：827296772
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="chevron-right"
                    type="feather"
                    size={24}
                    color="#DADADA"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F5F5F5',
  },
});

export default About;
