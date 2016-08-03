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

import _find from 'lodash/find';

import action from '../action';
import { Tip } from '../component';

class P extends Component {

  constructor(props){
    super(props);
    this.state = {
      phone: props.phone,
      password: props.password
    };
  }

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps){

  }

  isDisabledSubmit(){
    let { phone, password } = this.state;
    return !phone || !password;
  }

  onPressSubmit(){
    let { phone, password } = this.state;
    this.props.action.login({
      phone, password
    }).then(action=>{
      if(!action.error){ Actions.main() }
      else{
        this.setState({tip:action.payload.message});
      }
    });
  }

  render(){
    return (
      <View style={{flex:1, backgroundColor:'#fdfbf8'}}>
        <View style={{marginTop:95,height:60, alignItems:'center'}}>
          <Image source={require('../../res/logo.png')} style={{height:60}} resizeMode='contain' />
        </View>

        <View style={{marginTop:10,alignItems:'center'}}>
          <Text style={{color:'#094c31',fontSize:40,fontFamily:this.props.fontFamily}}>校安通</Text>
        </View>
        <View style={{marginTop:95,alignItems:'center'}}>
          <Text style={{color:'#3d9679',fontSize:16,fontFamily:this.props.fontFamily}}>手机号/Mobile</Text>
        </View>
        <View style={{
            height:40,
            borderBottomWidth:1, borderColor:'#f0eeeb',
            //borderTopLeftRadius:5, borderTopRightRadius:5,
            marginHorizontal:15,marginTop:10
          }}>
          <TextInput style={{
              flex:1, color:'#505050',
              marginHorizontal:10,textAlign:'center',
              backgroundColor:'transparent'
            }} onChangeText={phone=>this.setState({phone})} value={this.state.phone} placeholder='请输入手机号' />
        </View>

        <View style={{marginTop:40,alignItems:'center'}}>
          <Text style={{color:'#3d9679',fontSize:16,fontFamily:this.props.fontFamily}}>密码/Password</Text>
        </View>

        <View style={{
            height:45,
            borderBottomWidth:1, borderColor:'#f0eeeb',
            //borderBottomLeftRadius:5, borderBottomRightRadius:5,
            marginHorizontal:15
          }}>
          <TextInput style={{
              flex:1, color:'#505050',
              marginHorizontal:10,textAlign:'center',
              backgroundColor:'transparent'
            }} onChangeText={password=>this.setState({password})} value={this.state.password} placeholder='请输入密码' secureTextEntry={true} />
        </View>

        <TouchableOpacity style={{
            height:50,
            alignItems:'center', justifyContent:'center',
            backgroundColor: this.isDisabledSubmit() ? '#d0e4db':'#d0e4db',
            borderWidth:1, borderColor:'#3d9679',
            borderRadius:5,
            marginHorizontal:15, marginTop:65,
          }} onPress={this.onPressSubmit.bind(this)} disabled={this.isDisabledSubmit()}>
          <Text style={{color:'#0b5c3b',fontSize:20,fontFamily:this.props.fontFamily}}>登  录</Text>
        </TouchableOpacity>
        <View style={{flex:1}} />
        <View style={{flexDirection:'row', height:60}}>
          <TouchableOpacity
            style={{width:100, alignItems:'center', justifyContent:'center'}}
            onPress={()=>Actions.register()}>
            <Text style={{color:'#a6a5a5',fontSize:16,fontFamily:this.props.fontFamily}}>忘记密码</Text>
          </TouchableOpacity>
          <View style={{flex:1}} />
          <TouchableOpacity
            style={{width:100, alignItems:'center', justifyContent:'center'}}
            onPress={()=>Actions.register()}>
            <Text style={{color:'#ff005a',fontSize:16,fontFamily:this.props.fontFamily}}>注  册</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(
  state=>({
    ...state.loginForm,
    fontFamily: state.env.fontFamily
  }),
  dispatch=>({
    action: bindActionCreators({
      login: action.login
    }, dispatch)})
)(P);
