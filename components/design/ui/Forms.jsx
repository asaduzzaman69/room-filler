import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import Card from '../card/Card';
import stateProvider from '../context/stateProvider';
import Offer from '../offers/Offer';
import Guests from '../propertydetails/Guests';
import Resort from '../propertydetails/Resort';
import Upload from '../propertydetails/Upload';
import Step from '../ui/Step';
import Verification from '../verfication/Verification';
import Address from './../propertydetails/Address';
import Description from './../propertydetails/Description';
import Title from './../propertydetails/Title';

const components = [
  { id: 1, component: <Address /> },
  { id: 2, component: <Resort /> },
  { id: 3, component: <Guests /> },
  { id: 4, component: <Offer /> },
  { id: 5, component: <Upload /> },
  { id: 6, component: <Title /> },
  { id: 7, component: <Description /> },
  { id: 8, component: <Verification /> },
  { id: 9, component: <Card /> },
];

const Forms = () => {
  const { progress, step, pageChange, pageBack } = useContext(stateProvider);

  let button = 'Next';

  if (step === 8) {
    button = 'Review your listing';
  } else if (step === 9) {
    button = 'Save your listing';
  }

  const value = components.filter((el) => step === el.id);
  const component = value.map((el) => {
    return el.component;
  });

  const buttonStyles = {
    fontSize: '14px',
    fontWeight: 'normal',
    borderRadius: '8px',
    background: '#18A7b9',
    color: '#fff',

    _focus: {
      boxShadow: '0',
    },
    _hover: {
      background: '#18A7b9',
    },
  };

  return (
    <Grid height='100%' templateRows='min-content 2fr  min-content'>
      <GridItem m='1rem'>
        <Step />
      </GridItem>
      {component}
      <GridItem overflow-y='hidden' alignSelf='end'>
        <Box background='rgba(0, 0, 0, 0.1)'>
          <Box width={progress + '%'} background='#18A7B9' height={'4px'}></Box>
        </Box>
        <Flex m='1rem' justify='space-between' mt='.5rem' align='center'>
          <Text cursor='pointer' as='u' onClick={() => pageBack()}>
            Back
          </Text>

          <Button sx={{ ...buttonStyles }} onClick={() => pageChange()}>
            {button}
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default Forms;
