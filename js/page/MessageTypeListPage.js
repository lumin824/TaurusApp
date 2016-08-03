import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import IconFont from '../IconFont';
import action from '../action';

class P extends Component {
  render(){
    return (
      <View style={{marginTop:10, marginHorizontal:10}}>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={{flex:1, alignItems:'center'}} onPress={()=>{this.props.action.selectMessageType('1');Actions.messageList()}}>
            <View
              style={{
                alignItems:'center', justifyContent:'center',
                width:90, height:90, borderRadius:50,
                backgroundColor:'#f1e0ad'}}>
              <Text style={{fontSize:28,backgroundColor:'transparent'}}>校</Text>
            </View>
            <Text style={{fontSize:18, marginTop:10}}>学校通知</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1, alignItems:'center'}} onPress={()=>{this.props.action.selectMessageType('2');Actions.messageList()}}>
            <View
              style={{
                alignItems:'center', justifyContent:'center',
                width:90, height:90, borderRadius:50,
                backgroundColor:'#cdf5e8'}}>
              <Text style={{fontSize:28,backgroundColor:'transparent'}}>班</Text>
            </View>
            <Text style={{fontSize:18, marginTop:10}}>班级通知</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1, alignItems:'center'}} onPress={()=>{this.props.action.selectMessageType('3');Actions.messageList()}}>
            <View
              style={{
                alignItems:'center', justifyContent:'center',
                width:90, height:90, borderRadius:50,
                backgroundColor:'#d4eef3'}}>
              <Text style={{fontSize:28,backgroundColor:'transparent'}}>作</Text>
            </View>
            <Text style={{fontSize:18, marginTop:10}}>家庭作业</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row', marginTop:20}}>
          <TouchableOpacity style={{flex:1, alignItems:'center'}} onPress={()=>{this.props.action.selectMessageType('4');Actions.messageList()}}>
            <View
              style={{
                alignItems:'center', justifyContent:'center',
                width:90, height:90, borderRadius:50,
                backgroundColor:'#cfe3db'}}>
              <Text style={{fontSize:28,backgroundColor:'transparent'}}>勤</Text>
            </View>
            <Text style={{fontSize:18, marginTop:10}}>考勤通知</Text>
          </TouchableOpacity>
          <View style={{flex:1}}>
          </View>
          <View style={{flex:1}}>
          </View>
        </View>
      </View>
    )
  }
}

export default connect(
  state=>({
    list: state.messageList.typeList
  }),
  dispatch=>({
    action: bindActionCreators({
      selectMessageType: action.selectMessageType
    }, dispatch)})
)(P);
