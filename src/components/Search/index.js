import React, { useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import styles from './styles';

const Search = ({ onLocationSelected }) => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <GooglePlacesAutocomplete
      placeholder='Para onde?'
      placeholderTextColor='#333'
      fetchDetails
      enablePoweredByContainer={false}
      onPress={onLocationSelected}
      query={{
        key: 'AIzaSyBj116qcXXjCWz-qDFb5Ii6iVvkrO415Qs',
        language: 'pt'
      }}
      textInputProps={{
        onFocus: () => {
          setSearchFocused(true);
        },
        onBlur: () => {
          setSearchFocused(false);
        },
        autoCapitalize: 'none',
        autoCorrect: false
      }}
      listViewDisplayed={searchFocused}
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
