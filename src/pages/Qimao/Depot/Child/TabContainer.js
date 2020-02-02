import {Dimensions} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Jingxuan from './Jingxuan';
import Nansheng from './Nansheng';
import Nvsheng from './Nvsheng';
import Tushu from './Tushu';

const {width, height} = Dimensions.get('window');

const TabContent = createMaterialTopTabNavigator(
  {
    Jingxuan: {
      screen: Jingxuan,
      navigationOptions: {
        tabBarLabel: '精选',
      },
    },
    Nansheng: {
      screen: Nansheng,
      navigationOptions: {
        tabBarLabel: '男生',
      },
    },
    Nvsheng: {
      screen: Nvsheng,
      navigationOptions: {
        tabBarLabel: '女生',
      },
    },
    Tushu: {
      screen: Tushu,
      navigationOptions: {
        tabBarLabel: '图书',
      },
    },
  },
  {
    initialRouteName: 'Jingxuan',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: false,
    tabBarPosition: 'top',

    tabBarOptions: {
      style: {
        backgroundColor: '#fff',
        width: width,
        borderWidth: 0,
        borderColor: '#fff',
        shadowColor: '#fff',
      },
      tabStyle: {
        width: (width - 120) / 4,
      },
      activeTintColor: '#F9BC3A',
      inactiveTintColor: '#000',
      indicatorStyle: {
        backgroundColor: '#F9BC3A',
        width: 20,
        borderWidth: 0,
        marginLeft: (width - 120) / 8 - 9,
        marginBottom: 5,
      },
      labelStyle: {
        fontSize: 18,
        fontWeight: '600',
        borderWidth: 0,
      },
    },
  },
);

const TabContainer = createAppContainer(TabContent);

export default TabContainer;
