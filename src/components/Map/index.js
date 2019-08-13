import React, { useState, useEffect, Fragment } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { View, Image } from 'react-native';
import Config from 'react-native-config';

import Search from '../Search';
import Directions from '../Directions';
import Details from '../Details';

import { getPixelSize } from '../../shared/utils';

import markerImage from '../../assets/images/marker.png';
import backImage from '../../assets/images/back.png';

import {
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
  Back
} from './styles';
console.log(Config.GOOGLE_MAPS_API_KEY, 'Config.GOOGLE_MAPS_API_KEY')
Geocoder.init(Config.GOOGLE_MAPS_API_KEY);

const Map = () => {
  const [region, setRegion] = useState(null);
  const [destination, setDestination] = useState(null);
  const [duration, setDuration] = useState(null);
  const [origin, setOrigin] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      // geo_success, geo_error, geo_options
      async ({ coords: { latitude, longitude } }) => {
        const response = await Geocoder.from({ latitude, longitude });
        const address = response.results[0].formatted_address;
        setOrigin(address.substring(0, address.indexOf(',')));

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
        timeout: 5000,
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    );
  }, []);

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
          <Fragment>
            <Directions
              origin={region}
              destination={destination}
              onReady={result => {
                setDuration(Math.floor(result.duration));
                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    top: getPixelSize(30),
                    right: getPixelSize(30),
                    bottom: getPixelSize(300),
                    left: getPixelSize(30)
                  }
                });
              }}
            />
            {/* <Marker
              coordinate={region}
              anchor={{ x: 0, y: 0 }}
              image={dotImage}
            /> */}
            <Marker coordinate={region} anchor={{ x: 0, y: 0 }}>
              <LocationBox>
                <LocationTimeBox>
                  <LocationTimeText>{duration}</LocationTimeText>
                  <LocationTimeTextSmall>min</LocationTimeTextSmall>
                </LocationTimeBox>
                <LocationText>{origin}</LocationText>
              </LocationBox>
            </Marker>

            <Marker
              coordinate={destination}
              anchor={{ x: 0, y: 0 }}
              image={markerImage}
            >
              <LocationBox>
                <LocationText>{destination.title}</LocationText>
              </LocationBox>
            </Marker>
          </Fragment>
        )}
      </MapView>

      {destination ? (
        <Fragment>
          <Back onPress={() => setDestination(null)} >
            <Image source={backImage} />
          </Back>
          <Details value={duration} />
        </Fragment>
      ) : (
        <Search onLocationSelected={handleLocationSelected} />
      )}
    </View>
  );
};

export default Map;
