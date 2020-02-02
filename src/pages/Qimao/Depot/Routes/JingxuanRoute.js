import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  Carousel,
  Tabs,
  Provider,
  Modal,
  Toast,
  Button,
} from '@ant-design/react-native';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {IS_IOS} from '../../../../config';

const categoryPng = require('../../../../assets/qimao/image/category.png');
const rankPng = require('../../../../assets/qimao/image/rank.png');
const newPng = require('../../../../assets/qimao/image/new.png');
const donePng = require('../../../../assets/qimao/image/done.png');
const logoPng = require('../../../../assets/qimao/image/logo.png');
const {width, height} = Dimensions.get('window');

const onHorizontalSelectedIndexChange = function(index) {
  /* tslint:disable: no-console */
  // console.log('horizontal change to', index);
};

let carouselList = [
  {
    id: 1,
    color: 'green',
  },
  {
    id: 2,
    color: 'red',
  },
  {
    id: 3,
    color: 'blue',
  },
];

let leftRankBooks = [
  {
    id: 1,
    cover: logoPng,
    title: '无可救药爱生你',
    heart: 232323,
  },
  {
    id: 3,
    cover: logoPng,
    title: '奉子嫌弃不准逃',
    heart: 232323,
  },
  {
    id: 5,
    cover: logoPng,
    title: '大佬宠妻不腻',
    heart: 232323,
  },
  {
    id: 7,
    cover: logoPng,
    title: '帝少的心尖哑妻',
    heart: 232323,
  },
  {
    id: 9,
    cover: logoPng,
    title: '我给王爷当奶娘',
    heart: 232323,
  },
];

let rightRankBooks = [
  {
    id: 2,
    cover: logoPng,
    title: '双师宠妃',
    heart: 232323,
  },
  {
    id: 4,
    cover: logoPng,
    title: '天才小毒妃',
    heart: 232323,
  },
  {
    id: 6,
    cover: logoPng,
    title: '私婚秘爱',
    heart: 232323,
  },
  {
    id: 8,
    cover: logoPng,
    title: '神医底女',
    heart: 232323,
  },
  {
    id: 10,
    cover: logoPng,
    title: '我给王爷当奶娘',
    heart: 232323,
  },
];

let searchList = [
  {
    id: 1,
    cover: logoPng,
    title: 'xxxxxxxxxx',
    count: 2323232,
  },
  {
    id: 2,
    cover: logoPng,
    title: 'xxxxxxxxxx',
    count: 2323232,
  },
  {
    id: 3,
    cover: logoPng,
    title: 'xxxxxxxxxx',
    count: 2323232,
  },
  {
    id: 4,
    cover: logoPng,
    title: 'xxxxxxxxxx',
    count: 2323232,
  },
];

let originList = [
  {
    id: 1,
    cover: logoPng,
    title: 'xxxxxxxxxx',
    count: 2323232,
  },
  {
    id: 2,
    cover: logoPng,
    title: 'xxxxxxxxxx',
    count: 2323232,
  },
  {
    id: 3,
    cover: logoPng,
    title: 'xxxxxxxxxx',
    count: 2323232,
  },
  {
    id: 4,
    cover: logoPng,
    title: 'xxxxxxxxxx',
    count: 2323232,
  },
];

