import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import Inputs from '../input/Inputs';
import Otp from './Otp';

const OwnerVerify = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

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

  const buttonStyles = {
    fontSize: '14px',
    fontWeight: 'medium',
    background: '#FFF',
    border: `2px solid  ${isChanged ? 'rgba(49, 49, 49, 1)' : '#E5E5E5'}`,
    color: isChanged ? 'rgba(49, 49, 49, 1)' : '#6B6B6B',
    _focus: {
      boxShadow: 'none',
    },
  };

  const sendOTP = () => {
    setIsClicked(true);
  };

  return (
    <>
      {!isClicked && (
        <Flex
          mt={'5rem'}
          justify='center'
          align='center'
          mx='auto'
          width='80%'
          direction='column'
        >
          <Text mb='2rem' color='#313131' fontSize='22px' fontWeight='semibold'>
            Owner verification
          </Text>

          <Box mb='3rem'>
            <Flex>
              <Inputs
                change={setIsChanged}
                placeholder='Owners first name'
                primaryStyles={primaryStyles}
                sx={{
                  borderTopLeftRadius: '8px',
                  borderBottomRadius: '0',
                  borderRight: '0',
                  borderBottom: '0',
                }}
              />

              <Inputs
                change={setIsChanged}
                placeholder='Owners last name'
                primaryStyles={primaryStyles}
                sx={{
                  borderTopRightRadius: '8px',
                  borderBottom: '0',
                }}
              />
            </Flex>
            <Inputs
              change={setIsChanged}
              placeholder='Owners email'
              primaryStyles={primaryStyles}
              type='email'
              sx={{
                borderBottomRadius: '8px',
                borderBottom: '2px solid #E5E5E5',
              }}
            />
          </Box>
          <Button sx={{ ...buttonStyles }} type='submit' onClick={sendOTP}>
            Send OTP
          </Button>
        </Flex>
      )}
      {isClicked && <Otp />}
    </>
  );
};

export default OwnerVerify;
