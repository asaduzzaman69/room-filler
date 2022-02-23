import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import React from 'react';



export const SearchFilteritem = ({ label, value, icon }) => {

    return (
        <Grid _first={{
            paddingLeft: '22px'
        }} mr={2} columnGap={'8px'} padding={'12px 10px'} gridTemplateColumns={'min-content 1fr'}>
            <GridItem>
                <Box mt={0.5}>
                    {icon}
                </Box>
            </GridItem>
            <GridItem>
                <Text fontSize={'16px'} fontWeight={600}>{label}</Text>
                <Text fontSize={'14px'} color={'#6B6B6B'} mt={'5px'} fontWeight={500} >{value}</Text>
            </GridItem>
        </Grid>
    )
}

const SearchFilter = () => {
    return (
        <Flex bg={'white'} overflow={'hidden'} borderRadius={'16px'} my={2} boxShadow={'0px 4px 20px rgba(0, 0, 0, 0.1)'} border={'1px solid #18A7B9'} width={'max-content'}>
            <SearchFilteritem
                label={'Check In'}
                value={'14 Jan 2022'}
                icon={<><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_127_710)">
                        <path d="M133.306 -361C23.8062 -324.04 25.986 -164.076 133.306 -206C248.5 -251 129.5 -371.5 20 -302.5C-145.479 -198.226 -126.772 358.5 193 366.5" stroke="#18A7B9" stroke-width="0.5" />
                        <path d="M7 11H9V13H7V11ZM7 15H9V17H7V15ZM11 11H13V13H11V11ZM11 15H13V17H11V15ZM15 11H17V13H15V11ZM15 15H17V17H15V15Z" fill="#18A7B9" />
                        <path d="M5 22H19C20.103 22 21 21.103 21 20V6C21 4.897 20.103 4 19 4H17V2H15V4H9V2H7V4H5C3.897 4 3 4.897 3 6V20C3 21.103 3.897 22 5 22ZM19 8L19.001 20H5V8H19Z" fill="#18A7B9" />
                    </g>
                    <defs>
                        <clipPath id="clip0_127_710">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg></>}
            />
            <SearchFilteritem
                label={'Check Out'}
                value={'22 Jan 2022'}
                icon={<>                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_127_710)">
                        <path d="M133.306 -361C23.8062 -324.04 25.986 -164.076 133.306 -206C248.5 -251 129.5 -371.5 20 -302.5C-145.479 -198.226 -126.772 358.5 193 366.5" stroke="#18A7B9" stroke-width="0.5" />
                        <path d="M7 11H9V13H7V11ZM7 15H9V17H7V15ZM11 11H13V13H11V11ZM11 15H13V17H11V15ZM15 11H17V13H15V11ZM15 15H17V17H15V15Z" fill="#18A7B9" />
                        <path d="M5 22H19C20.103 22 21 21.103 21 20V6C21 4.897 20.103 4 19 4H17V2H15V4H9V2H7V4H5C3.897 4 3 4.897 3 6V20C3 21.103 3.897 22 5 22ZM19 8L19.001 20H5V8H19Z" fill="#18A7B9" />
                    </g>
                    <defs>
                        <clipPath id="clip0_127_710">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg></>}
            />
            <SearchFilteritem
                label={'Guests'}
                value={'4 Guests'}
                icon={<>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 13C15.3 13 13.43 13.34 12 14C10.57 13.33 8.7 13 7.5 13C5.33 13 1 14.08 1 16.25V19H23V16.25C23 14.08 18.67 13 16.5 13ZM12.5 17.5H2.5V16.25C2.5 15.71 5.06 14.5 7.5 14.5C9.94 14.5 12.5 15.71 12.5 16.25V17.5ZM21.5 17.5H14V16.25C14 15.79 13.8 15.39 13.48 15.03C14.36 14.73 15.44 14.5 16.5 14.5C18.94 14.5 21.5 15.71 21.5 16.25V17.5ZM7.5 12C9.43 12 11 10.43 11 8.5C11 6.57 9.43 5 7.5 5C5.57 5 4 6.57 4 8.5C4 10.43 5.57 12 7.5 12ZM7.5 6.5C8.6 6.5 9.5 7.4 9.5 8.5C9.5 9.6 8.6 10.5 7.5 10.5C6.4 10.5 5.5 9.6 5.5 8.5C5.5 7.4 6.4 6.5 7.5 6.5ZM16.5 12C18.43 12 20 10.43 20 8.5C20 6.57 18.43 5 16.5 5C14.57 5 13 6.57 13 8.5C13 10.43 14.57 12 16.5 12ZM16.5 6.5C17.6 6.5 18.5 7.4 18.5 8.5C18.5 9.6 17.6 10.5 16.5 10.5C15.4 10.5 14.5 9.6 14.5 8.5C14.5 7.4 15.4 6.5 16.5 6.5Z" fill="#18A7B9" />
                    </svg>

                </>}
            />
            <Box bg={'#2AD1E6'}>
                <Flex height={'100%'} alignItems={'center'}>
                    <Button p={'0px 35px'} textTransform={'capitalize'} fontWeight={600} bg={'transparent'}>Search</Button>
                </Flex>
            </Box>

        </Flex>
    )
}

export default SearchFilter;