let specialList = [
  {
    id: 1,
    cover: logoPng,
    title: '寒门小福妻',
    summery:
      '孤苦伶仃的陆芸熙穿越成了村里的宝贝额打，乃那泼辣，谁欺负我的小。。',
    count: 2323232,
    fraction: 8.4,
  },
  {
    id: 2,
    cover: logoPng,
    title: '寒门小福妻',
    summery:
      '孤苦伶仃的陆芸熙穿越成了村里的宝贝额打，乃那泼辣，谁欺负我的小。。',
    count: 2323232,
    fraction: 8.4,
  },
  {
    id: 3,
    cover: logoPng,
    title: '寒门小福妻',
    summery:
      '孤苦伶仃的陆芸熙穿越成了村里的宝贝额打，乃那泼辣，谁欺负我的小。。',
    count: 2323232,
    fraction: 8.4,
  },
  {
    id: 4,
    cover: logoPng,
    title: '寒门小福妻',
    summery:
      '孤苦伶仃的陆芸熙穿越成了村里的宝贝额打，乃那泼辣，谁欺负我的小。。',
    count: 2323232,
    fraction: 8.4,
  },
  {
    id: 5,
    cover: logoPng,
    title: '寒门小福妻',
    summery:
      '孤苦伶仃的陆芸熙穿越成了村里的宝贝额打，乃那泼辣，谁欺负我的小。。',
    count: 2323232,
    fraction: 8.4,
  },
  {
    id: 6,
    cover: logoPng,
    title: '寒门小福妻',
    summery:
      '孤苦伶仃的陆芸熙穿越成了村里的宝贝额打，乃那泼辣，谁欺负我的小。。',
    count: 2323232,
    fraction: 8.4,
  },
  {
    id: 7,
    cover: logoPng,
    title: '寒门小福妻',
    summery:
      '孤苦伶仃的陆芸熙穿越成了村里的宝贝额打，乃那泼辣，谁欺负我的小。。',
    count: 2323232,
    fraction: 8.4,
  },
  {
    id: 8,
    cover: logoPng,
    title: '寒门小福妻',
    summery:
      '孤苦伶仃的陆芸熙穿越成了村里的宝贝额打，乃那泼辣，谁欺负我的小。。',
    count: 2323232,
    fraction: 8.4,
  },
];

const renderRankItems = function(books) {
  return (
    <View>
      {books.map((book, index) => {
        return (
          <View style={styles.rankListBookBox} key={book.id}>
            <View>
              <Image source={book.cover} style={styles.rankBookIcon} />
            </View>
            <View style={{marginLeft: 5}}>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>1 </Text>
                <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5}}>
                  {book.title}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', marginLeft: 16, marginTop: 5}}>
                <Text style={{color: '#6D6963'}}>热度: </Text>
                <Text style={{color: '#FF4343'}}>{book.heart}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

let hasMore = true;
let loading = false;
const _keyExtractor = (item, index) => item.id.toString();

const _separator = () => {
  // 再刷新or加载的时候进行的动画或者文字效果
  return <View style={{height: 1}} />;
};

const _renderEmpty = () => {
  return (
    <View>
      <Text>无数据</Text>
    </View>
  );
};

const _renderFooter = () => {
  if (hasMore) {
    if (loading) {
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
            marginBottom: 15,
          }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    } else {
      return null;
    }
  }
  return (
    <View
      style={{
        backgroundColor: '#F5F5F5',
        paddingBottom: 24,
        paddingLeft: 20,
        paddingRight: 20,
      }}>
      <Text
        style={{
          color: '#6D6963',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          marginTop: 15,
          marginBottom: 15,
        }}>
        已经到底了~
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'orange',
          borderRadius: 20,
          height: 40,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <LinearGradient
          colors={['#FFB129', '#FF9108']}
          style={styles.linearGradient}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              backgroundColor: 'transparent',
            }}>
            去分类书库，发现海量好书
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

let count = 0;
const _fetchMore = info => {
  console.log(info);
  if (count >= 5) {
    hasMore = false;
    return;
  }
  count += 1;
  console.log('xxxxxxxx');
  specialList = specialList.concat(specialList);
  console.log(specialList.length);
};

const _renderSpecialItem = row => {
  let item = row.item;
  return (
    <View
      style={{
        marginBottom: 20,
        flexDirection: 'row',
      }}
      key={item.id}>
      <View style={{width: 90, height: 120, overflow: 'hidden'}}>
        <Image source={logoPng} style={{width: 90, height: 120}} />
      </View>
      <View
        style={{
          marginLeft: 10,
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 20}}>
            {item.title}
            {item.id}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <View>
              <Text
                style={{
                  color: '#FF8D00',
                  fontSize: 20,
                  fontWeight: '700',
                }}>
                {item.fraction}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#FF8D00',
                  paddingBottom: 2,
                }}>
                分
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            marginTop: 10,
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 16, color: '#6D6963'}} numberOfLines={2}>
            {item.summery}
          </Text>
        </View>
        <Text style={{fontSize: 14, color: '#6D6963'}}>
          连载 {item.count} 万字
        </Text>
      </View>
    </View>
  );
};

