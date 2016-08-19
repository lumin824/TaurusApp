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

import IconFont from '../IconFont';
import action from '../action';

class P extends Component {
  componentDidMount(){
    let sid = this.props.sid;
    this.props.action.homeworkList({sid});
  }
  render(){
    return (
      <ScrollView style={{paddingVertical:10}}>
        {this.props.list.map(o=>(
          <TouchableOpacity key={o.id} style={{
              height:45, marginTop:1,
              flexDirection:'row',
              backgroundColor:'#fff'}} onPress={()=>{this.props.action.selectHomework(o.id);Actions.homework()}}>
              <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
                <Text style={{fontSize:15, color:'#000'}}>{o.course}</Text>
              </View>

              <View>
                <Text>{moment(o.start_date).format("YY年MM月DD日 hh:mm")}~{moment(o.end_date).format("YY年MM月DD日 hh:mm")}</Text>
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
  state=>({
    sid: state.studentList.selectedId,
    list: state.homeworkList.list
  }),
  dispatch=>({
    action: bindActionCreators({
      selectHomework: action.selectHomework,
      homeworkList: action.homeworkList
    }, dispatch)})
)(P);
