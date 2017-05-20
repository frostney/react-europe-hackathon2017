import React from 'react';
import { View, Text, Image } from 'react-vr';

const SpeakerInfo = ({ styles, name, description, image }) => (
  <View style={{ ...styles, backgroundColor: 'grey', width: 0.3 }}>
    <View>
      <Text>{name}</Text>
    </View>
    <Text>{description}</Text>
  </View>
);

export default SpeakerInfo;