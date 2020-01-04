'use strict';

import React from 'react-native';
import styles from '../Styles/Main';

let {Text, View, Modal, TouchableHighlight} = React;

class ModalDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Modal animated={true}>
          <View style={[styles.verticalCenter, {backgroundColor: '#9376d2'}]}>
            <Text style={{color: '#fff'}}>hello ~ </Text>
            <TouchableHighlight
              underlayColor="rgba(34, 26, 38, 0.1)"
              onPress={() => {}}
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
