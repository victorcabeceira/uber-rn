import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey='AIzaSyBj116qcXXjCWz-qDFb5Ii6iVvkrO415Qs'
    strokeWidth={3}
    strokeColor='#222'
  />
);

export default Directions;
