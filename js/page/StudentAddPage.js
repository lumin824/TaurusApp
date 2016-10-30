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
import Toast from 'react-native-toast';

import _find from 'lodash/find';
import moment from 'moment';

import IconFont from '../IconFont';
import action from '../action';

class P extends Component {

  constructor(props){
    super(props);
    this.state = {
      phone: props.phone,
      password: props.password
    };
  }

  componentDidMount(){
    this.props.action.studentRelatedList();
    //this.props.action.studentAppliedList();
  }

  componentWillReceiveProps(nextProps){

  }

  onPressAssociate(student_id){
    this.props.action.studentAssociate({student_id}).then(action=>{
      let msg = action.error
                ? action.payload.message || '绑定失败'
                : '绑定成功';
      Toast.showShortBottom(msg);
    });
  }

  onPressSubmit(){
    let { phone, password } = this.state;
    this.props.action.register({
      phone, password
    }).then(action=>{

      let msg = action.error
                ? action.payload.message || '注册失败'
                : '注册成功';
      Toast.showShortBottom(msg);

      if(!action.error){ Actions.pop() }
    });
  }

  render(){
    return (
      <View style={{flex:1, backgroundColor:'#fdfbf8'}}>
        <View style={{marginTop:40, flexDirection:'row'}}>
          <TouchableOpacity style={{marginLeft:15,width:100}} onPressIn={()=>Actions.pop()}>
            <IconFont name='close' size={28} color='#b2b2b2' />
          </TouchableOpacity>
          <View style={{flex:1, alignItems:'center'}}>
            <Text style={{color:'#094c31',fontSize:20,fontFamily:this.props.fontFamily}}>申请绑定</Text>
          </View>
          <View style={{width:100}}>
          </View>
        </View>


        <View>
          <Text>系统根据您的注册手机号自动帮你匹配如下学生，请点击确认绑定，实现绑定管理</Text>
        </View>

        {this.props.relatedList.map(o=>(
          <TouchableOpacity key={o.id} style={{
              height:100,
              borderBottomWidth:1, marginHorizontal:10,borderColor:'#e6e6e6',
              flexDirection:'row'}} onPress={()=>this.onPressAssociate(o.id)}>
              <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
                <Text style={{fontSize:20, color:'#505050'}}>{o.name}</Text>
                <Text style={{fontSize:14, color:'#939393'}}>{o.class_name}</Text>
              </View>
              <View style={{justifyContent:'center', marginRight:15}}>
                <Text style={{fontSize:16, color:o.stateColor}}>点击绑定</Text>
              </View>
          </TouchableOpacity>
        ))}


      </View>
    );
  }
}

export default connect(
  state=>({
    relatedList: state.studentList.relatedList,
    appliedList: state.studentList.appliedList,
    fontFamily: state.env.fontFamily
  }),
  dispatch=>({
    action: bindActionCreators({
      studentRelatedList: action.studentRelatedList,
      studentAppliedList: action.studentAppliedList,
      studentAssociate: action.studentAssociate
    }, dispatch)})
)(P);
