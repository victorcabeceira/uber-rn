import React, { useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Platform } from 'react-native';

import styles from './styles';

const Search = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Para onde?'
      placeholderTextColor='#333'
      fetchDetails
      enablePoweredByContainer={false}
      onPress={() => {}}
      query={{
        key: 'AIzaSyBj116qcXXjCWz-qDFb5Ii6iVvkrO415Qs',
        language: 'pt'
      }}
      textInputProps={{
        autoCapitalize: 'none',
        autoCorrect: false
      }}
      styles={{
        container: styles.container,
        textInputContainer: styles.textInputContainer,
        textInput: styles.textInput,
        listView: styles.listView,
        description: styles.description,
        row: styles.row
      }}
    />
  );
};

export default Search;
