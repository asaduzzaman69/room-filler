import { Flex, GridItem, Input } from '@chakra-ui/react';
import React, { useContext, useRef, useState } from 'react';
import stateProvider from '../context/stateProvider';
import ResortInput from '../dropDown/ResortInput';

const Resort = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const ctx = useContext(stateProvider);
  const sharedSpaceInput = useRef();
  const privateHomeInput = useRef();

  const inputStyles = {
    fontWeight: 'semibold',
    borderRadius: '16px',
    border: '2px solid #E5E5E5',
    fontSize: '18px',
    _placeholder: {
      color: '#6B6B6B',
    },
    _focus: {
      border: '2px solid   #18A7B9',
      background: '#F8F8F8',
    },

    _hover: {
      border: '2px solid   #18A7B9',
      background: '#F8F8F8',
    },
  };

  const changeHandler = (e) => {
    if (privateHomeInput.current === e.target && e.target.value !== '') {
      sharedSpaceInput.current.value = '';
      ctx.setSelectedName('');
      ctx.setPlaceName(privateHomeInput.current?.value);
      setIsChanged(true);
    }
    if (sharedSpaceInput.current === e.target && e.target.value !== '') {
      privateHomeInput.current.value = '';
      ctx.setSelectedName('');
      ctx.setPlaceName(sharedSpaceInput.current?.value);
      setHasValue(true);
    }
  };
  const blurChangeHandler = () => {
    if (privateHomeInput.current.value === '') {
      setIsChanged(false);
    }
    if (sharedSpaceInput.current?.value === '') {
      setHasValue(false);
    }
  };

  const clickHandler = () => {
    if (
      privateHomeInput.current?.value === '' ||
      sharedSpaceInput.current?.value === ''
    ) {
      setHasValue(false);
      setIsChanged(false);
    }
  };

  return (
    <GridItem height='40vh' mx='auto' alignSelf={'center'}>
      <Flex w='30vw' mt='5rem' gap='18px' direction='column'>
        <ResortInput />
        {!ctx.isClicked && (
          <>
            <Input
              ref={privateHomeInput}
              onChange={changeHandler}
              onBlur={blurChangeHandler}
              onClick={clickHandler}
              sx={{
                ...inputStyles,
                borderColor: isChanged && 'rgba(49, 49, 49, 1)',
                _hover: {
                  border: `2px solid ${
                    isChanged ? 'rgba(49, 49, 49, 1)' : '#18A7B9'
                  } `,
                },
                _focus: {
                  border: `2px solid ${
                    isChanged ? 'rgba(49, 49, 49, 1)' : '#18A7B9'
                  } `,
                  background: '#F8F8F8',
                },
              }}
              height='91px'
              placeholder='A private home'
            />
            <Input
              ref={sharedSpaceInput}
              onChange={changeHandler}
              onBlur={blurChangeHandler}
              onClick={clickHandler}
              sx={{
                ...inputStyles,
                borderColor: hasValue && 'rgba(49, 49, 49, 1)',
                _hover: {
                  border: `2px solid ${
                    hasValue ? 'rgba(49, 49, 49, 1)' : '#18A7B9'
                  } `,
                },
                _focus: {
                  border: `2px solid ${
                    hasValue ? 'rgba(49, 49, 49, 1)' : '#18A7B9'
                  } `,
                  background: '#F8F8F8',
                },
              }}
              height='91px'
              placeholder='A shared space'
            />
          </>
        )}
      </Flex>
    </GridItem>
  );
};

export default Resort;
