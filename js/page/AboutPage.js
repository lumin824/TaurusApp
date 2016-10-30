import React, { Component } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

class P extends Component {
  render(){
    return (<View>
      <Text style={{marginHorizontal:10,lineHeight:20}}>　　校安通家校互动平台，是一款专注于家校沟通的免费只能手机APP。产品秉承简洁、灵活、易用的研发理念，可为各类学校快速提供功能强大的家校互动能力，包括校园新闻、班级通知、讨论组、班级圈子、考勤签到、在线缴费等诸多实用功能。所有已开放的功能真正完全免费，无使用限制，无隐性收费，是替代上一代校讯通的最佳选择。</Text>
      <Text style={{marginHorizontal:10,marginTop:10}}>咨询电话：18262583999</Text>
      <Text style={{marginHorizontal:10,marginTop:10}}>公司网址：http://www.sxxat.com</Text>
      <Text style={{marginHorizontal:10,marginTop:10}}>官服ＱＱ：137150847</Text>
      <Text style={{marginHorizontal:10,marginTop:10}}>当前版本：1.0.0</Text>

      <TouchableOpacity style={{
          alignItems:'center', justifyContent:'center',
          backgroundColor: '#d0e4db',
          borderWidth:1, borderColor:'#3d9679',
          borderRadius:5,
          marginHorizontal:15, marginTop:20,
        }} onPress={()=>Actions.terms()}>
        <Text style={{color:'#0b5c3b',fontSize:18, margin:10}}>服务协议</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{
          alignItems:'center', justifyContent:'center',
          backgroundColor: '#d0e4db',
          borderWidth:1, borderColor:'#3d9679',
          borderRadius:5,
          marginHorizontal:15, marginTop:10,
        }} onPress={()=>Actions.secret()}>
        <Text style={{color:'#0b5c3b',fontSize:18, margin:10}}>隐私条款</Text>
      </TouchableOpacity>

    </View>)
  }
}

export default P;
