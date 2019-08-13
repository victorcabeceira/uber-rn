import React, { useEffect } from 'react';
import { View } from 'react-native';

import uberx from '../../assets/images/uberx.png';

import {
  Container,
  TypeTitle,
  TypeDescription,
  TypeImage,
  RequestButton,
  RequestButtonText
} from './styles';

const Details = ({ value }) => (
  <Container>
    <TypeTitle>Popular</TypeTitle>
    <TypeDescription>Viagens baratas para o dia a dia</TypeDescription>
    <TypeImage source={uberx} />
    <TypeTitle>UberX</TypeTitle>
    <TypeDescription>
      R${parseFloat(`${(value * (Math.random() * 2))}`).toFixed(2)}
    </TypeDescription>

    <RequestButton onPress={() => {}}>
      <RequestButtonText>SOLICITAR VEÍCULO</RequestButtonText>
    </RequestButton>
  </Container>
);

export default Details;
