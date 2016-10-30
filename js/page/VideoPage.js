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
import Toast from 'react-native-toast';

import _find from 'lodash/find';

import IconFont from '../IconFont';
import action from '../action';
import { Hik } from 'react-native-hik';

class P extends Component {

  componentDidMount(){
    this.props.action.video({id:this.props.message.id});
  }
  render(){
    return (
      <ScrollView style={{paddingVertical:10}}>
        <Text>{this.props.message.name}</Text>
        <Hik style={{width:100, height:100}} config={{
            ...this.props.message,
            password:'xat123456'
          }} onError={e=>Toast.showShortBottom(e)} />
      </ScrollView>
    )
  }
}


export default connect(
  state=>{

    let message;
    if(state.videoList.dataset=='student'){
      let sid = state.studentList.selectedId;
      let student = _find(state.studentList.list, {id:sid});
      message = _find(student.videoList.list, {id:state.videoList.selectedId});
    }
    else{
      message = {name:'dataset is null'};//_find(state.messageList.homeworkList, {id:state.videoList.videoId});
    }

    return {
      message
    }
  },
  dispatch=>({
    action: bindActionCreators({
      video: action.video
    }, dispatch)})
)(P);
