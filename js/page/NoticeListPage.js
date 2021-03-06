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

import _find from 'lodash/find';
import moment from 'moment';

import IconFont from '../IconFont';
import action from '../action';

class P extends Component {

  componentDidMount(){
    let { sid } = this.props;
    if(this.props.page == 0){
      this.props.action.noticesList({sid,page_no:1,page_size:10});
    }
  }

  onRefresh(){
    let { sid } = this.props;
    this.props.action.noticesList({sid,page_no:1,page_size:10});
  }
  onMore(){
    let { sid } = this.props;
    this.props.action.noticesList({sid,page_no:this.props.page+1,page_size:10});
  }

  onPressItem(type, id){
    if(type == '1'){
      this.props.action.selectMessageSchool({id, dataset:'student'});
      Actions.messageSchool();
    }else if(type == '2'){
      this.props.action.selectMessageClass({id, dataset:'student'});
      Actions.messageClass();
    }
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
              flexDirection:'row'}} onPress={()=>this.onPressItem(o.type, o.id)}>
              <View style={{justifyContent:'center'}}>
                <View style={{width:60, height:60, borderRadius:30, backgroundColor:o.typeBackgroundColor, alignItems:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:20,backgroundColor:'transparent'}}>{o.typeShortName}</Text>
                </View>
              </View>
              <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
                <Text style={{fontSize:20, color:'#505050'}}>{o.title}</Text>
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
    let noticeList = student.noticeList || {};

    if(noticeList.list){
      noticeList.list = noticeList.list.map(o=>{
        let type = _find(state.noticeList.typeList, {id:o.type});
        return {
          ...o,
          typeBackgroundColor: type.backgroundColor,
          typeShortName: type.shortName
        }
      });
    }
    return {
      sid,
      list: noticeList.list || [],
      loading: noticeList.loading|| false,
      page: noticeList.page||0,
      over: noticeList.over||false,
    }
  },
  dispatch=>({
    action: bindActionCreators({
      noticesList: action.noticesList,
      selectMessageSchool: action.selectMessageSchool,
      selectMessageClass: action.selectMessageClass
    }, dispatch)})
)(P);
