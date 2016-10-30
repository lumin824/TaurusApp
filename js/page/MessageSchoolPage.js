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
    this.props.action.notices({id:this.props.message.id});
  }

  render(){
    return (
      <ScrollView style={{paddingVertical:10}}>

        {function(o){
          return (<View>
            <Text style={{fontSize:18, marginHorizontal:10}}>{o.title}</Text>
            <Text style={{fontSize:14, marginHorizontal:10, marginTop:10, color:'#bbb'}}>{moment(o.start_date).format("YY年MM月DD日 hh:mm")}</Text>
            <View style={{borderTopWidth:1, borderColor:'#bbb', marginTop:10}} />
            {o.figure ? (
              <Image source={{uri:o.figure}} style={{width:200,height:200, marginTop:10}} />
            ):null}
            <Text style={{marginTop:10,marginHorizontal:10,fontSize:16}}>{o.content}</Text>

          </View>);
        }(this.props.message)}

      </ScrollView>
    )
  }
}

export default connect(
  state=>{
    let message;
    if(state.messageList.dataset=='student'){
      let sid = state.studentList.selectedId;
      let student = _find(state.studentList.list, {id:sid});
      message = _find(student.noticeList.list, {id:state.noticeList.schoolId});
    }
    else{
      message = _find(state.messageList.list, {id:state.messageList.schoolId});
    }
    return {
      message
    }
  },
  dispatch=>({
    action: bindActionCreators({
      notices: action.notices
    }, dispatch)})
)(P);
