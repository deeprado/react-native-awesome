import {Dimensions} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

// 页面
import Jingxuan from './Child/Jingxuan';
import Nansheng from './Child/Nansheng';
import Nvsheng from './Child/Nvsheng';
import Tushu from './Child/Tushu';

// import Category from '../../Category/CategoryList';
import Category from './Category';
import Rank from './Rank';
import Product from './Product';
import Boutique from './Boutique';
import Filter from './Filter';

const {width, height} = Dimensions.get('window');

// 默认显示Tab标签页
const TabNavigator = createMaterialTopTabNavigator(
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
    backBehavior: 'initialRoute',
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

// 其他路由页面，比如分类、排行榜等
const StackNavigator = createStackNavigator(
  {
    Category: {
      screen: Category,
      navigationOptions: {
        gesturesEnabled: true,
      },
    },
    Rank: {
      screen: Rank,
      navigationOptions: {
        gesturesEnabled: true,
      },
    },
    Product: {
      screen: Product,
      navigationOptions: {
        gesturesEnabled: true,
      },
    },
    Boutique: {
      screen: Boutique,
      navigationOptions: {
        gesturesEnabled: true,
      },
    },
    Filter: {
      screen: Filter,
      navigationOptions: {
        gesturesEnabled: true,
      },
    },
  },
  {
    mode: 'card',
    headerMode: 'none',
    initialRouteName: 'Boutique',
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    }),
  },
);

const DepotNavigator = createStackNavigator(
  {
    DepotTab: {
      screen: TabNavigator,
      navigationOptions: {
        gesturesEnabled: true,
      },
    },
    DepotStack: {
      screen: StackNavigator,
      navigationOptions: {
        gesturesEnabled: true,
      },
    },
  },
  {
    mode: 'card',
    headerMode: 'none',
    initialRouteName: 'DepotTab',
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    }),
  },
);

const TabContainer = createAppContainer(DepotNavigator);

export default TabContainer;
