import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';
import {Accordion} from '@ant-design/react-native';
import LinearGradient from 'react-native-linear-gradient';
const {width} = Dimensions.get('window');

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
    };
    this.onSectionChange = activeSections => {
      this.setState({activeSections});
    };
    this.goTarget = this.goTarget.bind(this);
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  goDetail = id => {
    this.props.navigation.navigate('Detail', {
      id,
    });
  };

  goTarget = routeName => {
    this.props.navigation.navigate(routeName);
  };

  renderLeftComponent() {
    return (
      <Icon
        name="left"
        color="#9D9D9D"
        type="antdesign"
        onPress={this.goBack}
      />
    );
  }

  renderRightComponent() {
    return (
      <TouchableOpacity onPress={() => this.goTarget('Feedback')}>
        <View>
          <Text style={{fontSize: 16, color: '#333333'}}>我的反馈</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#000', fontSize: 22}}>帮助与反馈</Text>
      </View>
    );
  }

  _renderAccordionHeader(txt) {
    return (
      <View style={{backgroundColor: 'red', justifyContent: 'space-between'}}>
        <Text>{txt}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#fff'}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
        />

        <ScrollView>
          {/*  */}
          <View style={{backgroundColor: '#fff'}}>
            {/* 标题 */}
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: '#F5F5F5',
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}>
                  <View style={{width: 30}}>
                    <Icon
                      name="compass"
                      type="feather"
                      size={26}
                      color="#DADADA"
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={{fontSize: 18, color: '#3E3E3E'}}>
                      新手问题
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            {/* 列表 */}
            <View style={{paddingLeft: 10, paddingRight: 0}}>
              <View>
                <Accordion
                  onChange={this.onSectionChange}
                  activeSections={this.state.activeSections}>
                  <Accordion.Panel header="这里的小说真的全部免费嘛？">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        七猫免费小说致力于为读者提供高质量的小说，这里所有的小说都是由版权方提供并授权发行的正版小说，所有费用有我们承担，用户完全免费阅读。
                      </Text>
                    </View>
                  </Accordion.Panel>
                  <Accordion.Panel header="为什么看书还能得金币？">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        为帮助用户养成经常阅读的习惯，我们设置了一系列的金币奖励，让您在不花钱看书的同时，还能有所收益。
                      </Text>
                    </View>
                  </Accordion.Panel>
                </Accordion>
              </View>
              <View style={{paddingLeft: 12, paddingRight: 36}}>
                <TouchableOpacity onPress={() => this.goDetail(1)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}>
                    <Text style={{fontSize: 18, color: '#222222'}}>
                      新用户如何获得新用户红包并提现？
                    </Text>
                    <Icon
                      name="paperclip"
                      type="foundation"
                      size={16}
                      color="#DADADA"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* 金币问题 */}
          <View style={{backgroundColor: '#fff'}}>
            {/* 标题 */}
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: '#F5F5F5',
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}>
                  <View style={{width: 30}}>
                    <Icon
                      name="database"
                      type="feather"
                      size={24}
                      color="#DADADA"
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={{fontSize: 18, color: '#3E3E3E'}}>
                      金币问题
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            {/* 列表 */}
            <View style={{paddingLeft: 10, paddingRight: 0}}>
              <View>
                <Accordion
                  onChange={this.onSectionChange}
                  activeSections={this.state.activeSections}>
                  <Accordion.Panel header="金币是什么？">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        金币是七猫免费小说里面的货币单位，金币可以直接兑换现金哦~
                      </Text>
                    </View>
                  </Accordion.Panel>
                  <Accordion.Panel header="获取金币的方式有哪些？">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        获取金币的方式有很多，看书、签到，或完成任务如：绑定手机号/微信、分享APP、参与新手答题、打开推送等都可以获得大量金币。
                      </Text>
                    </View>
                  </Accordion.Panel>
                  <Accordion.Panel header="为什么看书时的金币消失了？">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        正常在线阅读时，每天前3小时可获得金币，30秒奖励一次，每次最高可得50金币。另外，无网络阅读或阅读本地书籍不加金币哦~
                      </Text>
                    </View>
                  </Accordion.Panel>
                  <Accordion.Panel header="签到金币的规则是什么？">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        签到奖励分为日常签到奖励、首次奖励和连签天数奖励，每天都签到即可获得丰厚的金币奖励哦！
                      </Text>
                    </View>
                  </Accordion.Panel>
                  <Accordion.Panel header="金币可以赠送码？">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        金币是与账号绑定的，无法赠送给他人。
                      </Text>
                    </View>
                  </Accordion.Panel>
                </Accordion>
              </View>
            </View>
          </View>

          {/* 提现问题 */}
          <View style={{backgroundColor: '#fff'}}>
            {/* 标题 */}
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: '#F5F5F5',
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}>
                  <View style={{width: 30}}>
                    <Icon
                      name="yen"
                      type="foundation"
                      size={30}
                      color="#DADADA"
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={{fontSize: 18, color: '#3E3E3E'}}>
                      提现问题
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            {/* 列表 */}
            <View style={{paddingLeft: 10, paddingRight: 0}}>
              <View>
                <Accordion
                  onChange={this.onSectionChange}
                  activeSections={this.state.activeSections}>
                  <Accordion.Panel header="提现多久到账？">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        正常情况下提现将在提交申请后1-3个工作日内到账，请耐心等待
                      </Text>
                    </View>
                  </Accordion.Panel>
                  <Accordion.Panel header="提现方式有哪些？">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        提现方式暂时仅支持提现到绑定的微信账户，后续会增加更多的提现方式哦。
                      </Text>
                    </View>
                  </Accordion.Panel>
                  <Accordion.Panel header="为什么提现到微信失败？">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        提现到微信需要在微信完成实名认证，并绑定银行卡哦，请完成以上两步后再次尝试提现。若仍然失败，请点击下方“我要反馈”，有客服人员为您处理。
                      </Text>
                    </View>
                  </Accordion.Panel>
                  <Accordion.Panel header="获取现金的方式有哪些？">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        注册即可获得新手红包，邀请好友更可获得大额现金红包哦！
                      </Text>
                    </View>
                  </Accordion.Panel>
                </Accordion>
              </View>
            </View>
          </View>

          {/* 邀请好友问题 */}
          <View style={{backgroundColor: '#fff'}}>
            {/* 标题 */}
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: '#F5F5F5',
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}>
                  <View style={{width: 30}}>
                    <Icon
                      name="user-plus"
                      type="feather"
                      size={24}
                      color="#DADADA"
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={{fontSize: 18, color: '#3E3E3E'}}>
                      邀请好友问题
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            {/* 列表 */}
            <View style={{paddingLeft: 10, paddingRight: 0}}>
              <View>
                <Accordion
                  onChange={this.onSectionChange}
                  activeSections={this.state.activeSections}>
                  <Accordion.Panel header="红包码是什么？">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        每个用户在注册之后都会对应唯一的红包码。当您的朋友填写了您的红包码后，就成为了您的好友，好友看书每天都可以为您贡献金币。
                      </Text>
                    </View>
                  </Accordion.Panel>
                </Accordion>
              </View>
              <View style={{paddingLeft: 12, paddingRight: 36}}>
                <TouchableOpacity onPress={() => this.goDetail(2)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}>
                    <Text style={{fontSize: 18, color: '#222222'}}>
                      如何邀请好友？
                    </Text>
                    <Icon
                      name="paperclip"
                      type="foundation"
                      size={16}
                      color="#DADADA"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <Accordion
                  onChange={this.onSectionChange}
                  activeSections={this.state.activeSections}>
                  <Accordion.Panel header="邀请好友奖励怎么获得？">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        邀请要有能快速获得现金奖励，活动期间每邀请一位好友即可获得4元现金，好友阅读满一定时间后发放，分三天发放。
                      </Text>
                    </View>
                  </Accordion.Panel>
                  <Accordion.Panel header="邀请好友有上限吗？">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        邀请好友数量没有上限。若发现有恶意作弊或者刷金币的行为，金币奖励将会被取消哦，同时账号也将面临被封停的防线。
                      </Text>
                    </View>
                  </Accordion.Panel>
                </Accordion>
              </View>
            </View>
          </View>

          {/* 阅读问题 */}
          <View style={{backgroundColor: '#fff'}}>
            {/* 标题 */}
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: '#F5F5F5',
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}>
                  <View style={{width: 30}}>
                    <Icon
                      name="book-open"
                      type="feather"
                      size={26}
                      color="#DADADA"
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={{fontSize: 18, color: '#3E3E3E'}}>
                      阅读问题
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            {/* 列表 */}
            <View style={{paddingLeft: 10, paddingRight: 0}}>
              <View style={{paddingLeft: 12, paddingRight: 36}}>
                <TouchableOpacity onPress={() => this.goDetail(3)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}>
                    <Text style={{fontSize: 18, color: '#222222'}}>
                      如何对阅读器界面进行调整？
                    </Text>
                    <Icon
                      name="paperclip"
                      type="foundation"
                      size={16}
                      color="#DADADA"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <Accordion
                  onChange={this.onSectionChange}
                  activeSections={this.state.activeSections}>
                  <Accordion.Panel header="为什么连载小说还没有更新？">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        连载小说的更新时间取决于作者，一般会在2-4天内更新。如果遇到作者一星期以上没有更新，请点击下方“我要反馈”按钮，对问题进行反馈，感谢您的支持。
                      </Text>
                    </View>
                  </Accordion.Panel>
                </Accordion>
              </View>
              <View style={{paddingLeft: 12, paddingRight: 36}}>
                <TouchableOpacity onPress={() => this.goDetail(4)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}>
                    <Text style={{fontSize: 18, color: '#222222'}}>
                      如何开启听书功能？
                    </Text>
                    <Icon
                      name="paperclip"
                      type="foundation"
                      size={16}
                      color="#DADADA"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{paddingLeft: 12, paddingRight: 36}}>
                <TouchableOpacity onPress={() => this.goDetail(5)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}>
                    <Text style={{fontSize: 18, color: '#222222'}}>
                      重装APP之后如何找回之前书架上的书？
                    </Text>
                    <Icon
                      name="paperclip"
                      type="foundation"
                      size={16}
                      color="#DADADA"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <Accordion
                  onChange={this.onSectionChange}
                  activeSections={this.state.activeSections}>
                  <Accordion.Panel header="如何导入本地书籍？">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        在“书架”点击右上角选型图标（三个点）,选择“导入书籍”即可。
                      </Text>
                    </View>
                  </Accordion.Panel>
                </Accordion>
              </View>
            </View>
          </View>

          {/* 特权问题 */}
          <View style={{backgroundColor: '#fff'}}>
            {/* 标题 */}
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: '#F5F5F5',
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}>
                  <View style={{width: 30}}>
                    <Icon
                      name="award"
                      type="feather"
                      size={24}
                      color="#DADADA"
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={{fontSize: 18, color: '#3E3E3E'}}>
                      特权问题
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            {/* 列表 */}
            <View style={{paddingLeft: 10, paddingRight: 0}}>
              <View>
                <Accordion
                  onChange={this.onSectionChange}
                  activeSections={this.state.activeSections}>
                  <Accordion.Panel header="我已经付款了，为什么特权状态还没有开通？">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        在您付费后，系统需要一段时间计收您的支付信息，成功后方可为您开启特权状态，请您耐心等待。若付款后10分钟内标识任然美欧点亮，请退出账号重新登录进行尝试，或联系客服QQ:3598987377
                      </Text>
                    </View>
                  </Accordion.Panel>
                  <Accordion.Panel header="我购买了2次特权会怎么样？">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        同一个账号购买两次特权，特权时长将会根据您购买的时长进行延顺，您可以通过查看特权到期时间的方式进行核实。
                      </Text>
                    </View>
                  </Accordion.Panel>
                </Accordion>
              </View>
            </View>
          </View>

          {/* 版权问题 */}
          <View style={{backgroundColor: '#fff'}}>
            {/* 标题 */}
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: '#F5F5F5',
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}>
                  <View style={{width: 30}}>
                    <Icon
                      name="bookmark"
                      type="feather"
                      size={24}
                      color="#DADADA"
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={{fontSize: 18, color: '#3E3E3E'}}>
                      版权问题
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            {/* 列表 */}
            <View style={{paddingLeft: 10, paddingRight: 0}}>
              <View style={{paddingLeft: 12, paddingRight: 36}}>
                <TouchableOpacity onPress={() => this.goDetail(6)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}>
                    <Text style={{fontSize: 18, color: '#222222'}}>
                      版权声明
                    </Text>
                    <Icon
                      name="paperclip"
                      type="foundation"
                      size={16}
                      color="#DADADA"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* 其他问题 */}
          <View style={{backgroundColor: '#fff'}}>
            {/* 标题 */}
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: '#F5F5F5',
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}>
                  <View style={{width: 30}}>
                    <Icon
                      name="help-circle"
                      type="feather"
                      size={26}
                      color="#DADADA"
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={{fontSize: 18, color: '#3E3E3E'}}>
                      其他问题
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            {/* 列表 */}
            <View style={{paddingLeft: 10, paddingRight: 0}}>
              <View>
                <Accordion
                  onChange={this.onSectionChange}
                  activeSections={this.state.activeSections}>
                  <Accordion.Panel header="如何更改注册的手机号/微信号？">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        更新到最新版本后（安装4及以上版本，iOS2.3及以上版本），可在我的-设置-账号管理页面，进行手机号和微信号的绑定、换绑操作。
                      </Text>
                    </View>
                  </Accordion.Panel>
                  <Accordion.Panel header="其他内容问题">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        若有其他内容问题，如章节缺失，顺序错乱等，请点击下方“我要反馈”，将您遇到的问题描述详细，并提供完整的书名、具体章节、系统提示文案和对应截图给我们，我梦将为您跟进处理。
                      </Text>
                    </View>
                  </Accordion.Panel>
                  <Accordion.Panel header="遇到APP频繁闪退的情况怎么办？">
                    <View
                      style={{
                        paddingLeft: 12,
                        paddingRight: 30,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{fontSize: 16, color: '#676767'}}>
                        若遇到APP频率卡死、闪退的情况，请前往手机系统>设置>应用管理>七猫免费小说>找到“清除缓存”的选型，清除缓存后再使用，或尝试卸载应用后前往应用商店重新安装。若以上两种方式仍未解决问题，请联系客服QQ：3598987377
                      </Text>
                    </View>
                  </Accordion.Panel>
                </Accordion>
              </View>
            </View>
          </View>

          {/* 占位 */}
          <View style={{paddingTop: 50}} />
        </ScrollView>

        <View style={{position: 'absolute', bottom: 0, left: 0, width: width}}>
          <LinearGradient
            colors={['#FFB129', '#FF9108']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            style={styles.linearGradient}>
            <TouchableOpacity
              onPress={() => this.goTarget('FeedbackAdd')}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 12,
                paddingBottom: 12,
                borderRadius: 25,
              }}>
              <Icon name="edit" type="feather" size={20} color="#fff" />
              <Text
                style={{
                  marginLeft: 10,
                  color: '#fff',
                  fontSize: 16,
                  backgroundColor: 'transparent',
                }}>
                我要反馈
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F5F5F5',
  },
  linearGradient: {},
});

export default Help;
