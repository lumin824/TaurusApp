import React, { Component } from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-toast';

import moment from 'moment';
import _find from 'lodash/find';

import IconFont from '../IconFont';
import action from '../action';

class P extends Component {
  // componentDidMount(){
  //   let sid = this.props.sid;
  //   this.props.action.homeworkList({sid}).then(action=>{
  //     if(action.error){
  //       let msg = action.error
  //           ? action.payload.message || '查询失败'
  //           : '查询成功';
  //       Toast.showShortBottom(msg);
  //     }
  //
  //   });
  // }

  componentDidMount(){
    let { sid } = this.props;
    if(this.props.page == 0){
      this.props.action.homeworkList({sid,page_no:1,page_size:10});
    }
  }

  onRefresh(){
    let { sid } = this.props;
    this.props.action.homeworkList({sid,page_no:1,page_size:10});
  }
  onMore(){
    let { sid } = this.props;
    this.props.action.homeworkList({sid,page_no:this.props.page+1,page_size:10});
  }

  render(){
    return (
      <ScrollView style={{paddingVertical:10}} refreshControl={
          <RefreshControl refreshing={this.props.loading && this.props.page > 1} onRefresh={this.onRefresh.bind(this)} />
        }>
        {this.props.list.map(o=>(
          <TouchableOpacity key={o.id} style={{
              height:100,
              borderBottomWidth:1, marginHorizontal:10,borderColor:'#e6e6e6',
              flexDirection:'row'}} onPress={()=>{this.props.action.selectMessageHomework({id:o.id, dataset:'student'});Actions.messageHomework();}}>
              <View style={{justifyContent:'center'}}>
                <View style={{width:60, height:60, borderRadius:30, backgroundColor:'#d4eef3', alignItems:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:20,backgroundColor:'transparent'}}>作</Text>
                </View>
              </View>
              <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
                <Text style={{fontSize:20, color:'#505050'}}>{o.course}</Text>
                <Text style={{fontSize:14, color:'#939393'}}>{moment(o.start_date).format("YY年MM月DD日 hh:mm")}~{moment(o.end_date).format("YY年MM月DD日 hh:mm")}</Text>
              </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={{height:50,alignItems:'center',justifyContent:'center'}} onPress={this.onMore.bind(this)} disabled={this.props.over}>
          <Text>{this.props.over ? '没有更多数据':'点击加载更多'}</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

export default connect(
  state=>{
    let sid = state.studentList.selectedId;
    let student = _find(state.studentList.list, {id:sid});
    let list = student.homeworkList || {};

    return {
      sid,
      list: list.list || [],
      loading: list.loading|| false,
      page: list.page||0,
      over: list.over||false,
    }
  },
  dispatch=>({
    action: bindActionCreators({
      selectMessageHomework: action.selectMessageHomework,
      homeworkList: action.homeworkList
    }, dispatch)})
)(P);
