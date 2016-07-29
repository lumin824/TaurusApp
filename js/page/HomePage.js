import React, { Component } from 'react';
import {
  Image,
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
        <View style={{height:180,alignItems:'center',justifyContent:'center'}}>
          <Text>BANNER</Text>
        </View>

        <TouchableOpacity style={{
            height:45, marginTop:10,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={Actions.selectStudent}>
            <View style={{flex:1,justifyContent:'center', alignItems:'center', marginLeft:15}}>
              <Text style={{fontSize:15,color:'#000'}}>{this.props.student.name}</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>

        <View style={{marginTop:10}}>
          <View style={{flexDirection:'row',flexWrap:'wrap', justifyContent:'flex-start', paddingHorizontal:this.props.padding}}>
              <TouchableOpacity
                 style={{borderRadius:5, height:this.props.cellWidth, width:this.props.cellWidth, margin:this.props.padding, alignItems:'center', backgroundColor:'#1abc9c'}}
                  onPress={()=>Actions.school()}>
                <IconFont name='cascades' style={{backgroundColor:'transparent', marginTop:15}} size={30} color='#fff' />
                <Text style={{fontSize:16, marginTop:5, color:'#fff'}}>学校简介</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={{borderRadius:5, height:this.props.cellWidth, width:this.props.cellWidth, margin:this.props.padding, alignItems:'center', backgroundColor:'#f1c40f'}}
                  onPress={()=>Actions.noticeList()}>
                <IconFont name='notice' style={{backgroundColor:'transparent', marginTop:15}} size={30} color='#fff' />
                <Text style={{fontSize:16, marginTop:5, color:'#fff'}}>消息通知</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={{borderRadius:5, height:this.props.cellWidth, width:this.props.cellWidth, margin:this.props.padding, alignItems:'center', backgroundColor:'#e74c3c'}}
                  onPress={()=>Actions.homeworkList()}>
                <IconFont name='copy' style={{backgroundColor:'transparent', marginTop:15}} size={30} color='#fff' />
                <Text style={{fontSize:16, marginTop:5, color:'#fff'}}>家庭作业</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={{borderRadius:5, height:this.props.cellWidth, width:this.props.cellWidth, margin:this.props.padding, alignItems:'center', backgroundColor:'#3498db'}}
                  onPress={()=>Actions.videoList()}>
                <IconFont name='video' style={{backgroundColor:'transparent', marginTop:15}} size={30} color='#fff' />
                <Text style={{fontSize:16, marginTop:5, color:'#fff'}}>视频监控</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={{borderRadius:5, height:this.props.cellWidth, width:this.props.cellWidth, margin:this.props.padding, alignItems:'center', backgroundColor:'#9b59b6'}}
                  onPress={()=>Actions.attenceList()}>
                <IconFont name='camera' style={{backgroundColor:'transparent', marginTop:15}} size={30} color='#fff' />
                <Text style={{fontSize:16, marginTop:5, color:'#fff'}}>视频考勤</Text>
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
      student: _find(state.studentList.list, {id: state.studentList.selectedId})
    }
  },dispatch=>({
    action: bindActionCreators({
      setAppWidth: action.setAppWidth
    }, dispatch)})
)(P);
