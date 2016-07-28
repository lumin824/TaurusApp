import React, { Component } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

class P extends Component {
  render(){
    return (
      <View style={{alignItems:'center'}}>
        <Text>{this.props.msg}</Text>
      </View>
    );
  }
}

export default P;
