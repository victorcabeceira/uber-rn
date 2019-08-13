import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { View } from 'react-native';

import Search from '../Search';
import Directions from '../Directions';

import { getPixelSize } from '../../shared/utils';

const Map = () => {
  const [region, setRegion] = useState({
    latitude: -15.79515321,
    longitude: -47.93474534,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.0134
  });
  const [destination, setDestination] = useState(null);

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

  handleLocationSelected = ({ structured_formatting }, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude }
    } = geometry;
    setDestination({
      latitude,
      longitude,
      title: structured_formatting.main_text
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={region}
        showsUserLocation
        loadingEnabled
        ref={el => (this.mapView = el)}
      >
        {destination && (
          <Directions
            origin={region}
            destination={destination}
            onReady={result => {
              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  top: getPixelSize(30),
                  right: getPixelSize(30),
                  bottom: getPixelSize(30),
                  left: getPixelSize(30)
                }
              });
            }}
          />
        )}
      </MapView>

      <Search onLocationSelected={handleLocationSelected} />
    </View>
  );
};

export default Map;
