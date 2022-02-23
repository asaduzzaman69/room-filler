import { Box, Input, Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';

const Inputs = ({ placeholder, type, primaryStyles, change, sx, value }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef();

  const inputStyles = {
    fontWeight: 'medium',
    fontSize: '18px',
    height: '100%',
    minWidth: '100%',
    border: '2px solid #E5E5E5',
    borderColor: '#E5E5E5',
    borderRadius: '0',
    padding: '22px 0 0 17px',
    ...sx,
    ...primaryStyles,
  };

  const labelStyles = {
    color: '#6b6b6b',
    fontSize: isFocused ? '14px' : '17px',
    fontWeight: 'medium',
    position: 'relative',
    top: isFocused ? '-55px' : '-40px',
    textTransform: 'capitalize',

    bottom: '10px',
    left: '20px',
    transition: '0.2s ease all',
  };

  const blurChange = (e) => {
    if (e.target.value === '') {
      setIsFocused(false);
      if (change) {
        change(false);
      }
    }
  };

  const focusChange = () => {
    setIsFocused(true);
  };

  const changeHandler = ({ target }) => {
    if (target.value.includes('@')) {
      change(true);
    }
  };

  return (
    <Box height='61px' width='100%' onClick={() => inputRef.current.focus()}>
      <Input
        type={type ? type : 'text'}
        ref={inputRef}
        sx={{ ...inputStyles }}
        onFocus={focusChange}
        onBlur={blurChange}
        onChange={changeHandler}
        value={value}
      />
      <Text sx={{ ...labelStyles }} as='span'>
        {placeholder}
      </Text>
    </Box>
  );
};

export default Inputs;
