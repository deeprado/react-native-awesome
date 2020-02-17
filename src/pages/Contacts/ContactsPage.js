import React, {Component} from 'react';
import {
  View,
  Button,
  Alert,
  PermissionsAndroid,
  FlatList,
  Text,
} from 'react-native';
import Contacts from 'react-native-contacts';

class ContactsPage extends Component {
  static navigationOptions = {
    tabBarLabel: '联系人',
  };

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
  }

  xx() {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
    }).then(() => {
      Contacts.getAll((err, contacts) => {
        if (err === 'denied') {
          // error
        } else {
          // contacts returned in Array
        }
      });
    });
  }

  checkPermission() {
    Alert.alert('检查权限');

    Contacts.checkPermission((err, permission) => {
      if (err) {
        Alert.alert('错误');
        console.log(err);
        throw err;
      }

      // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
      if (permission === 'undefined') {
        Contacts.requestPermission((err, permission) => {
          if (err) {
            Alert.alert('错误');
            throw err;
          }
          // ...
        });
      }
      if (permission === 'authorized') {
        // yay!
      }
      if (permission === 'denied') {
        // x.x
      }
    });
    Alert.alert('yyyyyyyyyyyy');
  }

  openContactForm() {
    var newPerson = {
      emailAddresses: [
        {
          label: 'work',
          email: 'mrniet@example.com',
        },
      ],
      familyName: 'Nietzsche',
      givenName: 'Friedrich',
    };

    Contacts.openContactForm(newPerson, (err, contact) => {
      if (err) {
        throw err;
      }
      // contact has been saved
    });
  }

  addContact() {
    var newPerson = {
      emailAddresses: [
        {
          label: 'work',
          email: 'mrniet@example.com',
        },
      ],
      familyName: 'Nietzsche',
      givenName: 'Friedrich',
    };

    Contacts.addContact(newPerson, err => {
      if (err) {
        throw err;
      }
      Alert.alert('添加成功');
    });
  }

  updateContact() {
    Contacts.getAll((err, contacts) => {
      if (err) {
        throw err;
      }
      // update the first record
      let someRecord = contacts[0];
      someRecord.emailAddresses.push({
        label: 'junk',
        email: 'mrniet+junkmail@test.com',
      });
      Contacts.updateContact(someRecord, err => {
        if (err) {
          throw err;
        }
        /*...*/
      });
    });
  }

  getAll() {
    Contacts.getAll((err, contacts) => {
      if (err) {
        throw err;
      }

      this.setState({
        contacts: contacts,
      });
    });
  }

  getAllWithoutPhotos() {
    Contacts.getAllWithoutPhotos((err, contacts) => {
      if (err) {
        throw err;
      }
      console.log(contacts);
    });
  }

  // 给list设置的key，遍历item。这样就不会报黄线
  _keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View>
        <Button title="检查权限" onPress={() => this.checkPermission()} />
        <Button title="添加联系人" onPress={() => this.addContact()} />
        <Button title="更新联系人" onPress={() => this.updateContact()} />
        <Button title="获取所有" onPress={() => this.getAll()} />
        <Button title="获取所有" onPress={() => this.openContactForm()} />

        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.state.contacts}
          renderItem={({item, index}) => (
            <View key={index}>
              <Text>{item.familyName}</Text>
              <Text>{item.givenName}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

export default ContactsPage;
