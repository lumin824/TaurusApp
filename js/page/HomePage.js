import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  Slider,
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
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
          style={{flexDirection:'row', marginHorizontal:10, borderBottomWidth:1, borderColor:'#d0d0d0'}}>
          {this.props.studentList.list.map((o,i)=>(
            <TouchableOpacity key={i}
              style={{
                height:50, width:80, alignItems:'center', justifyContent:'center',
                borderColor:'#3d9679',
                borderBottomWidth: o.id == this.props.studentList.selectedId ? 2 : 0}}
              onPress={()=>this.props.action.selectStudent(o.id)}>
              <Text style={{fontSize:16, color: o.id == this.props.studentList.selectedId ? '#303131' : '#a7a7a7'}}>{o.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={{height:50, width:80, alignItems:'center', justifyContent:'center'}}
            onPress={()=>this.props.action.selectStudent(o.id)}>
            <Text style={{fontSize:16, color:'#a7a7a7'}}>添加</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={{height:200,alignItems:'center',justifyContent:'center', marginTop:10}}>
          <Image style={{height:200}} resizeMode='contain' source={require('../../res/school_logo.png')} />
        </View>



        <View style={{marginTop:10}}>
          <View style={{marginHorizontal:10, borderTopWidth:1, borderColor:'#d0d0d0'}} />
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity
              style={{flex:1, height:100, alignItems:'center', justifyContent:'center'}}
              onPress={()=>Actions.school()}>
              <Image style={{width:60,height:60}} resizeMode='contain' source={require('../../res/school.png')} />
              <Text style={{fontSize:18}}>学校简介</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex:1, height:100, alignItems:'center', justifyContent:'center'}}
              onPress={()=>Actions.noticeList()}>
              <Image style={{width:60,height:60}} resizeMode='contain' source={require('../../res/notice.png')} />
              <Text style={{fontSize:18}}>公告通知</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex:1, height:100, alignItems:'center', justifyContent:'center'}}
              onPress={()=>Actions.homeworkList()}>
              <Image style={{width:60,height:60}} resizeMode='contain' source={require('../../res/homework.png')} />
              <Text style={{fontSize:18}}>家庭作业</Text>
            </TouchableOpacity>
          </View>

          <View style={{marginHorizontal:10, borderTopWidth:1, borderColor:'#d0d0d0'}} />
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity
              style={{flex:1, height:100, alignItems:'center', justifyContent:'center'}}
              onPress={()=>Actions.videoList()}>
              <Image style={{width:60,height:60}} resizeMode='contain' source={require('../../res/video.png')} />
              <Text style={{fontSize:18}}>视频监控</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex:1, height:100, alignItems:'center', justifyContent:'center'}}
              onPress={()=>Actions.videoList()}>
              <Image style={{width:60,height:60}} resizeMode='contain' source={require('../../res/video2.png')} />
              <Text style={{fontSize:18}}>视频考勤</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1, height:100, alignItems:'center', justifyContent:'center'}}>
              <Image style={{width:60,height:60}} resizeMode='contain' source={require('../../res/more.png')} />
              <Text style={{fontSize:18}}>敬请期待</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default connect(
  state=>{
    let minCellWidth = 80, maxCellWidth = 100;
    let minPaddingx2 = 2*2;
    let totalWidth = state.env.width;
    let fillWidth = totalWidth - minPaddingx2;

    let count = Math.floor(fillWidth / (minCellWidth + minPaddingx2));

    let cellWidth2 = Math.floor(fillWidth / count);
    let cellWidth = cellWidth2 - minPaddingx2;
    if(cellWidth > maxCellWidth) cellWidth = maxCellWidth;

    let padding = Math.floor((totalWidth - cellWidth * count)/(count + 1)/2);
    let leftPadding = (totalWidth - (cellWidth + padding) * count) / 2;
    return {
      totalWidth,padding,leftPadding,cellWidth,
      width:state.env.width,
      student: _find(state.studentList.list, {id: state.studentList.selectedId}),
      studentList: state.studentList
    }
  },dispatch=>({
    action: bindActionCreators({
      selectStudent: action.selectStudent
    }, dispatch)})
)(P);
