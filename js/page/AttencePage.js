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
        <Text>{this.props.attence.type}</Text>
        <Text>{this.props.attence.place}</Text>
        <Text>{this.props.attence.date}</Text>
      </ScrollView>
    )
  }
}


export default connect(
  state=>({
    attence: _find(state.attenceList.list, {id: state.attenceList.selectedId})
  }),
  dispatch=>({
    action: bindActionCreators({
    }, dispatch)})
)(P);
