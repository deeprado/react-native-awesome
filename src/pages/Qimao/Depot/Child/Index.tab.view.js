import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Icon} from 'react-native-elements';
const {width, height} = Dimensions.get('window');

const JingxuanRoute = () => (
  <ScrollView>
    <View style={[styles.tabScene, {backgroundColor: '#ff4081'}]} />
  </ScrollView>
);

const NanshengRoute = () => (
  <View style={[styles.tabScene, {backgroundColor: '#673ab7'}]} />
);

const NvshengRoute = () => (
  <View style={[styles.tabScene, {backgroundColor: '#673ab7'}]} />
);

const TushuRoute = () => (
  <View style={[styles.tabScene, {backgroundColor: '#673ab7'}]} />
);

const initialLayout = {
  width: width,
};
const keepWidth = 120;
const indicatorWidth = 18;

const renderTabBar = props => (
  <TabBar
    {...props}
    style={styles.tabBarStyle}
    tabStyle={styles.tabStyle}
    activeColor={'#F9BC3A'}
    inactiveColor={'#000'}
    indicatorStyle={styles.indicatorStyle}
    labelStyle={styles.labelStyle}
  />
);

export default function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'jingxuan', title: '精选'},
    {key: 'nansheng', title: '男生'},
    {key: 'nvsheng', title: '女生'},
    {key: 'tushu', title: '图书'},
  ]);

  const renderScene = SceneMap({
    jingxuan: JingxuanRoute,
    nansheng: NanshengRoute,
    nvsheng: NvshengRoute,
    tushu: TushuRoute,
  });

  return (
    <View style={styles.container}>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.tabContainer}
        sceneContainerStyle={styles.sceneContainerStyle}
      />
      <View style={styles.searchBox}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Search');
          }}>
          <Icon name="search" type="octicon" color="#000" size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  tabContainer: {
    marginTop: StatusBar.currentHeight,
  },
  tabScene: {
    flex: 1,
  },
  sceneContainerStyle: {
    // borderWidth: 1,
    // borderColor: 'red',
  },

  searchBox: {
    width: 40,
    position: 'absolute',
    top: 15 + StatusBar.currentHeight,
    right: 10,
    height: 36,
    zIndex: 10,
  },

  tabBarStyle: {
    backgroundColor: '#fff',
    width: width,
    borderWidth: 0,
    borderColor: '#fff',
    shadowColor: '#fff',
  },
  indicatorStyle: {
    backgroundColor: '#F9BC3A',
    width: 20,
    borderWidth: 0,
    marginLeft: (width - keepWidth) / 8 - 9,
    marginBottom: 5,
  },
  labelStyle: {fontSize: 18, fontWeight: '600', borderWidth: 0},
  tabStyle: {
    width: (width - 120) / 4,
  },
});
