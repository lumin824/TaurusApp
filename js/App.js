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
      let color = this.props.selected ? '#18B4ED' : '#B3B3B3';
        return (
          <View style={{alignItems:'center'}}>
            <IconFont name={iconName} style={{backgroundColor:'transparent'}} size={24} color={color} />
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
          <IconFont name='back' size={20} color='#fff' />
        </View>
      </TouchableOpacity>
    );
  }
}

const ConnectedRouter = connect()(Router);

const getSceneStyle = (props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#f1f1f1',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : Platform.select({ios: 64, android: 54});
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

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
        navigationBarStyle={{backgroundColor:'#18B4ED'}}
        titleStyle={{color:'#fff'}}
        >
        <Scene key='login' component={page.LoginPage} hideNavBar={true} hideTabBar={true} title='登录' type='reset' />
        <Scene key='main' tabs={true} type='replace' tabBarStyle={{backgroundColor:'#fff'}}>
          <Scene key='home' component={page.HomePage} title='学校' getTitle={()=>this.props.student.schoolName} icon={TabIcon} iconName='home' activeIconName='homefill' />
          <Scene key='messageTypeList' component={page.MessageTypeListPage} title='消息' icon={TabIcon} iconName='message' activeIconName='messagefill' />
          <Scene key='contactList' component={page.ContactListPage} title='联系人' icon={TabIcon} iconName='friend' activeIconName='friendfill' />
          <Scene key='profile' component={page.ProfilePage} title='我' icon={TabIcon} iconName='my' activeIconName='myfill' />
        </Scene>
        <Scene key='selectStudent' component={page.SelectStudentPage} hideNavBar={false} hideTabBar={true} title='选择学生' backButton={BackButton} />

        <Scene key='school' component={page.SchoolPage} hideNavBar={false} hideTabBar={true} title='学校简介' backButton={BackButton} />
        <Scene key='noticeList' component={page.NoticeListPage} hideNavBar={false} hideTabBar={true} title='公告通知' backButton={BackButton} />
        <Scene key='homeworkList' component={page.HomeworkListPage} hideNavBar={false} hideTabBar={true} title='家庭作业' backButton={BackButton} />
        <Scene key='homework' component={page.HomeworkPage} hideNavBar={false} hideTabBar={true} getTitle={()=>this.props.homework.name} backButton={BackButton} />
        <Scene key='videoList' component={page.VideoListPage} hideNavBar={false} hideTabBar={true} title='视频监控' backButton={BackButton} />
        <Scene key='video' component={page.VideoPage} hideNavBar={false} hideTabBar={true} getTitle={()=>this.props.video.name} backButton={BackButton} />
        <Scene key='attenceList' component={page.AttenceListPage} hideNavBar={false} hideTabBar={true} title='视频考勤' backButton={BackButton} />
        <Scene key='attence' component={page.AttencePage} hideNavBar={false} hideTabBar={true} getTitle={()=>this.props.attence.type} backButton={BackButton} />
        <Scene key='messageList' component={page.MessageListPage} hideNavBar={false} hideTabBar={true} getTitle={()=>this.props.messageType.name} backButton={BackButton} />
        <Scene key='contact' component={page.ContactPage} hideNavBar={false} hideTabBar={true} getTitle={()=>this.props.contact.name} backButton={BackButton} />
        <Scene key='about' component={page.AboutPage} hideNavBar={false} hideTabBar={true} title='关于' backButton={BackButton}/>
    </ConnectedRouter>
    );
  }
};

const ConnectedApp = connect(state=>({
  student: _find(state.studentList.list, {id: state.studentList.selectedId}),
  homework: _find(state.homeworkList.list, {id: state.homeworkList.selectedId}),
  video: _find(state.videoList.list, {id: state.videoList.selectedId}),
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
