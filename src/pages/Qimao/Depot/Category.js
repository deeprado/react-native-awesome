import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  SectionList,
} from 'react-native';
import {Header, Text, Image, Icon} from 'react-native-elements';
const {width, height} = Dimensions.get('window');

const logoPng = require('../../../assets/qimao/image/logo.png');

const CateData = require('./Data/CategoryData.json');

class Category extends Component {
  static navigationOptions = {
    title: '书架',
  };
  constructor(props) {
    super(props);
    this.state = {};

    this._flatList = null;
    this._sectionList = null;
    this.state = {
      selectedRootCate: 0,
    };

    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {}

  goBack() {
    this.props.navigation.navigate('DepotTab');
  }

  // 给list设置的key，遍历item。这样就不会报黄线
  _keyExtractor = (item, index) => index.toString();

  renderLeftComponent() {
    if (this.state.editing) {
      return null;
    } else {
      return (
        <Icon name="left" color="#000" type="antdesign" onPress={this.goBack} />
      );
    }
  }

  renderRightComponent() {
    return null;
  }

  _renderItem = item => {
    let index = item.index;
    let title = item.item.title;
    return (
      <TouchableOpacity
        key={index}
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            height: 44,
          },
          this.state.selectedRootCate === index
            ? {
                backgroundColor: '#FFF',
                borderLeftWidth: 4,
                borderLeftColor: '#FFA93F',
              }
            : {backgroundColor: '#F5F5F5'},
        ]}
        onPress={() => {
          setTimeout(() => {
            (CateData.data.length - index) * 45 > height - 65
              ? this._flatList.scrollToOffset({
                  animated: true,
                  offset: index * 45,
                })
              : null;
          }, 100);
          this.setState({selectedRootCate: index});
        }}>
        <Text
          style={{
            fontSize: 16,
            color: this.state.selectedRootCate === index ? '#FFA93F' : '#333',
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  renderRootCate() {
    let data = [];
    CateData.data.map((item, index) => {
      data.push({key: index, title: item.firstCateName});
    });
    return (
      <View>
        <FlatList
          ref={flatList => (this._flatList = flatList)}
          data={data}
          ListHeaderComponent={() => <View />}
          ListFooterComponent={() => <View />}
          ItemSeparatorComponent={() => (
            <View style={{height: 1, backgroundColor: '#FFF'}} />
          )}
          renderItem={this._renderItem}
          onEndReachedThreshold={20}
          showsVerticalScrollIndicator={false}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }

  _separator = () => {
    // 再刷新or加载的时候进行的动画或者文字效果
    return <View style={{height: 1}} />;
  };

  _renderCategoryItem(row) {
    let data = row.item;
    return (
      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#FFF',
          }}>
          <View>
            <Image source={logoPng} style={{width: 56, height: 80}} />
          </View>
          <View style={{marginLeft: 10, flex: 1, paddingRight: 15}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 5,
              }}>
              <Text style={{fontSize: 16, fontWeight: '700'}}>
                {data.secondCateName}
              </Text>
              <Text style={{fontSize: 12, color: 'gray'}}>
                {data.total}本 >
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              {data.titles.map(function(title, index) {
                if (index > 0) {
                  return (
                    <View style={{flexDirection: 'row'}} key={'title' + index}>
                      <Text
                        style={{
                          marginLeft: 5,
                          marginRight: 5,
                          color: 'gray',
                          fontSize: 12,
                        }}>
                        |
                      </Text>
                      <Text style={{color: 'gray', fontSize: 14}}>{title}</Text>
                    </View>
                  );
                } else {
                  return (
                    <View>
                      <Text style={{color: 'gray', fontSize: 14}}>{title}</Text>
                    </View>
                  );
                }
              })}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderItemCate() {
    let secondCateItems =
      CateData.data[this.state.selectedRootCate].secondCateItems;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
          marginLeft: 10,
          marginTop: 8,
        }}>
        <FlatList
          data={secondCateItems}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderCategoryItem}
          ItemSeparatorComponent={this._separator}
          flashScrollIndicators={true}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#fff'}
          leftComponent={this.renderLeftComponent()}
          centerComponent={{
            text: '分类',
            style: {color: '#000', fontSize: 24},
          }}
          rightComponent={this.renderRightComponent()}
        />
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{backgroundColor: '#F5F5F5', width: 100}}>
            {this.renderRootCate()}
          </View>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            {this.renderItemCate()}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Category;
