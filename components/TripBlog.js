import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react'

const TripBlog = () => {

    const headingStyle = {
        fontSize: '24px',
        fontWeight: 600
    }

    const subheadingStyle = {
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '28px',
        color: '#6B6B6B'
    }
    return (

        <Box borderRadius={'16px'} p={4} pb={6} bg={'white'} boxShadow={'0px 20px 50px rgba(198, 217, 225, 0.2)'}>
            <Image src='/images/trip-planner.png' />
            <Text mt={5} mb={1} sx={headingStyle}>Glenwild Golf Club</Text>
            <Text sx={subheadingStyle}>Lorem ipsum dolor sit amet, elitod eni consectetur adipiscing elit, sed do mo eiusmod tempor incididunt ut sed.</Text>
        </Box>
    )
}

export default TripBlog;
