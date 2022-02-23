import { Flex, GridItem } from '@chakra-ui/react';
import React, { useContext } from 'react';
import stateProvider from '../context/stateProvider';
import Counter from './Counter';

const Guests = () => {
  const { state } = useContext(stateProvider);
  return (
    <GridItem alignSelf='center'>
      <Flex
        color={'#313131'}
        fontSize='1.3rem'
        fontWeight={'semibold'}
        direction={'column'}
        m='10rem'
      >
        <Counter value={state.guests} text='Guests' />
        <Counter value={state.beds} text='Beds' />
        <Counter value={state.bedrooms} text='Bedrooms' />
        <Counter value={state.bathrooms} text='Bathrooms' />
      </Flex>
    </GridItem>
  );
};

export default Guests;
