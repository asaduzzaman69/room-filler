import { ArrowForwardIcon, ChevronDownIcon, ChevronRightIcon, SmallAddIcon } from '@chakra-ui/icons';
import { border, Box, Button, Circle, Flex, Grid, GridItem, Heading, HStack, Image, Input, Spacer, Text } from '@chakra-ui/react'
import React from 'react';
import ScrollGrow from '../../components/ScrollGlow';
import StgHeader from './../../components/StgHeader';
import SVG from './../../components/design/offers/Svg';
import { path } from './../../components/design/offers/Offer';
import Inputs from '../../components/design/input/Inputs';


const EditPreviewWrapper = ({ children, label }) => {
    const textStyle = {
        fontWeight: 500,
        fontSize: '18px',
        textTransform: 'capitalize'
    }
    return (

        <Box mt={10}>
            <Flex mb={3} alignItems={'center'}>
                <Text sx={textStyle}>{label}</Text>

                <Spacer />
                <Text sx={{
                    fontWeight: 'normal',
                    fontsize: '16px',
                    textDecor: 'underline',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    Edit
                    <ChevronRightIcon fontSize={'24px'} color={'#18A7B9'} />
                </Text>
            </Flex>
            {children}
        </Box>
    )
}

const ListingDetails = () => {

    const listTextStyle = {
        fontWeight: 500,
        fontSize: '18px',
        marginBottom: '12px'

    }

    const boxStyle = {
        width: '10px',
        height: '10px',
        background: '#259521',
        borderRadius: '12px',
        marginRight: '7px',
    }
    const cubeStyle = {
        width: '10px',
        height: '10px',
        background: '#259521',
        border: '2px solid #18A7B9',
        transform: 'rotate(-45deg)',
        background: 'transparent',
        marginRight: '7px',
        marginLeft: '14px'



    }
    return (

        <Box>
            <StgHeader isListing={true} />

            <Box px={'70px'} pt={'30px'}>

                <Grid gridTemplateColumns={'400px minmax(0 ,1fr)'} columnGap={'100px'}>
                    <GridItem>
                        <Heading fontFamily={'inherit'} fontWeight={600} fontSize={'42px'} lineHeight={'120%'}>Modern Winter Gateway | 4 Guest</Heading>
                        <Text fontWeight={500} color={'#18A7B9'} mt={6}>Edit Listing <ChevronDownIcon /></Text>

                        <Box mb={4}>
                            <Text mt={10} mb={4} fontWeight={600} fontSize={'24px'} color={'#6B6B6B'}>Listing Details</Text>
                            <Box py={6} paddingLeft={7} borderLeft={'2px solid rgba(0, 0, 0, 0.08)'}>
                                <Text sx={listTextStyle}>Photos</Text>
                                <Text sx={listTextStyle}>Amenities</Text>
                                <Text sx={listTextStyle}>Location</Text>
                                <Text sx={listTextStyle}>Property & rooms</Text>
                                <Text sx={listTextStyle}>Info</Text>
                            </Box>
                        </Box>
                        <Box mt={10} w={'100%'} maxW={'300px'}>
                            <Button color={'#6B6B6B'} borderRadius={'12px'} h={'52px'} borderColor={'#18A7B9'} variant={'outline'} w={'100%'} mb={3} >
                                <Text fontWeight={600}> <SmallAddIcon fontSize={'22px'} /> Add Owner</Text>
                            </Button>
                            <Box mt={1} p={5} borderRadius={'16px'} border={'1px solid #424242'} >
                                <Input border={'2px solid #E5E5E5 !important'} placeholder='Email' />
                                <Button borderRadius={'8px'} height={'42px'} bg={'#18A7B9'} color={'white'} mt={3} textTransform={'capitalize'} w={'100%'}>Add</Button>
                            </Box>
                        </Box>
                    </GridItem>
                    <GridItem>

                        <Flex justifyContent={'flex-end'} alignItems={'center'}>
                            <Text sx={{ ...listTextStyle, marginBottom: '0px', marginRight: "12px" }} display={'flex'} alignItems={'center'} > <span style={boxStyle}>&nbsp;</span> Listed</Text>
                            <Text sx={{ ...listTextStyle, marginBottom: '0px', marginRight: "12px" }} display={'flex'} alignItems={'center'}> <span style={cubeStyle}>&nbsp;</span> Platinum</Text>
                            <Button marginLeft={'24px'} borderColor={'#18A7B9'} variant={'outline'}>
                                preview
                            </Button>
                        </Flex>

                        {/* Image Preview */}
                        <EditPreviewWrapper label={'Photos'}>
                            <ScrollGrow scrollIcon={<Circle color={'white'} size={'40px'} bg={' #18A7B9'}>
                                <ArrowForwardIcon />
                            </Circle>}>
                                <HStack>
                                    <Image src='/images/MaskGroup.png' />
                                    <Image src='/images/MaskGroup.png' />
                                    <Image src='/images/MaskGroup.png' />                                    <Image src='/images/MaskGroup.png' />
                                    <Image src='/images/MaskGroup.png' />
                                    <Image src='/images/MaskGroup.png' />                                    <Image src='/images/MaskGroup.png' />
                                    <Image src='/images/MaskGroup.png' />
                                    <Image src='/images/MaskGroup.png' />

                                </HStack>
                            </ScrollGrow>
                        </EditPreviewWrapper>
                        {/* Amenities */}

                        <EditPreviewWrapper label={'amenities'}>
                            <ScrollGrow scrollIcon={<Circle color={'white'} size={'40px'} bg={' #18A7B9'}>
                                <ArrowForwardIcon />
                            </Circle>} >

                                <Grid gridAutoColumns={'200px'} gridAutoFlow={'column'} columnGap={'20px'} gridTemplateRow={'1fr'}>
                                    {
                                        path.map(({ file, name }) => <SVG path={file} name={name} />)
                                    }
                                </Grid>

                            </ScrollGrow>
                        </EditPreviewWrapper>

                        {/* Location */}

                        <EditPreviewWrapper label={'Location'}>
                            <ScrollGrow scrollIcon={<Circle color={'white'} size={'40px'} bg={' #18A7B9'}>
                                <ArrowForwardIcon />
                            </Circle>} >

                                <Grid gridAutoColumns={'200px'} gridAutoFlow={'column'} columnGap={'20px'} gridTemplateColumns={'1fr 1fr 90px 1fr'}>
                                    <Inputs value={'1426 North Street'} placeholder={'street'} primaryStyles={{
                                        border: '2px solid #E5E5E5',
                                        borderRadius: '8px'
                                    }} />
                                    <Inputs value={'Salt Lake City'} placeholder={'city'} primaryStyles={{
                                        border: '2px solid #E5E5E5',
                                        borderRadius: '8px'
                                    }} />
                                    <Inputs value={'UT'} placeholder={'state'} primaryStyles={{
                                        border: '2px solid #E5E5E5',
                                        borderRadius: '8px'
                                    }} />
                                    <Inputs value={84095} placeholder={'Zip code'} primaryStyles={{
                                        border: '2px solid #E5E5E5',
                                        borderRadius: '8px'
                                    }} />

                                </Grid>

                            </ScrollGrow>
                        </EditPreviewWrapper>
                        {/* Property & rooms */}

                        <EditPreviewWrapper label={'Property & rooms'}>
                            <ScrollGrow scrollIcon={<Circle color={'white'} size={'40px'} bg={' #18A7B9'}>
                                <ArrowForwardIcon />
                            </Circle>} >

                                <Grid gridAutoColumns={'200px'} gridAutoFlow={'column'} columnGap={'20px'} gridTemplateRow={'1fr'}>
                                    {
                                        path.map(({ file, name }) => <Flex borderRadius="12px" py={8} justifyContent={'center'} border={'2px solid #E5E5E5'}>
                                            15 guests
                                        </Flex>)
                                    }
                                </Grid>

                            </ScrollGrow>
                        </EditPreviewWrapper>
                        <EditPreviewWrapper label={'info'}>
                            <ScrollGrow scrollIcon={<Circle color={'white'} size={'40px'} bg={' #18A7B9'}>
                                <ArrowForwardIcon />
                            </Circle>} >

                                <Grid gridAutoColumns={'200px'} gridAutoFlow={'column'} columnGap={'20px'} gridTemplateColumns={'1fr 1fr  2fr'}>
                                    <Box>
                                        <Text mb={2} textAlign={'center'}>Property type</Text>
                                        <Flex py={8} border={'2px solid #E5E5E5'} borderRadius={'16px'} flexDir={'column'} alignItems={'center'}>
                                            <Image src='/images/Vector (2).png' />
                                            <Text>Resort</Text>
                                        </Flex>
                                    </Box>
                                    <Box>
                                        <Text mb={2} textAlign={'center'}>Property type</Text>
                                        <Flex p={4} border={'2px solid #E5E5E5'} borderRadius={'16px'} flexDir={'column'} alignItems={'center'}>
                                            <Text textAlign={'center'}>Mordern Winter Gateway | 4 Guest</Text>
                                        </Flex>
                                    </Box>
                                    <Box>
                                        <Text mb={2} textAlign={'center'}>Property description</Text>
                                        <Flex py={8} border={'2px solid #E5E5E5'} borderRadius={'16px'} flexDir={'column'} alignItems={'center'}>
                                            <Text px={4}>Lorem ipsum dolor sit amet, con consectetur felis te adipiscing el elit, s\ </Text>
                                        </Flex>
                                    </Box>
                                </Grid>

                            </ScrollGrow>
                        </EditPreviewWrapper>
                    </GridItem>
                </Grid>
            </Box>
        </Box>
    )
}


export default ListingDetails
