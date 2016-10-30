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
import _filter from 'lodash/filter';
import IconFont from '../IconFont';
import action from '../action';

class P extends Component {

  componentDidMount(){
    if(this.props.page == 0){
      this.props.action.monitorNoficeList({page_no:1,page_size:10});
    }
  }

  onRefresh(){
    this.props.action.monitorNoficeList({page_no:1,page_size:10});
  }
  onMore(){
    this.props.action.monitorNoficeList({page_no:this.props.page+1,page_size:10});
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
              flexDirection:'row'}} onPress={()=>{this.props.action.selectMessageMonitor({id:o.id, dataset:'account'});Actions.messageMonitor();}}>
              <View style={{justifyContent:'center'}}>
                <View style={{width:60, height:60, borderRadius:30, backgroundColor:o.typeBackgroundColor, alignItems:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:20,backgroundColor:'transparent'}}>{o.typeShortName}</Text>
                </View>
              </View>
              <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
                <Text style={{fontSize:20, color:'#505050'}}>{o.content}</Text>
                <Text style={{fontSize:14, color:'#939393'}}>{o.date}</Text>
              </View>
              <View style={{justifyContent:'center', marginRight:15}}>
                <Text style={{fontSize:16, color:o.stateColor}}>{o.stateName}</Text>
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
    let type = _find(state.messageList.typeList, {id:'4'});
    let list = state.messageList.monitorList.map(o=>{
      //let s = _find(state.messageList.stateList, {id:o.stateId});
      return {
        ...o,
        content: `${o.location}-${o.student_name}`,
        date: moment(o.timestamp).format("YY年MM月DD日 hh:mm"),
        typeBackgroundColor: type.backgroundColor,
        typeShortName: type.shortName,
        // stateName: s.name,
        // stateColor: s.color
      }
    });
    return {
      list,
      loading:state.messageList.monitorLoading|| false,
      page:state.messageList.monitorkPage||0,
      over:state.messageList.monitorOver||false,
    }
  },
  dispatch=>({
    action: bindActionCreators({
      selectMessageMonitor: action.selectMessageMonitor,
      monitorNoficeList: action.monitorNoficeList
    }, dispatch)})
)(P);
