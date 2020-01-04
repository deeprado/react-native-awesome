'use strict';

import React from 'react-native';
import styles from '../Styles/Main';

let {Text, View, Modal, TouchableHighlight} = React;

class ModalDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }

  render() {
    return (
      <View>
        <TouchableHighlight
          underlayColor="rgba(34, 26, 38, 0.1)"
          onPress={() => this.setState({modalVisible: true})}
          style={{margin: 10, justifyContent: 'flex-end', marginBottom: 90}}>
          <View
            style={{backgroundColor: '#9182E6', borderRadius: 3, padding: 13}}>
            <Text
              style={{alignSelf: 'center', color: 'rgba(255, 255, 255, 0.9)'}}>
              我有话要说！
            </Text>
          </View>
        </TouchableHighlight>
        <Modal visible={this.state.modalVisible} animated={true}>
          <View style={[styles.verticalCenter, {backgroundColor: '#9376d2'}]}>
            <Text style={{color: '#fff'}}>hello ~ </Text>
            <TouchableHighlight
              underlayColor="rgba(34, 26, 38, 0.1)"
              onPress={() => this.setState({modalVisible: false})}
              style={{
                margin: 10,
                justifyContent: 'flex-end',
                marginBottom: 90,
              }}>
              <View
                style={{backgroundColor: '#fff', borderRadius: 3, padding: 13}}>
                <Text style={{alignSelf: 'center', color: '#9376d2'}}>
                  好了，我知道了
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}

export {ModalDemo as default};
