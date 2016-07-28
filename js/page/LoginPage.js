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
      <View style={{marginTop:100,flex:1}}>

        <View style={{alignItems:'center'}}>
          <Text style={{fontSize:24}}>水乡校安通</Text>
        </View>
        <View style={{
            height:45,
            borderWidth:1, borderBottomWidth:0, borderColor:'#888',
            //borderTopLeftRadius:5, borderTopRightRadius:5,
            marginHorizontal:15,marginTop:15
          }}>
          <TextInput style={{
              flex:1,
              marginHorizontal:10,
              backgroundColor:'transparent'
            }} onChangeText={phone=>this.setState({phone})} value={this.state.phone} placeholder='请输入手机号' />
        </View>

        <View style={{
            height:45,
            borderWidth:1, borderColor:'#888',
            //borderBottomLeftRadius:5, borderBottomRightRadius:5,
            marginHorizontal:15
          }}>
          <TextInput style={{
              flex:1,
              marginHorizontal:10,
              backgroundColor:'transparent'
            }} onChangeText={password=>this.setState({password})} value={this.state.password} placeholder='请输入密码' secureTextEntry={true} />
        </View>

        <Tip msg={this.state.tip} />

        <TouchableOpacity style={{
            height:45,
            alignItems:'center', justifyContent:'center',
            backgroundColor: this.isDisabledSubmit() ? '#888':'#18B4ED',
            borderRadius:5,
            marginHorizontal:15, marginTop:20,
          }} onPress={this.onPressSubmit.bind(this)} disabled={this.isDisabledSubmit()}>
          <Text style={{color:'#fff',fontSize:18}}>登录</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  state=>state.loginForm,
  dispatch=>({
    action: bindActionCreators({
      login: action.login
    }, dispatch)})
)(P);
