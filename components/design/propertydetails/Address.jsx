import { Box, Flex, GridItem, Select, Text } from '@chakra-ui/react';
import React from 'react';
import Inputs from '../input/Inputs';

const Address = () => {
  const primaryColor = {
    borderColor: 'rgba(229, 229, 229, 1)',
    background: '#FFF',
  };
  const primaryStyles = {
    _focus: {
      ...primaryColor,
    },
    _active: {
      ...primaryColor,
    },
    _hover: {
      ...primaryColor,
    },
  };

  return (
    <GridItem
      mt='1rem'
      justifySelf='center'
      alignSelf='center'
      justifyItems={'center'}
    >
      <Flex direction='column' align={'center'}>
        <Text
          color='rgba(49, 49, 49, 1)'
          fontSize={'1.25rem'}
          fontWeight='semibold'
        >
          Confirm your address
        </Text>
        <Box mt='2rem'>
          <Inputs
            placeholder='State'
            primaryStyles={primaryStyles}
            sx={{ borderTopRadius: '8px', borderBottom: '0' }}
          />
          <Inputs
            placeholder='Apt, suite, etc. (Optional)'
            primaryStyles={primaryStyles}
            sx={{ borderBottom: '0' }}
          />
          <Inputs
            placeholder='City'
            primaryStyles={primaryStyles}
            sx={{ borderBottom: '0' }}
          />
          <Flex minWidth='660px'>
            <Inputs
              placeholder='State'
              primaryStyles={primaryStyles}
              sx={{ borderBottom: '0' }}
            />
            <Inputs
              placeholder='Zip code'
              primaryStyles={primaryStyles}
              type='number'
              sx={{ borderLeft: '0', borderBottom: '0' }}
            />
          </Flex>
          <Select
            sx={{
              height: '61px',
              border: '2px solid #E5E5E5',
              borderTopRadius: '0',
              ...primaryStyles,
              borderColor: 'rgba(229, 229, 229, 1)',
              _placeholder: {
                color: '#6B6B6B',
              },
              color: '#6B6B6B',
              fontWeight: 'medium',
              fontSize: '18px',
            }}
            placeholder='Country/Region'
          />
        </Box>
        <Text
          mt='2rem'
          color='rgba(153, 153, 153, 1)'
          fontSize='0.875rem'
          fontWeight='medium'
          alignSelf='start'
          lineHeight={'1.3rem'}
        >
          We&apos;ll only share your address with guests who are booked as
          outlined in our
          <br />
          <Text
            as={'u'}
            color='rgba(42, 120, 236, 1)'
            fontSize='0.875rem'
            fontWeight='semibold'
          >
            Privacy Policy
          </Text>
          .
        </Text>
      </Flex>
    </GridItem>
  );
};

export default Address;
