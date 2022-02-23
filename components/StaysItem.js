import { Box, Flex, Grid, HStack, Image, Spacer, Text, Button } from '@chakra-ui/react';
import React from 'react';


const AmenitiesBox = ({ count, label, icon }) => {

    return (
        <Grid alignItems={'center'} gridColumnGap={'8px'} p={2} bg={'#F7F9F9'} borderRadius="3px" gridTemplateColumns={'25px 1fr'}>
            {icon}
            <Text fontSize={'12px'} fontWeight={500}>
                <Text as={'span'}>{count}</Text>
                {label}
            </Text>
        </Grid>
    )
}

const StaysItem = ({ images }) => {

    const headingStyle = {
        fontSize: '22px',
        fontWeight: 600
    }

    const subText = {
        fontWeight: 500,
        color: '#6B6B6B',
        fontSize: '15px'
    }
    return (
        <Box paddingBottom={'40px !important'} borderRadius={'16px'} boxShadow={'0px 20px 50px rgba(198, 217, 225, 0.2)'} p={4} bg={'white'}>
            <Box pos={'relative'}>
                <Box fontSize={'12px'} borderRadius={'6px'} bg={" #18A7B9"} color={'white'} fontWeight={600} padding={'8px 13px'} pos={'absolute'} right={'18px'} top={'18px'} >
                    25% off
                </Box>
                <Image w={'100%'} height={'200px'} borderRadius={'10px'} src={'/images/testProperty.png'} />

            </Box>
            <Text mt={6} mb={1} sx={headingStyle} >The Lind Boracay</Text>
            <Text sx={subText} mb={4} >2347 Hickory Street, Orem, UT</Text>
            <Box>

                <Grid rowGap={'8px'} columnGap={'10px'} gridTemplateColumns={'repeat(3, 1fr)'} >
                    <AmenitiesBox
                        label={'Guest'}
                        icon={<Image w={'20px'} h={'20px'} src='/images/icons/people_outline.png' />}
                    />
                    <AmenitiesBox
                        label={'Guest'}
                        icon={<Image w={'20px'} h={'20px'} src='/images/icons/people_outline.png' />}

                    />
                    <AmenitiesBox
                        label={'Guest'}
                        icon={<Image w={'20px'} h={'20px'} src='/images/icons/people_outline.png' />}

                    />                    <AmenitiesBox
                        label={'Guest'}
                        icon={<Image w={'20px'} h={'20px'} src='/images/icons/people_outline.png' />}

                    />

                </Grid>
            </Box>

            <Flex mt={5}>
                <Text color={'#313131'} fontSize={'24px'} fontWeight={600}>$250<Text color={'#6B6B6B'} fontWeight={500} fontSize={'12px'} as={'span'}>/Night</Text></Text>
                <Spacer />
                <Button textTransform={'capitalize'} fontWeight={600} fontSize={'12px'} bg={'rgba(24, 167, 185, 0.15)'} color={'#18A7B9'} >View Availability</Button>
            </Flex>
        </Box>
    );
};

export default StaysItem;
