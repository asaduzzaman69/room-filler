import { Button, Flex, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import stateProvider from '../context/stateProvider';

const Step = () => {
  const { step } = useContext(stateProvider);

  const buttonStyles = {
    fontSize: '14px',
    fontWeight: 'medium',
    borderRadius: '25px',
    background: '#F4F4F4',
    _focus: {
      boxShadow: '0',
    },
    _active: {
      boxShadow: '0',
      background: '#F4F4F4',
    },
  };

  return (
    <Flex align='center' justify='space-between'>
      <Text fontSize={'12px'} color={'#18A7B9'}>
        Step {step} of 9
      </Text>
      <Button borderRadius='25px' sx={{ ...buttonStyles }}>
        Save and exit
      </Button>
    </Flex>
  );
};

export default Step;
