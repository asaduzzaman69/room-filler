import {
  Button,
  Flex,
  HStack,
  PinInput,
  PinInputField,
  Text,
} from '@chakra-ui/react';

const Otp = () => {
  const background = 'rgba(248, 248, 248, 1)';

  const buttonStyles = {
    fontSize: '14px',
    fontWeight: 'medium',
    background: '#FFF',
    color: '#313131',
    border: 'none',
    cursor: 'pointer',
    padding: '.2rem',
    _hover: {
      background: '#fff',
    },
    _active: {
      background: '#fff',
    },
  };

  const pinInputStyles = {
    width: '4rem',

    height: '3.7rem',
    borderRadius: '1rem',
    fontSize: '2.5rem',

    _placeholder: {
      fontSize: '5rem',
      fontWeight: 'medium',
      color: '#313131',
    },
    _focus: {
      background: { background },
      border: '1px solid #313131',
    },
    _active: {
      background: { background },
      border: '1px solid #313131',
    },
  };

  const changeHandler = (e) => {
    const target = e.target;
    const targetValues = { [target.id]: target.value };

    const id = Object.keys(targetValues)[0];
    document.getElementById(id).style.background = background;
    document.getElementById(id).style.border = '2px solid #313131';

    if (e.key === 'Backspace') {
      document.getElementById(id).style.background = '#fff';
      document.getElementById(id).style.border = '1px solid #B6B6B6';
    }
  };

  return (
    <Flex
      gap='2rem'
      mt='3rem'
      direction='column'
      justify='center'
      align='center'
      color='#6B6B6B'
    >
      <Text>Enter the code we sent to your email:</Text>
      <HStack color='#313131'>
        <PinInput otp size='lg' placeholder=''>
          <PinInputField
            onKeyDown={changeHandler}
            onChange={changeHandler}
            sx={{
              ...pinInputStyles,
            }}
          />
          <PinInputField
            onKeyDown={changeHandler}
            onChange={changeHandler}
            sx={{
              ...pinInputStyles,
            }}
          />
          <PinInputField
            onKeyDown={changeHandler}
            onChange={changeHandler}
            sx={{
              ...pinInputStyles,
            }}
          />
          <PinInputField
            onKeyDown={changeHandler}
            onChange={changeHandler}
            sx={{
              ...pinInputStyles,
            }}
          />
          <PinInputField
            onKeyDown={changeHandler}
            onChange={changeHandler}
            sx={{
              ...pinInputStyles,
            }}
          />
          <PinInputField
            onKeyDown={changeHandler}
            onChange={changeHandler}
            sx={{
              ...pinInputStyles,
            }}
          />
        </PinInput>
      </HStack>
      <Text as='p'>
        Didn&apos;t get a code?
        <Button
          sx={{
            ...buttonStyles,
          }}
          as='u'
        >
          Send again
        </Button>
      </Text>
    </Flex>
  );
};

export default Otp;
