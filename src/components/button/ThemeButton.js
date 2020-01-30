import * as React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useTheme,ThemeContext} from 'react-navigation';

// Black background and white text in light theme, inverted on dark theme
function MyButton1() {
  let theme = useTheme();

  return (
    <TouchableOpacity
      style={{backgroundColor: theme === 'light' ? '#000' : '#fff'}}>
      <Text style={{color: theme === 'light' ? '#fff' : '#000'}}>Button!</Text>
    </TouchableOpacity>
  );
}

function MyButton2() {
  const consumer = ThemeContext.Consumer
  return (
    <consumer>
      {theme => (
        <TouchableOpacity
          style={{ backgroundColor: theme === 'light' ? '#000' : '#fff' }}>
          <Text style={{ color: theme === 'light' ? '#fff' : '#000' }}>Button!</Text>
        </TouchableOpacity>
      )}
    <consumer>
  );
}

class MyButton3 extends React.Component {
  static contextType = ThemeContext;

  render() {
    return (
      <TouchableOpacity
        style={{ backgroundColor: theme === 'light' ? '#000' : '#fff' }}
      >
        <Text style={{ color: theme === 'light' ? '#fff' : '#000' }}>
          Button!
        </Text>
      </TouchableOpacity>
    );
  }
}

function MyButton4() {
  let theme = useTheme();
  let colors = ThemeColors[theme];

  return (
    <TouchableOpacity style={{ backgroundColor: colors.bodyContent }}>
      <Text style={{ color: colors.label }}>Button!</Text>
    </TouchableOpacity>
  );
}


function MyButton5() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity style={{ backgroundColor: colors.bodyContent }}>
        <Themed.Text>Button!</Themed.Text>
      </TouchableOpacity>
      <Themed.StatusBar />
    </View>
  );
}
