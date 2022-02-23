import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useContext } from 'react';
import stateProvider from '../context/stateProvider';

const Card = () => {
  const { state, placeName } = useContext(stateProvider);

  const svg = (
    <svg
      width='4'
      height='4'
      viewBox='0 0 4 4'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='2' cy='2' r='2' fill='#6B6B6B' />
    </svg>
  );

  return (
    <GridItem
      maxH={'80%'}
      mb={'2rem'}
      justifySelf='center'
      alignSelf='center'
      maxW='24vw'
      boxShadow='rgba(198, 217, 225, 0.3) 0px 0px 50px 0px'
      borderRadius='2rem 2rem'
      p='1rem'
      overflow='scroll'
      className='scroll'
    >
      <Box borderRadius='2rem 2rem 0 0' overflow={'hidden'}>
        <Image
          width={500}
          height={350}
          layout='responsive'
          src='/images/propertyimg.png'
          alt='card img'
        />
      </Box>
      <Flex
        border='1px solid #E5E5E5'
        borderRadius='0 0 2rem 2rem'
        borderTop='none'
        direction='column'
        height={'100%'}
      >
        <Box
          py='1rem'
          mx={'2rem'}
          borderBottom='1.5px solid rgba(0, 0, 0, 0.05)'
        >
          <Text
            fontSize='1.75rem'
            color='#313131'
            fontWeight='semibold'
            lineHeight='2rem'
            alignSelf='normal'
            my='1.6rem'
          >
            {state.title}
          </Text>
        </Box>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          my='1.5rem'
          mr='2rem'
        >
          <Text
            fontSize='1.25rem'
            color='#313131'
            fontWeight='medium'
            lineHeight='1.5rem'
            marginInline='2rem 4rem'
          >
            {placeName} hosted by Bob
          </Text>
          <Box>
            <Image
              src='/images/owner.png'
              width={50}
              height={50}
              alt='Owner img'
            />
          </Box>
        </Box>
        <Grid
          minW={'50px'}
          color='#6B6B6B'
          fontWeight='medium'
          mx='1.75rem'
          gap='1rem'
          overflow={'auto'}
          className='scroll'
          alignItems='center'
          templateColumns={'repeat(4, max-content)'}
          borderBottom='1.5px solid rgba(0, 0, 0, 0.05)'
          borderTop='1.5px solid rgba(0, 0, 0, 0.05)'
        >
          <GridItem my={'1.5rem'}>
            <Flex gap={'.5rem'} align={'center'}>
              <Text>{state.guests} guests</Text>
              {svg}
            </Flex>
          </GridItem>
          <GridItem my={'1.5rem'}>
            <Flex gap={'.5rem'} align={'center'}>
              <Text>{state.bedrooms} bedrooms</Text> {svg}
            </Flex>
          </GridItem>

          <GridItem my={'1.5rem'}>
            <Flex gap={'.5rem'} align={'center'}>
              <Text>{state.beds} beds</Text>
              {svg}
            </Flex>
          </GridItem>

          <GridItem my={'1.5rem'}>
            <Flex>
              <Text>{state.bathrooms} baths</Text>
            </Flex>
          </GridItem>
        </Grid>
        <Box
          className='scroll'
          overflow='hidden'
          mt='2rem'
          mx='1rem'
          mb='.5rem'
        >
          <Text
            color={'#313131'}
            lineHeight={'1.6rem'}
            fontWeight='medium'
            mx='.5rem'
          >
            {state.description}
          </Text>
        </Box>
      </Flex>
    </GridItem>
  );
};

export default Card;
