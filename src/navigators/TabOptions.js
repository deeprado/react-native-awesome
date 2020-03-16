import {Image} from 'react-native';

const TabOptions = (tabBarTitle, normalImage, selectedImage, navTitle) => {
  // console.log(navigation);
  const tabBarLabel = tabBarTitle;
  console.log(navTitle);
  const tabBarIcon = ({tintColor, focused}) => {
    return focused ? (
      <Image
        source={{uri: normalImage}}
        style={[TabBarIcon, {tintColor: tintColor}]}
      />
    ) : (
      <Image
        source={{uri: selectedImage}}
        style={[TabBarIcon, {tintColor: tintColor}]}
      />
    );
  };
  const headerTitle = navTitle;
  const headerTitleStyle = {fontSize: 20, color: 'white'};
  // header的style
  const headerStyle = {backgroundColor: '#4ECBFC'};
  return {tabBarLabel, tabBarIcon, headerTitle, headerTitleStyle, headerStyle};
};

export default TabOptions;
