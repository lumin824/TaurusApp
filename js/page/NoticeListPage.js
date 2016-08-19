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
import moment from 'moment';

import IconFont from '../IconFont';
import action from '../action';

class P extends Component {

  componentDidMount(){
    let { sid } = this.props;
    this.props.action.noticesList({sid});
  }
  render(){
    return (
      <ScrollView style={{flex:1,paddingVertical:10}}>
        {this.props.list.map(o=>(
          <TouchableOpacity key={o.id} style={{
              height:100,
              borderBottomWidth:1, marginHorizontal:10,borderColor:'#e6e6e6',
              flexDirection:'row'}} onPress={()=>{this.props.action.selectContact(o.id);Actions.contact()}}>
              <View style={{justifyContent:'center'}}>
                <View style={{width:60, height:60, borderRadius:30, backgroundColor:o.typeBackgroundColor, alignItems:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:20,backgroundColor:'transparent'}}>{o.typeShortName}</Text>
                </View>
              </View>
              <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
                <Text style={{fontSize:20, color:'#505050'}}>{o.title}</Text>
                <Text style={{fontSize:14, color:'#939393'}}>{moment(o.timestamp).format("YY年MM月DD日 hh:mm")}</Text>
              </View>

          </TouchableOpacity>
        ))}

      </ScrollView>
    )
  }
}

export default connect(
  state=>{

    let list = state.noticeList.list.map(o=>{
      //let s = _find(state.noticeList.stateList, {id:o.stateId});
      let type = _find(state.noticeList.typeList, {id:o.type});
      return {
        ...o,
        typeBackgroundColor: type.backgroundColor,
        typeShortName: type.shortName
      }
    });
    return {
      sid: state.studentList.selectedId,
      list
    }
  },
  dispatch=>({
    action: bindActionCreators({
      noticesList: action.noticesList
    }, dispatch)})
)(P);
