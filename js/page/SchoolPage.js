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

import IconFont from '../IconFont';
import action from '../action';

class P extends Component {
  render(){
    return (
      <View>
        <View style={{height:180,alignItems:'center',justifyContent:'center'}}>
          <Text>学校简介</Text>
        </View>

      </View>
    )
  }
}

export default P;
