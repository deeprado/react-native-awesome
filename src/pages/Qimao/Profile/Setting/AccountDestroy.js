import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';

class AccountDestroy extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  goTarget(routeName) {
    this.props.navigation.push(routeName);
  }

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
        <Text style={{color: '#000', fontSize: 24}}>账号安全</Text>
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
        <View style={{marginTop: 10, backgroundColor: '#fff'}}>
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <TouchableOpacity
              onPress={() => this.goTarget('AccountDestroyApplication')}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 20,
                  paddingBottom: 20,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 20}}>注销账号</Text>
                    <Text
                      style={{
                        marginLeft: 15,
                        fontSize: 14,
                        color: '#9A9A9A',
                      }}>
                      注销后账号内数据无法恢复，请谨慎操作
                    </Text>
                  </View>
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

export default AccountDestroy;
