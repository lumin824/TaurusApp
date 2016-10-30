import React, { Component } from 'react';
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
      <TouchableOpacity style={{flex:1,paddingVertical:10, alignItems:'center', justifyContent:'center'}} onPress={()=>Actions.pop()}>
        {function(o){
          return (
            <View style={{height:100,
            borderWidth:1, marginHorizontal:10,borderColor:'#e6e6e6', backgroundColor:'#fdfbf8',
            flexDirection:'row'}}>
              <View style={{justifyContent:'center', marginLeft:10}}>
                <View style={{width:60, height:60, borderRadius:30, backgroundColor:'#f00'}}></View>
              </View>
              <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
                <Text style={{fontSize:20, color:'#505050'}}>{o.name}</Text>
                <Text style={{fontSize:14, color:'#939393'}}>{o.phone}</Text>
              </View>
              <TouchableOpacity style={{width:50,margin:5, alignItems:'center', justifyContent:'center'}} onPress={()=>Linking.openURL(`tel:${o.phone}`)}>
                <IconFont name='phone' size={28} color='#b2b2b2' />
              </TouchableOpacity>
              <View style={{borderLeftWidth:1,borderColor:'#bbb', marginVertical:10}}/>
              <TouchableOpacity style={{width:50, margin:5, alignItems:'center', justifyContent:'center'}} onPress={()=>Linking.openURL(`sms:${o.phone}`)}>
                <IconFont name='message' size={28} color='#b2b2b2' />
              </TouchableOpacity>
            </View>
          )
        }(this.props.contact)}
      </TouchableOpacity>
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
