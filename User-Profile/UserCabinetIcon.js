import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const UserCabinetIcon = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={require('./user_cabinet_icon.png')}/>
    </TouchableOpacity>
  );
};

export default UserCabinetIcon;