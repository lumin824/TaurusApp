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
import _filter from 'lodash/filter';
import IconFont from '../IconFont';
import action from '../action';

class P extends Component {

  componentDidMount(){
    this.props.action.homework({id:this.props.message.id});
  }

  render(){
    return (
      <ScrollView style={{paddingVertical:10}}>

        {function(o){
          return (<View>
            <Text style={{fontSize:18, marginHorizontal:10}}>{o.course}</Text>
            <Text style={{fontSize:14, marginHorizontal:10, marginTop:10, color:'#bbb'}}>{moment(o.start_date).format("YY年MM月DD日 hh:mm")}</Text>
            <View style={{borderTopWidth:1, borderColor:'#bbb', marginTop:10}} />
            <Text style={{minHeight:300, marginTop:10,marginHorizontal:10,fontSize:16}}>{o.content}</Text>
            <View style={{borderTopWidth:1, borderColor:'#bbb'}} />
            {o.attachments && o.attachments.map((o2, i)=>(
              <TouchableOpacity key={i} style={{flexDirection:'row',borderBottomWidth:1, borderColor:'#bbb'}}
                onPress={()=>Actions.imageView({imageURL:o2.attachment})}>
                <View style={{margin:10, backgroundColor:'#63e5eb', width:60,height:60, alignItems:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:20}}>I</Text>
                </View>
                <View style={{marginVertical:10}}>
                  <Text style={{fontSize:16}}>附件 {i+1}</Text>
                  <Text style={{fontSize:14,color:'#bbb'}}>{moment(o.start_date).format("YY年MM月DD日 hh:mm")}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>);
        }(this.props.message)}

      </ScrollView>
    )
  }
}

export default connect(
  state=>{

    let message;
    if(state.messageList.dataset=='student'){
      let sid = state.studentList.selectedId;
      let student = _find(state.studentList.list, {id:sid});
      message = _find(student.homeworkList.list, {id:state.messageList.homeworkId});
    }
    else{
      message = _find(state.messageList.homeworkList, {id:state.messageList.homeworkId});
    }

    return {
      message
    }
  },
  dispatch=>({
    action: bindActionCreators({
      homework: action.homework,
    }, dispatch)})
)(P);