const JingxuanRoute = () => (
  <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      {/* 轮播图 */}
      <View style={styles.wrapperBox}>
        <Carousel
          style={styles.wrapper}
          selectedIndex={0}
          autoplay={true}
          infinite={true}
          autoplayInterval={5000}
          dotStyle={{backgroundColor: '#F5F5F5'}}
          dotActiveStyle={{backgroundColor: '#FCC800'}}
          afterChange={onHorizontalSelectedIndexChange}>
          {carouselList.map((item, index) => {
            return (
              <View
                style={[
                  styles.containerHorizontal,
                  {backgroundColor: item.color},
                ]}
                key={item.id}>
                <Text>Carousel {item.id}</Text>
              </View>
            );
          })}
        </Carousel>
      </View>
      {/* 导航 */}
      <View style={styles.navBox}>
        <TouchableOpacity>
          <View style={styles.navBarBox}>
            <Image source={categoryPng} style={styles.navBarIcon} />
            <Text style={styles.navBarTxt}>分类</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.navBarBox}>
            <Image source={rankPng} style={styles.navBarIcon} />
            <Text style={styles.navBarTxt}>排行榜</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.navBarBox}>
            <Image source={newPng} style={styles.navBarIcon} />
            <Text style={styles.navBarTxt}>独家新书</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.navBarBox}>
            <Image source={donePng} style={styles.navBarIcon} />
            <Text style={styles.navBarTxt}>完结精品</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* 排行榜 */}
      <View style={styles.rankBox}>
        <View style={styles.rankTitleBox}>
          <View style={styles.rankTitleLeftBox}>
            <Text style={styles.rankTitle}>今日大热榜</Text>
            <Text style={styles.rankDetail}>百万书友阅读趋势</Text>
          </View>
          <Text style={styles.rankNote}>02月1日更新</Text>
        </View>
        <View style={styles.rankListBox}>
          <View style={styles.rankListLeft}>
            {renderRankItems(leftRankBooks)}
          </View>
          <View style={styles.rankListRight}>
            {renderRankItems(rightRankBooks)}
          </View>
        </View>
      </View>
      <View style={{marginTop: 10}}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5F5F5',
            height: 36,
            borderWidth: 0,
            borderRadius: 5,
          }}>
          <Text style={{color: '#6D6963'}}>查看更多排行榜</Text>
        </TouchableOpacity>
      </View>

      {/* 分类佳作 */}
      <View style={styles.goodBookBox}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={{fontSize: 24, fontWeight: '700'}}>分类佳作</Text>
          <TouchableOpacity>
            <Text style={{color: '#6D6963'}}>查看更多热门分类 ></Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* 实时热搜 */}
      <View style={styles.runtimeBox}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <Text style={{fontSize: 24, fontWeight: '700'}}>实时热搜</Text>
          <Text style={{color: '#6D6963', marginLeft: 20}}>
            女生都在搜的热门好书
          </Text>
        </View>
        <View style={{}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            {searchList.map((item, index) => {
              return (
                <View style={{width: 90}} key={item.id}>
                  <Image source={logoPng} style={{height: 124, width: 90}} />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      flexWrap: 'wrap',
                    }}>
                    <Text
                      style={{
                        color: '#333',
                        fontSize: 16,
                        marginTop: 3,
                        marginBottom: 3,
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                      }}>
                      {item.title}
                    </Text>
                  </View>
                  <Text style={{color: '#6D6963'}}>{item.count}次搜索</Text>
                </View>
              );
            })}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            {searchList.map((item, index) => {
              return (
                <View style={{width: 90}} key={item.id}>
                  <Image source={logoPng} style={{height: 124, width: 90}} />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      flexWrap: 'wrap',
                    }}>
                    <Text
                      style={{
                        color: '#333',
                        fontSize: 16,
                        marginTop: 3,
                        marginBottom: 3,
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                      }}>
                      {item.title}
                    </Text>
                  </View>
                  <Text style={{color: '#6D6963'}}>{item.count}次搜索</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      {/* 独家原创 */}
      <View style={styles.originBox}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <Text style={{fontSize: 24, fontWeight: '700'}}>独家原创</Text>
            <Text style={{color: '#6D6963', marginLeft: 20}}>
              七猫原创平台潜力大作
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="social-apple"
              type="foundation"
              size={23}
              color="green"
            />
            <Text style={{color: '#6D6963'}}> 梧桐中文网 </Text>
          </View>
        </View>
        <View style={{}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            {originList.map((item, index) => {
              return (
                <View style={{width: 90}} key={item.id}>
                  <Image source={logoPng} style={{height: 124, width: 90}} />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      flexWrap: 'wrap',
                    }}>
                    <Text
                      style={{
                        color: '#333',
                        fontSize: 16,
                        marginTop: 3,
                        marginBottom: 3,
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                      }}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            {originList.map((item, index) => {
              return (
                <View style={{width: 90}} key={item.id}>
                  <Image source={logoPng} style={{height: 124, width: 90}} />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      flexWrap: 'wrap',
                    }}>
                    <Text
                      style={{
                        color: '#333',
                        fontSize: 16,
                        marginTop: 3,
                        marginBottom: 3,
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                      }}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      {/* 高分精选 */}
      <View style={styles.specialBox}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <Text style={{fontSize: 24, fontWeight: '700'}}>高分精选</Text>
          <Text style={{color: '#6D6963', marginLeft: 20}}>
            平台高分口碑保障
          </Text>
        </View>
        <View
          style={{
            marginTop: 15,
            flexShrink: 0,
          }}>
          <FlatList
            data={specialList}
            extraData={specialList}
            keyExtractor={_keyExtractor}
            renderItem={_renderSpecialItem}
            ListEmptyComponent={_renderEmpty}
            ListFooterComponent={_renderFooter}
            onEndReached={_fetchMore}
            onEndReachedThreshold={IS_IOS ? 0.02 : 0.2}
            ItemSeparatorComponent={_separator}
            initialNumToRender={10}
            numColumns={1}
            flashScrollIndicators={true}
          />
        </View>
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
  },
  wrapperBox: {
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    fontSize: 36,
  },
  navBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  navBarBox: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  navBarIcon: {
    width: 40,
    height: 40,
  },
  navBarTxt: {
    fontSize: 16,
    fontFamily: '楷体',
    color: '#6D6963',
  },

  rankBox: {
    marginTop: 20,
  },
  rankTitleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'flex-end',
  },
  rankTitleLeftBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  rankTitle: {
    fontSize: 20,
  },
  rankDetail: {
    marginLeft: 15,
    color: '#6D6963',
  },
  rankNote: {
    color: '#6D6963',
  },
  rankListBox: {
    marginTop: 10,
    flexDirection: 'row',
  },
  rankListLeft: {
    width: (width - 40) / 2,
  },

  rankListBookBox: {
    flexDirection: 'row',
  },
  rankBookIcon: {
    width: 50,
    height: 65,
  },

  goodBookBox: {
    marginTop: 30,
  },
  originBox: {
    marginTop: 30,
  },
  specialBox: {
    marginTop: 30,
  },
});

export default JingxuanRoute;
