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
  constructor(props){
    super(props);
    this.updateProps(props);
  }

  componentWillReceiveProps(next){
    this.updateProps(next);
  }

  updateProps(props){
    this.props.action.schoolProfile({sid:props.sid});
  }
  render(){
    return (
      <View>
        {this.props.school ? (
          <View>
            <Text style={{fontSize:20, marginHorizontal:15, color:'#303131'}}>{this.props.school.name}</Text>
            <Text style={{fontSize:12, marginHorizontal:15, color:'#727272', marginTop:10}}>{this.props.school.profile}</Text>
          </View>
        ):null}
      </View>
    )
  }
}


export default connect(
  state=>{
    let student = _find(state.studentList.list, {id: state.studentList.selectedId});
    return {
      sid: state.studentList.selectedId,
      school: student.school
    }
  },
  dispatch=>({
    action: bindActionCreators({
      schoolProfile: action.schoolProfile
    }, dispatch)})
)(P);
