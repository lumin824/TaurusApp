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

import moment from 'moment';
import _find from 'lodash/find';
import _filter from 'lodash/filter';
import IconFont from '../IconFont';
import action from '../action';

class P extends Component {

  componentDidMount(){
    this.props.action.monitor({id:this.props.message.id});
  }

  render(){
    return (
      <View style={{flex:1,paddingVertical:10}}>

        {function(o){
          return (<View style={{flex:1}}>
            <Text style={{fontSize:18, marginHorizontal:10}}>{o.location}</Text>
            <Text style={{fontSize:14, marginHorizontal:10, marginTop:10, color:'#bbb'}}>{moment(o.timestamp).format("YY年MM月DD日 hh:mm")}-{moment(o.post_timestamp).format("YY年MM月DD日 hh:mm")}</Text>
            <View style={{borderTopWidth:1, borderColor:'#bbb', marginTop:10}} />
            <Image source={{uri:o.snapshot}} style={{width:200,height:200, marginTop:10}} />
            <Image source={{uri:o.post_snapshot}} style={{width:200,height:200, marginTop:10}} />

          </View>);
        }(this.props.message)}

      </View>
    )
  }
}

export default connect(
  state=>{
    let message;
    if(state.messageList.dataset=='student'){
      let sid = state.studentList.selectedId;
      let student = _find(state.studentList.list, {id:sid});
      message = _find(student.monitorList.list, {id:state.messageList.monitorId});
    }
    else{
      message = _find(state.messageList.monitorList, {id:state.messageList.monitorId});
    }
    return {
      message
    }
  },
  dispatch=>({
    action: bindActionCreators({
      monitor: action.monitor
    }, dispatch)})
)(P);
