import { Box, Flex, GridItem, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

const Upload = () => {
  const activeStyles = {
    width: '20vw',
    height: '20vw',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  return (
    <GridItem
      mt='1rem'
      justifySelf='center'
      alignSelf='center'
      border={'1px dashed rgba(229, 229, 229, 1)'}
      borderRadius='16px'
    >
      <Box>
        <Flex
          sx={{
            ...activeStyles,
          }}
        >
          <Image
            src='/svgfile/photos.svg'
            width={80}
            height={80}
            alt='photo icon'
          />
          <Text fontSize='22px' fontWeight='semibold' marginBlock='1rem 1.5rem'>
            Drag your photos here
          </Text>
          <Text fontWeight='medium' color='#6B6B6B'>
            Add at least 5 photos
          </Text>
        </Flex>
      </Box>

      <Box color='#313131' textAlign='center' mb='2rem'>
        <label htmlFor='imageUpload' className='photoLabel'>
          Upload from your device
        </label>
        <input type='file' id='imageUpload' className='file' accept='image/*' />
      </Box>
    </GridItem>
  );
};

export default Upload;
