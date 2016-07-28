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

        <TouchableOpacity style={{
            height:45, marginTop:20,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={Actions.about}>
            <View style={{justifyContent:'center', marginLeft:10}}>
              <IconFont name="home" style={{backgroundColor:'transparent'}} size={20} color="#BABABA" />
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>李海荣</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:20,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={Actions.about}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>帐号与安全</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={Actions.about}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>新消息通知</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={Actions.about}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>关于校安通</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={Actions.about}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>意见与反馈</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>

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
  state=>state.loginForm
)(P);
