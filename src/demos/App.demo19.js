import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

const en = {
  foo: 'Foo',
  bar: 'Bar {{someValue}}',
};

const fr = {
  foo: 'Fou',
  bar: 'Bár {{someValue}}',
};

i18n.fallbacks = true;
i18n.translations = {fr, en};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
  },
});

class LoginScreen extends Component {
  static navigationOptions = ({screenProps: {t}}) => ({
    title: t('foo'),
  });

  render() {
    let {t, locale} = this.props.screenProps;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Current locale: {locale}.{' '}
          {locale !== 'en' && locale !== 'fr'
            ? 'Translations will fall back to "en" because none available'
            : null}
        </Text>
        <Text>{t('bar', {someValue: Date.now()})}</Text>
        {locale === 'en' ? (
          <Button
            title="Switch to French"
            onPress={() => this.props.screenProps.setLocale('fr')}
          />
        ) : (
          <Button
            title="Switch to English"
            onPress={() => this.props.screenProps.setLocale('en')}
          />
        )}
      </View>
    );
  }
}
class MainScreen extends Component {
  render() {
    return (
      <View>
        <Text>Main</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Login: {screen: LoginScreen},
  Main: {screen: MainScreen},
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  state = {
    locale: Localization.locale,
  };

  setLocale = locale => {
    this.setState({locale});
  };

  t = (scope, options) => {
    return i18n.t(scope, {locale: this.state.locale, ...options});
  };

  render() {
    return (
      <AppContainer
        screenProps={{
          t: this.t,
          locale: this.state.locale,
          setLocale: this.setLocale,
        }}
      />
    );
  }
}
