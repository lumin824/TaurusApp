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

import IconFont from '../IconFont';
import action from '../action';

class P extends Component {
  componentDidMount(){
    let { sid } = this.props;
    this.props.action.attenceList({sid});
  }

  render(){
    return (
      <ScrollView style={{paddingVertical:10}}>
        {this.props.list.map(o=>(
          <TouchableOpacity key={o.id} style={{
              height:45, marginTop:1,
              flexDirection:'row',
              backgroundColor:'#fff'}} onPress={()=>{this.props.action.selectAttence(o.id);Actions.attence()}}>
              <View style={{width:50,justifyContent:'center', marginLeft:15}}>
                <Text style={{fontSize:15, color:'#000'}}>{o.directionName}</Text>
              </View>
              <View style={{width:50,justifyContent:'center', marginLeft:15}}>
                <Text style={{fontSize:15, color:'#000'}}>{o.location}</Text>
              </View>
              <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
                <Text style={{fontSize:15, color:'#000'}}>{moment(o.timestamp).format("YY年MM月DD日 hh:mm")}</Text>
              </View>

              <View style={{justifyContent:'center', marginRight:15}}>
                <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
              </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    )
  }
}

export default connect(
  state=>{

    let list = state.attenceList.list.map(o=>{
      let direction = _find(state.attenceList.directionList, {id:o.direction});
      console.log([direction, state.attenceList.directionList, o.direction]);
      return {
        ...o,
        directionName: direction.name,
      }
    });

    return {
      sid: state.studentList.selectedId,
      list
    };
  },
  dispatch=>({
    action: bindActionCreators({
      selectAttence: action.selectAttence,
      attenceList: action.attenceList
    }, dispatch)})
)(P);
