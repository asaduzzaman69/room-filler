import { ArrowDownIcon } from '@chakra-ui/icons';
import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';

import { BsArrowDown } from 'react-icons/bs'


import SearchFilter from './SearchFilter';

const StgBanner = () => {

    let headingStyle = {
        fontWeight: 600,
        fontSize: '52px',
        lineHeight: '120%'

    }
    let subTextStyle = {
        fontSize: '16px',
        fontWeight: 'normal',
        color: '#6B6B6B',
        lineHeight: '28px'
    }
    return (
        <Box height={'900px'} pos={'relative'}>
            <Box _after={{
                content: '""',
                backgroundImage: 'url(images/rectangle.png)',
                top: '-44px',
                right: 0,
                pos: 'absolute',
                w: '238px',
                h: '185px',
                zIndex: -1
            }} w={'min-content'} pos={'absolute'} top={'40px'} right={'497px'}>
                <SearchFilter />
            </Box>
            <Box top={'240px'} pos={'relative'} left={'150px'} w={'100%'} maxW={'455px'}>
                <Text pos={'relative'}
                    _after={{
                        content: `""`,
                        backgroundImage: `url("/images/DOTS.png")`,
                        width: '100px',
                        height: '116px',
                        pos: 'absolute',
                        backgroundRepeat: 'no-repeat',
                        left: '-45px',
                        top: '-45px',
                        zIndex: -1
                    }} sx={headingStyle}>
                    Fresh, quiet
                    <Text >and <Text as={'span'} color={'#18A7B9'} >peaceful</Text>.</Text>
                </Text>
                &nbsp;
                <Text mt={0} sx={subTextStyle} fontSize={'16px'} fontWeight={600} color={'#6B6B6B'} lineHeight={'28px'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  et dolore magna aliqua. Ut enim ad minim veniam.</Text>

                <Button boxShadow={'0px 64.8148px 46.8519px rgba(24, 167, 185, 0.0759259), 0px 38.5185px 25.4815px rgba(24, 167, 185, 0.0607407), 0px 20px 13px rgba(24, 167, 185, 0.05), 0px 8.14815px 6.51852px rgba(24, 167, 185, 0.0392593), 0px 1.85185px 3.14815px rgba(24, 167, 185, 0.0240741)'} color={'white'} textTransform="capitalize" mt={9} variant={'unique'}>View All</Button>
            </Box>


            <Box backgroundSize={'cover'} bgPos={'center'} pos={'absolute'} right={35} top={-122} zIndex={-1} borderBottomLeftRadius={'290px'} w={'590px'} height={'100%'} bgRepeat={'no-repeat'} bgImage={`url(/images/stayStgHero.png)`}>
                <Box w={'120px'} h={'120px'} display={'flex'} alignItems={'center'} justifyContent={'center'} pos={'absolute'} bottom={'-50px'} right={'75px'} background={'rgba(33, 191, 211, 0.4)'} backdropFilter={'blur(50px)'}>
                    <BsArrowDown fontSize={'30px'} color={'white'} />
                </Box>
            </Box>
        </Box>
    )
}


export default StgBanner;