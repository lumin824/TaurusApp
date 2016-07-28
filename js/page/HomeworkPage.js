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

import _find from 'lodash/find';

import IconFont from '../IconFont';
import action from '../action';

class P extends Component {
  render(){
    return (
      <ScrollView style={{paddingVertical:10}}>
        <Text>{this.props.homework.content}</Text>
      </ScrollView>
    )
  }
}


export default connect(
  state=>({
    homework: _find(state.homeworkList.list, {id: state.homeworkList.selectedId})
  }),
  dispatch=>({
    action: bindActionCreators({
    }, dispatch)})
)(P);
