import React from 'react';
import {View, Text, Dimensions, ListView} from 'react-native';
import {Container, Navbar} from 'navbar-native';
import {parseArticleContent} from './parser';
import {Button} from 'react-native-elements';

import parseContent from './utils/parseContent';

import realmFactory from './utils/realmFactory';

//在切换页面的时候,发送通知,切换index
// type Props = {
//   novel: Novel,
//   navigationState: any,
//   directory: Array<Article>,
//   index: number, // start
// };

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class Reader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: parseInt(props.index),
      refetch: 0,
      navMargin: 0,
      fetching: true,
      dataSource: null,
      fontSize: 24,
      maxContentLength: 0,
    };
    this.realm = realmFactory();
  }

  componentWillMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // 获取内容
  fetchContent = (index, refresh = false) => {
    let article = this.props.directory.get(index);
    if (!article) {
      return;
    }
    this._isMounted &&
      this.setState({
        navMargin: 0,
        fetching: true,
        maxContentLength: 0,
        index,
      });

    this.realm.write(() => {
      this.props.novel.lastReadIndex = index;
      this.props.novel.lastReadTitle = article.get('title');
    });

    parseArticleContent(
      this.props.novel.directoryUrl,
      article.get('url'),
      refresh,
    )
      .then(content => {
        var {height, width} = Dimensions.get('window');
        let lineWidth = Math.floor(
          ((width - this.state.fontSize) * 2) / this.state.fontSize,
        );
        let rows = parseContent(content, lineWidth);
        let btnArr = [];

        if (this.props.directory.get(index - 1)) {
          btnArr.push(
            <Button
              key="before-article"
              onPress={e => this.handleGotoArticle(index - 1)}
              title="上一章"
            />,
          );
        }
        // btnArr.push(<Button key="back" onPress={Actions.pop} title="返回" />);
        btnArr.push(<Button key="back" title="返回" />);

        if (this.props.directory.get(index + 1)) {
          btnArr.push(
            <Button
              key="after-article"
              onPress={e => this.handleGotoArticle(index + 1)}
              title="下一章"
            />,
          );
        }

        let btns = (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 80,
            }}>
            {btnArr}
          </View>
        );
        rows.push(btns);

        let title = (
          <Text
            style={{
              fontSize: this.state.fontSize + 10,
              lineHeight: this.state.fontSize + 15,
              fontWeight: '300',
            }}>
            {article.get('title') + '\n'}
          </Text>
        );
        rows.unshift(title);
        rows.unshift(btns);

        this._isMounted &&
          this.setState({
            fetching: false,
            dataSource: ds.cloneWithRows(rows),
            index,
          });
      })
      .done(() => {
        //load more data
        for (var i = 1; i <= 5; i++) {
          if (this.props.directory.get(index + i)) {
            parseArticleContent(
              this.props.novel.directoryUrl,
              this.props.directory.getIn([index + i, 'url']),
            ).catch(e => {
              console.log(e);
            });
          }
        }
      });
  };

  componentDidMount() {
    this.fetchContent(this.state.index);
  }

  handleGotoArticle = index => {
    this.props.updateLastRead(index);
    this.fetchContent(index);
  };

  lastContentOffsetY = 0;
  handleScroll = e => {
    if (e.nativeEvent.contentOffset.y > 100) {
      if (
        this.state.maxContentLength > 0 &&
        (e.nativeEvent.contentOffset.y > this.state.maxContentLength ||
          this.state.maxContentLength - e.nativeEvent.contentOffset.y < 200)
      ) {
      } else {
        let difference =
          e.nativeEvent.contentOffset.y - this.lastContentOffsetY;
        if (difference > 0) {
          if (this.state.navMargin > -64) {
            let val =
              this.state.navMargin - difference < -64
                ? -64
                : this.state.navMargin - difference;
            this.setState({
              navMargin: val,
            });
          }
        } else {
          if (this.state.navMargin != 0) {
            let val =
              this.state.navMargin - difference > 0
                ? 0
                : this.state.navMargin - difference;
            this.setState({
              navMargin: val,
            });
          }
        }
      }
    }

    this.lastContentOffsetY = e.nativeEvent.contentOffset.y;
  };

  render() {
    let current = this.props.directory.get(this.state.index);
    if (current) {
      let containerParams = {
        type: 'plain',
        style: {
          backgroundColor: '#9FB2A1',
        },
      };
      let content;
      if (this.state.fetching) {
        containerParams.loading = {
          styleContainer: {
            // marginTop:Platform.OS == 'ios'?64:40,
            backgroundColor: 'rgba(102,102,102,.5)',
          },
          coverNavbar: false,
        };
      } else {
        var {height, width} = Dimensions.get('window');
        let style = {
          fontSize: this.state.fontSize,
          height: Math.ceil(this.state.fontSize * 1.35),
          lineHeight: Math.ceil(this.state.fontSize * 1.35),
          fontWeight: '300',
          width: width + 100,
        };
        //将内容分成多个数组来显示
        content = (
          <ListView
            style={{
              height: height,
              paddingTop: 10,
              paddingLeft: this.state.fontSize - 10,
            }}
            renderFooter={() => {
              return (
                <View
                  style={{
                    height: 100,
                  }}
                />
              );
            }}
            onScroll={this.handleScroll.bind(this)}
            initialListSize={40}
            pageSize={40}
            onEndReachedThreshold={100}
            scrollRenderAheadDistance={500}
            dataSource={this.state.dataSource}
            renderRow={rowData => {
              if (typeof rowData == 'string') {
                return <Text style={style}>{rowData}</Text>;
              } else {
                return rowData;
              }
            }}
          />
        );
      }

      let leftBtns = [
        {
          icon: 'ios-arrow-back',
          label: '返回',
          onPress: () => console.log('xxx'),
        },
      ];

      let rightBtns = [
        {
          label: '刷新',
          onPress: e => {
            this.fetchContent(this.state.index, true);
          },
        },
      ];
      if (this.props.needShowDir) {
        rightBtns.unshift({
          icon: 'ios-list-outline',
          onPress: () => console.log({novel: this.props.novel}),
        });
      }
      return (
        <Container {...containerParams}>
          <Navbar
            title={current.get('title')}
            left={leftBtns}
            right={rightBtns}
            style={{
              marginTop: this.state.navMargin,
            }}
          />
          {content}
        </Container>
      );
    } else {
      return (
        <Container>
          <Navbar
            title="没有下一章了"
            left={{
              icon: 'ios-arrow-back',
              label: '返回',
              onPress: () => console.log('Actions.pop'),
            }}
          />
          <Text>没有更多内容了</Text>
        </Container>
      );
    }
  }
}

export default Reader;
