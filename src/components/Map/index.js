import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { View } from 'react-native';

import Search from '../Search';

const Map = () => {
  const [region, setRegion] = useState({
    latitude: -15.79515321,
    longitude: -47.93474534,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.0134
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      // geo_success, geo_error, geo_options
      ({ coords: { latitude, longitude } }) => {
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134
        });
      },
      geo_error => {
        console.log('geo_error', geo_error);
      },
      {
        timeout: 3000,
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    );
  }, [region]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={region}
        showsUserLocation
        loadingEnabled
      />

      <Search />
    </View>
  );
};

export default Map;
