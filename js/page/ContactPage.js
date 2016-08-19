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
  componentDidMount(){
  }
  render(){
    return (
      <View style={{paddingVertical:10}}>

        <Text>{this.props.contact.name}</Text>
        <Text>{this.props.contact.phone}</Text>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={{flex:1, borderWidth:1, margin:5, alignItems:'center'}}>
            <Text style={{marginVertical:10}}>打电话</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1, borderWidth:1, margin:5, alignItems:'center'}}>
            <Text style={{marginVertical:10}}>发短信</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


export default connect(
  state=>({
    selectedId: state.contactList.selectedId,
    contact: _find(state.contactList.list, {id: state.contactList.selectedId})
  }),
  dispatch=>({
    action: bindActionCreators({
    }, dispatch)})
)(P);
