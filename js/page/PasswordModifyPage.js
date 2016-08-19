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
    let { oldPassword, password } = this.state;
    return !oldPassword || !password;
  }

  onPressSubmit(){
    let { oldPassword, password } = this.state;
    this.props.action.passwordModify({
      old_password:oldPassword, new_password:password
    }).then(action=>{

      let msg = action.error
                ? action.payload.message || '密码修改失败'
                : '密码修改成功';
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
            <Text style={{color:'#094c31',fontSize:20,fontFamily:this.props.fontFamily}}>{this.props.title}</Text>
          </View>
          <View style={{width:100}}>
          </View>
        </View>

        <View style={{marginTop:35,marginHorizontal:30}}>
          <Text style={{color:'#a5a5a5',fontSize:16,fontFamily:this.props.fontFamily}}>旧密码</Text>
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
            }} onChangeText={oldPassword=>this.setState({oldPassword})} placeholder='请输入旧密码' secureTextEntry={true} />
        </View>

        <View style={{marginTop:10,marginHorizontal:30}}>
          <Text style={{color:'#a5a5a5',fontSize:16,fontFamily:this.props.fontFamily}}>新密码</Text>
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
            }} onChangeText={password=>this.setState({password})} placeholder='请输入新密码' secureTextEntry={true} />
        </View>

        <View style={{marginTop:10,marginHorizontal:30}}>
          <Text style={{color:'#a5a5a5',fontSize:16,fontFamily:this.props.fontFamily}}>确认新密码</Text>
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
            }} onChangeText={password2=>this.setState({password2})} placeholder='请确认新密码' secureTextEntry={true} />
        </View>

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
    fontFamily: state.env.fontFamily
  }),
  dispatch=>({
    action: bindActionCreators({
      passwordModify: action.passwordModify
    }, dispatch)})
)(P);
