import React from 'react';
import { Box, Circle, Flex, Grid, GridItem, HStack, Image, Input, InputGroup, InputRightElement, Square, Text } from '@chakra-ui/react'
import { StgLogo } from './StgHeader';

import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import { CheckIcon } from '@chakra-ui/icons';

const StgFooter = () => {
    const footerLink = {
        fontWeight: 500,
        fontSize: '16px',
        color: '#6B6B6B',
        display: 'inline-block',
        marginBottom: '16px'
    }
    return (

        <Box bg={'#F4F6F6'} as={'footer'} px={'75px'}>
            <Grid px={'100px'} py={'90px'} gridTemplateColumns={'1fr 1fr 1fr'}>
                <GridItem>
                    <ul style={{
                        listStyle: 'none'
                    }} >
                        <li>
                            <a style={footerLink}>Home</a>
                        </li>
                        <li>
                            <a style={footerLink}>Trip planer</a>
                        </li>
                        <li>
                            <a style={footerLink}>List with us</a>
                        </li>
                    </ul>
                </GridItem>

                <GridItem >
                    <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} textAlign='center' >
                        <StgLogo />
                        <Text mt={3} fontSize={'16px'} color={'#6B6B6B'}>Lorem ipsum dolor sit el <br /> amet, consectet.</Text>

                    </Flex>

                </GridItem>

                <GridItem justifySelf={'flex-end'}>
                    <Box>

                        <Text fontSize={'16px'} fontWeight={600}>Get In Touch</Text>
                        <InputGroup display={'flex'} alignItems={'center'} borderRadius={'4px'} mt={6} bg={'white'}>
                            <Input _placeholder={{
                                color: '#6B6B6B',
                                fontSize: '12px'
                            }} border={'none'} py={'22px'} placeholder='Enter your mail' />
                            <InputRightElement children={<Image src='/images/arrow.png' />} />
                        </InputGroup>
                        <HStack spacing={4} mt={7}>
                            <Square sx={{
                                borderRadius: '8px',
                                background: '#18A7B9'
                            }} size='35px' borderRadius={''} bg='purple.700' color='white'>
                                <FaFacebookF />
                            </Square>
                            <Square sx={{
                                borderRadius: '8px',
                                background: '#18A7B9'
                            }} size='35px' borderRadius={''} bg='purple.700' color='white'>
                                <FaTwitter />
                            </Square>
                            <Square sx={{
                                borderRadius: '8px',
                                background: '#18A7B9'
                            }} size='35px' borderRadius={''} bg='purple.700' color='white'>
                                <FaLinkedinIn />
                            </Square>
                        </HStack>
                    </Box>
                </GridItem>
            </Grid>

            <Box sx={{
                border: "1px solid #ededed"
            }} />
            <Box textAlign={'center'} py={'50px'} >
                <Text color={'#6B6B6B'} fontWeight={500} fontSize={'13px'}>@2022 Stay STG - All Rights Reserved</Text>

            </Box>



        </Box>
    )
}


export default StgFooter