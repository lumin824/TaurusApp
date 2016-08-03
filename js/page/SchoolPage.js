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
  render(){
    return (
      <View>
        <Text style={{fontSize:20, marginHorizontal:15, color:'#303131'}}>{this.props.school.name}</Text>
        <Text style={{fontSize:12, marginHorizontal:15, color:'#727272', marginTop:10}}>{this.props.school.updateDate}</Text>
        <Text style={{fontSize:16, marginHorizontal:15, color:'#727272', marginTop:10}}>{this.props.school.content}</Text>

      </View>
    )
  }
}


export default connect(
  state=>{
    let student = _find(state.studentList.list, {id: state.studentList.selectedId});
    let school = _find(state.schoolList.list, {id: student.schoolId});
    return {
      school
    }
  },
  dispatch=>({
    action: bindActionCreators({
      login: action.login
    }, dispatch)})
)(P);
