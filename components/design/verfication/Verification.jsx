import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import OwnerVerify from './OwnerVerify';

const Verification = () => {
  const [isChecked, setIsChecked] = useState(false);

  const onClick = () => {
    setIsChecked(!isChecked);
  };

  const radioStyles = {
    width: '1.6875rem',
    height: '1.6875rem',
    borderRadius: '8px',
    justifyContent: 'center',
    cursor: 'pointer',
    alignItems: 'center',
  };

  return (
    <>
      <Flex justify='center' direction='column' m='4rem'>
        <Text fontSize='22px' fontWeight='semibold' mb='4rem'>
          Who&apos;s running the show?
        </Text>
        <Flex color={'#6B6B6B'} mb='2rem' justify='space-between'>
          <Text>Private owner 1-5 properties</Text>
          <Flex
            border={`2px solid ${!isChecked ? '#313131' : '#E5E5E5'}`}
            sx={{ ...radioStyles }}
            onClick={onClick}
          >
            <Box
              borderRadius='4px'
              width='85%'
              height='85%'
              p='4px'
              background={!isChecked && '#313131'}
            />
          </Flex>
        </Flex>
        <Flex color={'#6B6B6B'} justify='space-between'>
          <Text>Management company 5+ propeties</Text>
          <Flex
            border={`2px solid ${isChecked ? '#313131' : '#E5E5E5'}`}
            sx={{ ...radioStyles }}
            onClick={onClick}
          >
            <Box
              borderRadius='4px'
              width='85%'
              height='85%'
              p='4px'
              background={isChecked && '#313131'}
            />
          </Flex>
        </Flex>

        {isChecked && <OwnerVerify />}
      </Flex>
    </>
  );
};

export default Verification;
