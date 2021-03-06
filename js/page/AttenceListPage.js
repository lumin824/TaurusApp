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

import moment from 'moment';
import _find from 'lodash/find';

import IconFont from '../IconFont';
import action from '../action';

class P extends Component {

  componentDidMount(){
    let { sid } = this.props;
    if(this.props.page == 0){
      this.props.action.monitorList({sid,page_no:1,page_size:10});
    }
  }

  onRefresh(){
    let { sid } = this.props;
    this.props.action.monitorList({sid,page_no:1,page_size:10});
  }
  onMore(){
    let { sid } = this.props;
    this.props.action.monitorList({sid,page_no:this.props.page+1,page_size:10});
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
              flexDirection:'row'}} onPress={()=>{this.props.action.selectMessageMonitor({id:o.id, dataset:'student'});Actions.messageMonitor();}}>
              <View style={{justifyContent:'center'}}>
                <View style={{width:60, height:60, borderRadius:30, backgroundColor:o.directionBackgroundColor, alignItems:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:20,backgroundColor:'transparent'}}>{o.directionName}</Text>
                </View>
              </View>
              <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
                <Text style={{fontSize:20, color:'#505050'}}>{o.location}</Text>
                <Text style={{fontSize:14, color:'#939393'}}>{moment(o.timestamp).format("YY年MM月DD日 hh:mm")}</Text>
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
    let list = student.monitorList || {};
    let ll = list.list || [];
    ll = ll.map(o=>{
      let direction = _find(state.attenceList.directionList, {id:o.direction});
      return {
        ...o,
        directionName: direction.name,
        directionBackgroundColor: direction.color,
      }
    });
    return {
      sid,
      list: ll,
      loading: list.loading|| false,
      page: list.page||0,
      over: list.over||false,
    }
  },
  dispatch=>({
    action: bindActionCreators({
      selectMessageMonitor: action.selectMessageMonitor,
      monitorList: action.monitorList,
    }, dispatch)})
)(P);
