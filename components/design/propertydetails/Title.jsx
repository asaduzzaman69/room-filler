import { Box, GridItem, Text, Textarea } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import stateProvider from '../context/stateProvider';

const Title = () => {
  const [totalText, setTotalText] = useState(0);
  const { state } = useContext(stateProvider);

  const activeStyles = {
    padding: '2rem',
    border: 'none',
    fontSize: '2rem',
    color: '#6B6B6B',
    _focus: {
      boxShadow: 'none',
    },
  };
  const changeHandler = (e) => {
    const value = e.target.value;
    state.title = value;
    setTotalText(value.length);
    if (value.length >= 50) {
      setTotalText(50);
    }
  };
  return (
    <GridItem alignSelf='center' mx='6rem'>
      <Box
        color={'#313131'}
        fontSize='1.6rem'
        fontWeight={'semibold'}
        my='auto'
      >
        <Text>Create your title</Text>
        <Box
          mt='2rem'
          padding='.5rem'
          borderRadius='1rem'
          border='1px solid #E5E5E5'
        >
          <Textarea
            value={state.title}
            onChange={changeHandler}
            className='scroll'
            sx={{ ...activeStyles }}
            size='lg'
            rows={4}
          ></Textarea>
        </Box>
        <Text color='#6B6B6B' fontSize='1rem' fontWeight='medium' mt='1rem'>
          {totalText}/50
        </Text>
      </Box>
    </GridItem>
  );
};

export default Title;
