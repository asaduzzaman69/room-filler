import { Box, Button, Flex, Grid, GridItem, Input, Select, Text, Image } from '@chakra-ui/react';
import React, { useState } from 'react';

export const StgGetStartedCard = ({ imageUrl, label, isActive }) => {

    const activeStyle = {
        border: '2px solid #A1A1A1',
    };
    const inactiveStyle = {
        border: '2px solid #E5E5E5'
    };
    return (
        <Flex justifyContent={'flex-end'} sx={{
            cursor: 'pointer',
            borderRadius: '8px',
            flex: 1,
            p: 2,
            ...(isActive ? activeStyle : inactiveStyle)
        }}
            _notLast={{
                marginRight: '15px'
            }}
            flexDir={'column'}
            alignItems={'center'}
        >
            <Image src={imageUrl} />
            <Text fontSize={12} fontWeight={500} mt={2}>{label}</Text>
        </Flex>
    )
}

const StgGetStarted = ({ setIsOpen }) => {

    const [stayType, setStayType] = useState('Resorts')
    return (
        <Box p={'126px 105px'} pos={'relative'} sx={{
            background: '#FFFFFF',
            boxShadow: '0px 0px 50px rgba(198, 217, 225, 0.3)',
            borderRadius: '16px',
            position: 'absolute',
            bottom: '-130px',
            w: '80vw',
            maxW: '1200px'
        }}

            _after={{
                content: `""`,
                backgroundImage: `url("/images/DOTS.png")`,
                width: '100px',
                height: '116px',
                pos: 'absolute',
                backgroundRepeat: 'no-repeat',
                left: '-48px',
                bottom: '-48px',
            }}
        >
            <Grid gridTemplateColumns={' 55% 1fr'}>
                <GridItem paddingRight={'55px'}>
                    <Text lineHeight={'60px'} fontSize={47} fontWeight={600}>
                        Reach <br /> More  with
                        <Text fontWeight={700} color={'#18A7B9;'}>Stay STG</Text>
                    </Text>
                    <Box>

                        <Text lineHeight={'28px'} color={'#6B6B6B'} mt={5} fontSize={18} fontWeight={'normal'}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Input mb={4} placeholder='Address' />
                    <Select mb={4} placeholder='for 10 Guest'>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </Select>
                    <Flex>
                        <StgGetStartedCard isActive={stayType === 'Resorts'} label={'Resorts'} imageUrl={'/images/Vector (2).png'} />
                        <StgGetStartedCard label={'Private Home'} imageUrl={'/images/Vector.png'} />
                        <StgGetStartedCard label={'Shared Space'} imageUrl={'/images/Vector (1).png'} />
                    </Flex>
                    <Flex alignItems={'flex-end'} my={7} >

                        <Text fontSize={'40px'} fontWeight={700}>$1,200 </Text> <Text fontSize={'sm'} fontWeight={600}> per month</Text>
                    </Flex>
                    <Button textTransform={'capitalize'} bg={'#18A7B9'} color={'white'} w={'100%'} onClick={() => setIsOpen()}>Get Started</Button>
                </GridItem>
            </Grid>
        </Box>
    )
};

export default StgGetStarted;
