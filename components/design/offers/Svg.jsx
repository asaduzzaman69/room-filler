import {
  Box,
  Flex,
  GridItem,
  Image,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import React, { useContext, useRef, useState } from 'react';
import stateProvider from '../context/stateProvider';

const SVG = ({ path, name }) => {
  const [isClicked, setIsClicked] = useState(false);
  const textValue = useRef();
  const { state } = useContext(stateProvider);
/*   const { selectedValue } = state;
 */  const [isLargerThan1400] = useMediaQuery('(min-width: 1400px)');
  const [isLargerThan2500] = useMediaQuery('(min-width: 2500px)');

  let temporarySelectedValue = true

  const changeHandler = (e) => {
    setIsClicked(!isClicked);

    if (!temporarySelectedValue?.includes(textValue.current.innerText)) {
      temporarySelectedValue.push(textValue.current.innerText);
    } else if (isClicked) {
      const index = temporarySelectedValue.indexOf(textValue.current.innerText);
      if (index > -1) {
        temporarySelectedValue.splice(index, 1);
      }
    }
  };

  return (
    <GridItem
      cursor='pointer'
      minH={isLargerThan1400 ? '12rem' : '10rem'}
      minW={isLargerThan1400 ? '13rem' : 'auto'}
    >
      <Flex
        background={`${isClicked ? '#F8F8F8' : '#fff'}`}
        border={`2px solid ${isClicked ? '#313131' : '#E5E5E5'}`}
        justify='center'
        align='center'
        minH='100%'
        minW='100%'
        borderRadius='2rem'
        direction='column'
        textAlign='center'
        onClick={changeHandler}
      >
        <Box>
          <Image width={30} height={30} src={path} alt='icon'></Image>
        </Box>
        <Text ref={textValue} fontSize='1rem' fontWeight='medium' mt='1rem'>
          {name}
        </Text>
      </Flex>
    </GridItem>
  );
};

export default SVG;
