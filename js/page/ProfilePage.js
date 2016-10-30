import React, { Component } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import IconFont from '../IconFont';

class P extends Component {
  render(){
    return (
      <View>

        <TouchableOpacity style={{alignItems:'center'}} onPress={()=>Actions.profileInfo()}>
          <View style={{width:100,height:100,borderRadius:50,backgroundColor:'#f00'}}>

          </View>
          <Text style={{marginTop:20}}>{this.props.user.username}</Text>
        </TouchableOpacity>

        <View style={{marginTop:10}}>
          <View style={{marginHorizontal:10, borderTopWidth:1, borderColor:'#d0d0d0'}} />
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity
              style={{flex:1, height:100, alignItems:'center', justifyContent:'center'}}
              >
              <Image style={{width:60,height:60}} resizeMode='contain' source={require('../../res/account_security.png')} />
              <Text style={{fontSize:18}}>账户安全</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex:1, height:100, alignItems:'center', justifyContent:'center'}}
              onPress={()=>Actions.about()}>
              <Image style={{width:60,height:60}} resizeMode='contain' source={require('../../res/about.png')} />
              <Text style={{fontSize:18}}>关于校安通</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex:1, height:100, alignItems:'center', justifyContent:'center'}}
              >
              <Image style={{width:60,height:60}} resizeMode='contain' source={require('../../res/system_notify.png')} />
              <Text style={{fontSize:18}}>系统通知</Text>
            </TouchableOpacity>
          </View>

          <View style={{marginHorizontal:10, borderTopWidth:1, borderColor:'#d0d0d0'}} />
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity
              style={{flex:1, height:100, alignItems:'center', justifyContent:'center'}}
              >
              <Image style={{width:60,height:60}} resizeMode='contain' source={require('../../res/feedback.png')} />
              <Text style={{fontSize:18}}>意见反馈</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex:1, height:100, alignItems:'center', justifyContent:'center'}}
              onPress={()=>Actions.passwordModify()}>
              <Image style={{width:60,height:60}} resizeMode='contain' source={require('../../res/feedback.png')} />
              <Text style={{fontSize:18}}>修改密码</Text>
            </TouchableOpacity>
            <View style={{flex:1, height:100, alignItems:'center', justifyContent:'center'}}>
            </View>
          </View>
        </View>

        <TouchableOpacity style={{
            height:45, marginTop:20,
            flexDirection:'row',
            marginHorizontal:15,
            backgroundColor:'#ff5e45', borderRadius:5}} onPress={Actions.login}>
            <View style={{flex:1,justifyContent:'center', alignItems:'center', marginLeft:15}}>
              <Text style={{fontSize:18, color:'#fff'}}>退出登录</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  state=>({
    user: state.loginUser
  })
)(P);
