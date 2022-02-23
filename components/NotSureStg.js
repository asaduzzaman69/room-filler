import { Box, Button, Container, Grid, GridItem, Text } from '@chakra-ui/react';
import React from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons'



const NotSureCard = ({ children, btnLabel, imageUrl }) => {

    return (
        <Box p={10} height={'650px'} bgRepeat={'no-repeat'} bgPosition={'center'} bgSize={'cover'} bgImage={`${imageUrl}`} borderRadius={'15px'} >
            <Text>{children}</Text>
            <Button p={'25px 40px'} background={'#18A7B9'} mt={4} color={'white'} borderRadius={'40px 5px'}>{btnLabel}  <ArrowForwardIcon /></Button>
        </Box>
    )

}

const NotSureStg = () => {

    const textStyle = {
        fontSize: '50px',
        color: 'white',
        fontWeight: 600,
    }
    return (

        <Box pos={'relative'}/*  _before={{
            content: '""',
            pos: 'absolute',
            left: -100,
            bottom: 0,
            borderRadius: '106.5px 5px 5px 5px',
            transform: 'rotate(270deg)',
            zIndex: -1,
            background: '#c9e7ff96',
            w: '300px',
            h: '300px',
        }}  */p={'75px'} my={'120px'} borderRadius={'40px'} background={'#F4F6F6'} >
            <Grid gridTemplateColumns={'1fr 1fr'} gridColumnGap={'100px'}>
                <GridItem>
                    <NotSureCard imageUrl={'/images/noteSureNewImage.png'} btnLabel={'plan now'}>
                        <Text sx={textStyle}>
                            Not sure <Text color={'#18A7B9'} as={'span'}>what to do</Text> during your stay
                        </Text>
                    </NotSureCard>
                </GridItem>
                <GridItem>
                    <NotSureCard imageUrl={'/images/image532.png'} btnLabel={'plan now'}>
                        <Text sx={textStyle}>
                            Have a <Text color={'#18A7B9'} as={'span'}>Place</Text>
                        </Text>
                    </NotSureCard>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default NotSureStg;
