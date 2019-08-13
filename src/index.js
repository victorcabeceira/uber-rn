import React from 'react';
import { View, YellowBox } from 'react-native';

import Map from './components/Map';

YellowBox.ignoreWarnings(['is deprecated']);

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Map />
    </View>
  );
};

export default App;
