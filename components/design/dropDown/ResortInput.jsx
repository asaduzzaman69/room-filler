import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useContext, useState } from 'react';
import stateProvider from '../context/stateProvider';
import DropDown from './DropDown';

const ResortInput = () => {
  const [isClicked, setIsClicked] = useState(false);
  const ctx = useContext(stateProvider);

  const dynamicStyles = ctx.isClicked && {
    fontWeight: 'semibold',
    color: '#313131',
    border: '2px solid #18A7B9',
    borderColor: '#18A7B9',
    background: '#F8F8F8',
  };
  const selectedStyle = ctx.selectedName && {
    color: '#313131',
    borderColor: '#313131',
    background: '#F8F8F8',
  };
  const placeHolder = ctx.selectedName
    ? `A resort - ${ctx.selectedName}`
    : 'A resort';

  const allStyles = {
    color: '#6B6B6B',
    fontWeight: 'semibold',
    fontSize: '18px',

    _hover: {
      border: '2px solid #18A7B9',
      borderColor: '#18A7B9',
      background: '#F8F8F8',
    },
    ...dynamicStyles,
    ...selectedStyle,
  };

  const clickHandler = () => {
    ctx.dropChange();
    setIsClicked(!isClicked);
  };

  return (
    <Flex direction={'column'}>
      <Flex
        onClick={clickHandler}
        align='center'
        border='2px solid #E5E5E5'
        borderRadius='1rem'
        height={'91px'}
        justify='space-between'
        sx={{ ...allStyles }}
      >
        <Text ml='1rem'>{placeHolder}</Text>
        <Box onClick={clickHandler} mr='2rem'>
          <Image
            className={ctx.isClicked && 'icon'}
            width={15}
            height={15}
            src='/svgfile/chevronDown.svg'
            alt='down icon'
          />
        </Box>
      </Flex>
      {ctx.isClicked && <DropDown />}
    </Flex>
  );
};

export default ResortInput;
