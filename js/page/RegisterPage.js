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
        <View style={{marginTop:40, flexDirection:'row'}}>
          <TouchableOpacity style={{marginLeft:15,width:100}} onPressIn={()=>Actions.pop()}>
            <IconFont name='close' size={28} color='#b2b2b2' />
          </TouchableOpacity>
          <View style={{flex:1, alignItems:'center'}}>
            <Text style={{color:'#094c31',fontSize:20,fontFamily:this.props.fontFamily}}>注册</Text>
          </View>
          <View style={{width:100}}>
          </View>
        </View>

        <View style={{marginTop:40, alignItems:'center'}}>
          <View style={{width:100,height:100,borderRadius:50,backgroundColor:'#d0e4db',alignItems:'center',justifyContent:'center'}}>
            <IconFont name='camera' size={40} color='#fff' />
            <View style={{position:'absolute', width:30,height:30,top:0,right:0,borderRadius:15,backgroundColor:'#00d9c4', alignItems:'center', justifyContent:'center'}}>
              <IconFont name='add' size={20} color='#fff' style={{backgroundColor:'transparent'}} />
            </View>
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
            }} onChangeText={phone=>this.setState({phone})} value={this.state.phone} placeholder='请输入手机号' />
        </View>

        <View style={{marginTop:10,marginHorizontal:30}}>
          <Text style={{color:'#a5a5a5',fontSize:16,fontFamily:this.props.fontFamily}}>手机</Text>
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
            }} onChangeText={phone=>this.setState({phone})} value={this.state.phone} placeholder='请输入手机号' />
        </View>

        <View style={{marginTop:10,marginHorizontal:30}}>
          <Text style={{color:'#a5a5a5',fontSize:16,fontFamily:this.props.fontFamily}}>密码</Text>
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
            }} onChangeText={phone=>this.setState({phone})} value={this.state.phone} placeholder='请输入手机号' secureTextEntry={true} />
        </View>

        <View style={{marginTop:10,marginHorizontal:30}}>
          <Text style={{color:'#a5a5a5',fontSize:16,fontFamily:this.props.fontFamily}}>确认密码</Text>
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
            }} onChangeText={phone=>this.setState({phone})} value={this.state.phone} placeholder='请输入手机号' secureTextEntry={true} />
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
    ...state.loginForm,
    fontFamily: state.env.fontFamily
  }),
  dispatch=>({
    action: bindActionCreators({
      login: action.login
    }, dispatch)})
)(P);
