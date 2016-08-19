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

import _filter from 'lodash/filter';

import IconFont from '../IconFont';
import action from '../action';

class P extends Component {

  componentDidMount(){
    this.props.action.contactList();
  }
  render(){
    return (
      <View style={{flex:1}}>
        <View
          style={{height:50,flexDirection:'row', marginHorizontal:10, borderBottomWidth:1, borderColor:'#d0d0d0'}}>
          {this.props.typeList.map((o,i)=>(
            <TouchableOpacity key={i}
              style={{
                height:50, width:80, alignItems:'center', justifyContent:'center',
                borderColor:'#3d9679',
                borderBottomWidth: o.id == this.props.selectedTypeId ? 2 : 0}}
              onPress={()=>this.props.action.selectContactType(o.id)}>
              <Text style={{fontSize:16, color: o.id == this.props.selectedTypeId ? '#303131' : '#a7a7a7'}}>{o.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <ScrollView style={{flex:1,paddingVertical:10}}>
          {this.props.list.map((o,i)=>(
            <TouchableOpacity key={o.id+i} style={{
                height:100,
                borderBottomWidth:1, marginHorizontal:10,borderColor:'#e6e6e6',
                flexDirection:'row'}} onPress={()=>{this.props.action.selectContact(o.id);Actions.contact()}}>
                <View style={{justifyContent:'center'}}>
                  <View style={{width:60, height:60, borderRadius:30, backgroundColor:'#f00'}}></View>
                </View>
                <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
                  <Text style={{fontSize:20, color:'#505050'}}>{o.name} <Text style={{fontSize:14, color:'#939393'}}>{o.remark}</Text></Text>
                  <Text style={{fontSize:14, color:'#939393'}}>{o.phone}</Text>
                </View>

            </TouchableOpacity>
          ))}

        </ScrollView>
      </View>
    )
  }
}

export default connect(
  state=>({
    typeList: state.contactList.typeList,
    selectedTypeId: state.contactList.typeId,
    list: _filter(state.contactList.list,{type:state.contactList.typeId})
  }),
  dispatch=>({
    action: bindActionCreators({
      contactList: action.contactList,
      selectContactType: action.selectContactType,
      selectContact: action.selectContact
    }, dispatch)})
)(P);
