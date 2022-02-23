import { ArrowDownIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Container, Flex, Grid, HStack, Tag, Text } from '@chakra-ui/react';
import React from 'react'
import Layout from '../components/layout';
import TripBlog from '../components/TripBlog';
import TripPlannerModal from '../components/TripPlannerModal';

const TripPlanner = () => {

    const textStyle = {
        fontWeight: 600,
        fontSize: '50px',
        textTransform: 'capitalize'
    }

    const tagStyle = {
        color: '#6B6B6B',
        background: 'transparent',
        border: '1px solid currentColor',
        padding: '6px 20px',
        borderRadius: '8px'

    }
    return (
        <Layout>
            <br />

            <Container maxW="container.xl" pb={'100px'}>
                <Text sx={textStyle}>
                    <Text mr={3} color={'#18A7B9'} as={'span'}>
                        plan
                    </Text>
                    your trip
                </Text>
                <HStack my={5} mb={6} >
                    <Tag sx={tagStyle}>Food</Tag>
                    <Tag sx={tagStyle}>Coffee</Tag>
                    <Tag sx={tagStyle}>Lakes</Tag>
                    <Tag sx={tagStyle}>Hikes</Tag>
                    <Tag sx={tagStyle}>Golf</Tag>
                    <Tag sx={tagStyle}>Kids</Tag>
                </HStack>

                <Grid pos={'relative'} _after={{
                    w: '100px',
                    h: '116px',
                    content: '""',
                    pos: 'absolute',
                    bottom: '-51px',
                    left: '-37px',
                    background: 'url("/images/DOTS.png")',
                    zIndex: -1

                }} rowGap={'45px'} columnGap={'20px'} gridTemplateColumns={'repeat(4, minmax(0, 1fr))'}>
                    <TripBlog />
                    <TripBlog />
                    <TripBlog />
                    <TripBlog />
                    <TripBlog />
                    <TripBlog />
                    <TripBlog />
                    <TripBlog />
                    <TripBlog />
                    <TripBlog />
                    <TripBlog />
                    <TripBlog />
                </Grid>
                <Flex mt={8} flexDir={'column'} justifyContent={'center'} alignItems="center">
                    <Text color={'#6B6B6B'} fontWeight={500} >See more</Text>
                    <ChevronDownIcon />
                </Flex>
            </Container>
            <TripPlannerModal />
        </Layout>
    )
}

export default TripPlanner;
