import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import stateProvider from '../context/stateProvider';

const Counter = ({ text, value }) => {
  const { dispatch } = useContext(stateProvider);

  const buttonStyles = {
    border: 'none',
    background: '#fff',
    padding: '0',
    _hover: {
      background: '#fff',
      border: 'none',
    },
    _active: {
      background: '#fff',
      border: 'none',
    },
    _focus: {
      background: '#fff',
      border: 'none',
    },
  };

  const addItem = (e) => {
    dispatch({ type: e.target.id });
  };

  const removeItem = (e) => {
    dispatch({ type: e.target.id });
  };

  return (
    <Flex justify={'space-between'} mt='2rem'>
      <Text>{text}</Text>
      <Flex
        width='10rem'
        align='center'
        border='1px solid #E5E5E5'
        justify='space-around'
        borderRadius='3rem'
      >
        <Button onClick={removeItem} id={`${text}dec`} sx={{ ...buttonStyles }}>
          -
        </Button>
        <Text fontSize='1.25rem' fontWeight={'medium'}>
          {value}
        </Text>
        <Button id={`${text}inc`} onClick={addItem} sx={{ ...buttonStyles }}>
          +
        </Button>
      </Flex>
    </Flex>
  );
};

export default Counter;
