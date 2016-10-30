import React, { Component } from 'react';

import {
  BackAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { connect, Provider } from 'react-redux';
import { Scene, Router, Actions, Reducer } from 'react-native-router-flux';

import _find from 'lodash/find';

import configStore from './configStore';
import * as page from './page';
import IconFont from './IconFont';

class TabIcon extends Component {
    render(){
      let iconName = this.props.selected ? this.props.activeIconName || this.props.iconName : this.props.iconName;
      let color = this.props.selected ? '#3d9679' : '#303131';
        return (
          <View style={{alignItems:'center'}}>
            <IconFont name={iconName} style={{backgroundColor:'transparent'}} size={30} color={color} />
            <Text style={{color, fontSize:11}}>{this.props.iconText || this.props.title}</Text>
          </View>
        );
    }
}

class BackButton extends Component {
  render(){
    return (
      <TouchableOpacity style={[this.props.style,{flexDirection:'row'}]} onPress={Actions.pop}>
        <View style={{justifyContent:'center'}}>
          <IconFont name='back' size={20} color='#303131' />
        </View>
      </TouchableOpacity>
    );
  }
}

class NavBar extends Component {
  render(){
    return (
      <View style={{backgroundColor:'transparent', height:60,top:0, right:0,left:0,position:'absolute'}}>
        <View style={{marginTop:36, marginHorizontal:10}}>
          <Text style={{fontSize:20}}><Text style={{color:'#226f51'}}>SAFE/</Text><Text style={{color:'#303131'}}>校安通</Text></Text>
        </View>
      </View>
    )
  }
}

const ConnectedRouter = connect()(Router);

const extendStyle = (es) => (props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fdfbf8',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : Platform.select({ios:64,android:54});
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return {...style, ...es};
}

const getSceneStyle = extendStyle();

class App extends Component {
  constructor(props){
    super(props);
    this._handleHardwareBackPress = this.handleHardwareBackPress.bind(this);
  }

  componentDidMount(){
    BackAndroid.addEventListener('hardwareBackPress', this._handleHardwareBackPress);
  }
  componentWillUnmount(){
    BackAndroid.removeEventListener('hardwareBackPress', this._handleHardwareBackPress);
  }
  handleHardwareBackPress(){
    Actions.pop();
    return true;
  }
  render(){
    return (
      <ConnectedRouter
        getSceneStyle={getSceneStyle}
        navigationBarStyle={{backgroundColor:'#fdfbf8',borderBottomWidth:0}}
        titleStyle={{color:'#303131'}}
        >
        <Scene key='login' component={page.LoginPage} hideNavBar={true} hideTabBar={true} title='登录' type='reset' initial={true} />
        <Scene key='register' component={page.RegisterPage} hideNavBar={true} hideTabBar={true} title='注册' />
        <Scene key='main' tabs={true} type='replace' tabBarStyle={{backgroundColor:'transparent', borderTopWidth:1, marginHorizontal:10, borderColor:'#d0d0d0'}} >
          <Scene key='home' component={page.HomePage} title='学校' navBar={NavBar} icon={TabIcon} iconName='rank' />
          <Scene key='messageTypeList' component={page.MessageTypeListPage} title='消息' navBar={NavBar} icon={TabIcon} iconName='comment' />
          <Scene key='contactList' component={page.ContactListPage} title='联系人' navBar={NavBar} icon={TabIcon} iconName='addressbook' />
          <Scene key='profile' component={page.ProfilePage} title='我' navBar={NavBar} icon={TabIcon} iconName='my' />
        </Scene>
        <Scene key='selectSchool' component={page.SelectSchoolPage} hideNavBar={false} hideTabBar={true} title='选择学校' backButton={BackButton} />
        <Scene key='selectGrade' component={page.SelectGradePage} hideNavBar={false} hideTabBar={true} title='选择年级' backButton={BackButton} />
        <Scene key='selectClass' component={page.SelectClassPage} hideNavBar={false} hideTabBar={true} title='选择班级' backButton={BackButton} />

        <Scene key='school' component={page.SchoolPage} hideNavBar={false} hideTabBar={true} title='学校简介' backButton={BackButton} />
        <Scene key='noticeList' component={page.NoticeListPage} hideNavBar={false} hideTabBar={true} title='公告通知' backButton={BackButton} />

        <Scene key='homeworkList' component={page.HomeworkListPage} hideNavBar={false} hideTabBar={true} title='家庭作业' backButton={BackButton} />
        <Scene key='videoList' component={page.VideoListPage} hideNavBar={false} hideTabBar={true} title='视频监控' backButton={BackButton} />
        <Scene key='video' component={page.VideoPage} hideNavBar={false} hideTabBar={true} title='视频' backButton={BackButton} />
        <Scene key='attenceList' component={page.AttenceListPage} hideNavBar={false} hideTabBar={true} title='视频考勤' backButton={BackButton} />
        <Scene key='messageListSchool' component={page.MessageListSchoolPage} hideNavBar={false} hideTabBar={true} title='学校通知' backButton={BackButton} />
        <Scene key='messageListClass' component={page.MessageListClassPage} hideNavBar={false} hideTabBar={true} title='班级通知' backButton={BackButton} />
        <Scene key='messageListHomework' component={page.MessageListHomeworkPage} hideNavBar={false} hideTabBar={true} title='家庭作业' backButton={BackButton} />
        <Scene key='messageListMonitor' component={page.MessageListMonitorPage} hideNavBar={false} hideTabBar={true} title='考勤通知' backButton={BackButton} />

        <Scene key='messageSchool' component={page.MessageSchoolPage} hideNavBar={false} hideTabBar={true} title='学校通知' backButton={BackButton} />
        <Scene key='messageClass' component={page.MessageClassPage} hideNavBar={false} hideTabBar={true} title='学校' backButton={BackButton} />
        <Scene key='messageHomework' component={page.MessageHomeworkPage} hideNavBar={false} hideTabBar={true} title='家庭作业' backButton={BackButton} />
        <Scene key='messageMonitor' component={page.MessageMonitorPage} hideNavBar={false} hideTabBar={true} title='考勤' backButton={BackButton} />

        <Scene key='contact' component={page.ContactPage} hideNavBar={true} hideTabBar={true} backButton={BackButton} getSceneStyle={extendStyle({backgroundColor:'transparent'})} />
        <Scene key='about' component={page.AboutPage} hideNavBar={false} hideTabBar={true} title='关于' backButton={BackButton}/>
        <Scene key='studentAdd' component={page.StudentAddPage} hideNavBar={true} hideTabBar={true} title='添加学生'/>
        <Scene key='studentBind' component={page.StudentBindPage} hideNavBar={true} hideTabBar={true} title='申请绑定'/>

        <Scene key='passwordModify' component={page.PasswordModifyPage} hideNavBar={true} hideTabBar={true} title='密码修改' />
        <Scene key='profileInfo' component={page.ProfileInfoPage} hideNavBar={true} hideTabBar={true} title='个人信息' />

        <Scene key='imageView' component={page.ImageViewPage} hideNavBar={true} hideTabBar={true} title='注册' />

        <Scene key='terms' component={page.TermsPage} hideNavBar={false} hideTabBar={true} title='条款' backButton={BackButton}/>
        <Scene key='secret' component={page.SecretPage} hideNavBar={false} hideTabBar={true} title='隐私' backButton={BackButton}/>
      </ConnectedRouter>
    );
  }
};

const ConnectedApp = connect(state=>({
  homework: _find(state.homeworkList.list, {id: state.homeworkList.selectedId}),
  attence: _find(state.attenceList.list, {id: state.attenceList.selectedId}),
  messageType: _find(state.messageList.typeList, {id: state.messageList.selectedTypeId}),
  contact: _find(state.contactList.list, {id: state.contactList.selectedId})
}))(App);

class ReduxApp extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      store: configStore(()=>this.setState({isLoading:false}))
    }
  }
  render(){
    if(this.state.isLoading){
      return null;
    }

    return (
      <Provider store={this.state.store}>
        <ConnectedApp />
      </Provider>
    );
  }
}

export default ReduxApp;
