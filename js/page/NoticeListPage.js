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

import IconFont from '../IconFont';
import action from '../action';

class P extends Component {
  render(){
    return (
      <ScrollView style={{paddingVertical:10}}>
        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>学校公告1</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:5}}>
              <Text style={{fontSize:14}}>2016-07-07 12:10:10</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>学校公告1</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:5}}>
              <Text style={{fontSize:14}}>2016-07-07 12:10:10</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>学校公告1</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:5}}>
              <Text style={{fontSize:14}}>2016-07-07 12:10:10</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>学校公告1</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:5}}>
              <Text style={{fontSize:14}}>2016-07-07 12:10:10</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>学校公告1</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:5}}>
              <Text style={{fontSize:14}}>2016-07-07 12:10:10</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>学校公告1</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:5}}>
              <Text style={{fontSize:14}}>2016-07-07 12:10:10</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>学校公告1</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:5}}>
              <Text style={{fontSize:14}}>2016-07-07 12:10:10</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>学校公告1</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:5}}>
              <Text style={{fontSize:14}}>2016-07-07 12:10:10</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>学校公告1</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:5}}>
              <Text style={{fontSize:14}}>2016-07-07 12:10:10</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>学校公告1</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:5}}>
              <Text style={{fontSize:14}}>2016-07-07 12:10:10</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>学校公告1</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:5}}>
              <Text style={{fontSize:14}}>2016-07-07 12:10:10</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>学校公告1</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:5}}>
              <Text style={{fontSize:14}}>2016-07-07 12:10:10</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>学校公告1</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:5}}>
              <Text style={{fontSize:14}}>2016-07-07 12:10:10</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>学校公告1</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:5}}>
              <Text style={{fontSize:14}}>2016-07-07 12:10:10</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>学校公告1</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:5}}>
              <Text style={{fontSize:14}}>2016-07-07 12:10:10</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>学校公告1</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:5}}>
              <Text style={{fontSize:14}}>2016-07-07 12:10:10</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

export default P;
