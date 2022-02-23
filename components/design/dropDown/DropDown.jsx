import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Options from './Options';

const DropDown = () => {
  const text = [
    'Snowy Season Resort',
    "Lord's Summit Resort",
    'Antique Universe Resort',
    'Sunny Canopy Resort',
  ];

  const styles = {
    border: '1px solid #E5E5E5',
    borderRadius: '16px',
  };

  return (
    <Flex mt='1rem' sx={{ ...styles }} direction='column'>
      <Box p='1rem'>
        {text.map((el, i) => (
          <Options key={i} text={el} />
        ))}
      </Box>
    </Flex>
  );
};

export default DropDown;
