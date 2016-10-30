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
    let { phone, password } = this.state;
    return !phone || !password;
  }

  onPressSubmit(){
    let { name, phone, password } = this.state;
    this.props.action.register({
      name, phone, password
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
            <Text style={{color:'#094c31',fontSize:20,fontFamily:this.props.fontFamily}}>图片浏览</Text>
          </View>
          <View style={{width:100}}>
          </View>
        </View>

        <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
          <Image source={{uri:this.props.imageURL}} style={{width:200,height:200}} resizeMode='contain' />
        </View>

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
      register: action.register
    }, dispatch)})
)(P);
