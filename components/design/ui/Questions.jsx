import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import stateProvider from '../context/stateProvider';

const questions = [
  "Where's your place located?",
  'What kind of place will guests have?',
  'How many guests would you like to welcome?',
  'Let guests know what your place has to offer',
  "Next, let's add some photos of your place",
  "Let's give your place a name",
  "Now, let's describe your place",
  'Just a few last questions...',
  'Check out your listing!',
];

const Questions = () => {
  const ctx = useContext(stateProvider);

  return (
    <Box fontSize='3.3rem' mt='5rem' zIndex={10}>
      <Flex maxW='70%' mx='auto' direction='column' justify='center'>
        {questions[ctx.step - 1]}
        {ctx.step === 9 ? (
          <Text
            mt='1.5rem'
            fontSize='1.5rem'
            color='#313131'
            fontWeight='normal'
            lineHeight='7'
          >
            Once you save, we&apos;ll ask you to confirm a few details before
            you can publish.
          </Text>
        ) : (
          ''
        )}
      </Flex>
    </Box>
  );
};

export default Questions;
