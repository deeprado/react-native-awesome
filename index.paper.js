import * as React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import App from './src/demos/App.qimao';

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}
