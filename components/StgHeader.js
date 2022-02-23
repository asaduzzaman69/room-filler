import React, { useState } from 'react';

import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';

export const StgLogo = () => {

    return (
        <Flex fontSize={'28px'} fontWeight={700} zIndex={2} >
            <Text textDecoration={'underline'} display={'flex'} >Stay</Text>
            <Text textDecor={'none'} color={' #18A7B9'} textTransform={'uppercase'}>Stg</Text>
        </Flex>

    )
}


const StgHeader = ({ isListing = false, cssStyle = {} }) => {

    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const listStyle = {
        color: ' #6B6B6B',
        fontWeight: 'normal',
        fontSize: '14px',
        padding: '7px 0px',
        ':hover': {
            background: 'red'
        }
    }

    const activeLogo = {
        content: `""`,
        background: '#C9E7FF',
        opacity: 0.4,
        borderRadius: '106.5px 5px 5px 5px',
        transform: 'rotate(180deg)',
        width: '150px',
        height: '125px',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1
    }
    return (
        <Flex p={'20px 60px'} sx={isListing && {
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
        }} {...cssStyle} _before={!isListing && activeLogo}>
            <StgLogo />
            <Spacer />

            <Flex alignItems={'center'}>

                <ul style={{ display: 'flex', alignItems: 'center', listStyle: 'none' }}>
                    <li className={`stg-header-list `}>
                        <a href='/' className={`${router.pathname === '/' && 'stg-header-list-text-active'}`}>
                            Home
                        </a>
                    </li>
                    <li className={`stg-header-list`}>
                        <a href='/trip-planner' className={`${router.pathname === '/trip-planner' && 'stg-header-list-text-active stg-header-list-text-active-2'}`}>
                            Trip planner
                        </a>
                    </li>
                    <li className={`stg-header-list`}>
                        <a href='/list-with-us' style={{
                        }} className={`${router.pathname === '/list-with-us' && 'stg-header-list-text-active'}`}>
                            List With US
                        </a>
                    </li>

                </ul>
                <Button onClick={() => setShowModal(!showModal)} pos={'relative'} padding={'25px 20px'} borderRadius={'80px'} color={'white'} size={'sm'} background={'#18A7B9'}  >
                    <GiHamburgerMenu size={'25px'} />
                    <Box ml={4}>
                        <FaUserCircle size={'25px'} />
                    </Box>
                    {
                        showModal && (

                            <Box sx={{
                                boxShadow: '0px 0px 50px rgba(198, 217, 225, 0.3)',
                                position: 'absolute',
                                width: '200px',
                                bottom: '-110px',
                                left: '-93px',
                                p: '20px',
                                bg: 'white',
                                borderRadius: '12px'
                            }}>
                                <ul style={{
                                    listStyle: 'none',
                                    textAlign: 'left'
                                }}>
                                    <li style={listStyle} >Log in</li>
                                    <li style={listStyle}>Sign up</li>
                                </ul>
                            </Box>
                        )
                    }


                </Button>

            </Flex>
        </Flex>
    )
};

export default StgHeader;
