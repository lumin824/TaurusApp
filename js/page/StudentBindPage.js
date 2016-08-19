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

import IconFont from '../IconFont';
import action from '../action';

class P extends Component {

  constructor(props){
    super(props);
    this.state = {
    };
  }

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps){

  }

  isDisabledSubmit(){
    return false;
    let { phone, password } = this.state;
    return !phone || !password;
  }

  onPressSubmit(){
    let { selectedClass } = this.props;
    let { student_name } = this.state;
    if(!selectedClass) return;
    let class_id = selectedClass.id;
    this.props.action.studentApply({
      class_id, student_name
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

        <View style={{marginTop:35,marginHorizontal:30}}>
          <Text style={{color:'#a5a5a5',fontSize:16,fontFamily:this.props.fontFamily}}>昵称</Text>
        </View>
        <View style={{
            height:40,
            borderBottomWidth:1, borderColor:'#f0eeeb',
            //borderTopLeftRadius:5, borderTopRightRadius:5,
            marginHorizontal:30,
          }}>
          <TextInput style={{
              flex:1, color:'#505050',
              marginHorizontal:10,
              backgroundColor:'transparent'
            }} onChangeText={student_name=>this.setState({student_name})} placeholder='请输入学生名称' />
        </View>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={()=>Actions.selectSchool()}>
            <View style={{width:50,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15, color:'#000'}}>学校</Text>
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15, color:'#000'}}>{this.props.selectedSchool ? this.props.selectedSchool.name : '请选择学校'}</Text>
            </View>

            <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={()=>Actions.selectGrade()} >
            <View style={{width:50,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15, color:'#000'}}>年级</Text>
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15, color:'#000'}}>{this.props.selectedGrade ? this.props.selectedGrade.name : '请选择年级'}</Text>
            </View>

            <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={()=>Actions.selectClass()}>
            <View style={{width:50,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15, color:'#000'}}>班级</Text>
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15, color:'#000'}}>{this.props.selectedClass ? this.props.selectedClass.name : '请选择班级'}</Text>
            </View>

            <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:50,
            alignItems:'center', justifyContent:'center',
            backgroundColor: this.isDisabledSubmit() ? '#d0e4db':'#d0e4db',
            borderWidth:1, borderColor:'#3d9679',
            borderRadius:5,
            marginHorizontal:25, marginTop:45,
          }} onPress={this.onPressSubmit.bind(this)} disabled={this.isDisabledSubmit()}>
          <Text style={{color:'#0b5c3b',fontSize:20,fontFamily:this.props.fontFamily}}>注  册</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default connect(
  state=>({
    selectedSchool: (state.bindStudentForm.schoolId ? _find(state.schoolList.list, {id:state.bindStudentForm.schoolId}) : null),
    selectedGrade: (state.bindStudentForm.gradeId ? _find(state.gradeList.list, {id:state.bindStudentForm.gradeId}) : null),
    selectedClass: (state.bindStudentForm.classId ? _find(state.classList.list, {id:state.bindStudentForm.classId}) : null),

    fontFamily: state.env.fontFamily
  }),
  dispatch=>({
    action: bindActionCreators({
      studentAdd: action.studentAdd,
      studentApply: action.studentApply
    }, dispatch)})
)(P);
