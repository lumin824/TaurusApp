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

import _find from 'lodash/find';

import IconFont from '../IconFont';
import action from '../action';

class P extends Component {
  render(){
    return (
      <View>
        <View style={{height:180,alignItems:'center',justifyContent:'center'}}>
          <Text>BANNER</Text>
        </View>

        <TouchableOpacity style={{
            height:45, marginTop:10,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={Actions.selectStudent}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15,color:'#000'}}>{this.props.student.name}</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:5}}>
              <Text style={{fontSize:15,color:'#888'}}>切换</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>

        <View style={{marginTop:10}}>
          <View style={{flexDirection:'row',flexWrap:'wrap', justifyContent:'flex-start'}}>
              <TouchableOpacity
                 style={{borderWidth:1, borderRadius:5, height:80, margin:5, borderColor:'#888', width:80}}
                  onPress={()=>Actions.school()}>
                <View style={{flex:1,flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:16}}>学校简介</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                  style={{borderWidth:1, borderRadius:5, height:80, margin:5, borderColor:'#888', width:80}}
                  onPress={()=>Actions.noticeList()}>
                <View style={{flex:1,flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:16}}>消息通知</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                  style={{borderWidth:1, borderRadius:5, height:80, margin:5, borderColor:'#888', width:80}}
                  onPress={()=>Actions.homeworkList()}>
                <View style={{flex:1,flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:16}}>家庭作业</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                  style={{borderWidth:1, borderRadius:5, height:80, margin:5, borderColor:'#888', width:80}}
                  onPress={()=>Actions.videoList()}>
                <View style={{flex:1,flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:16}}>视频监控</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                  style={{borderWidth:1, borderRadius:5, height:80, margin:5, borderColor:'#888', width:80}}
                  onPress={()=>Actions.attenceList()}>
                <View style={{flex:1,flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:16}}>视频考勤</Text>
                </View>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default connect(
  state=>({
    student: _find(state.studentList.list, {id: state.studentList.selectedId})
  })
)(P);
