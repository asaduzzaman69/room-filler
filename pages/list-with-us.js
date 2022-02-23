import { Box, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AuthModal } from '../components/AuthModal';
import StgGetStarted from '../components/StgGetStarted';
import StgHeader from '../components/StgHeader';

const ListWithUs = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(!isOpen);
    return (
        <Box>
            <Box pos={'relative'} sx={{
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }} height={'70vh'} bgImage={' linear-gradient(180deg, rgba(255, 255, 255, 0.94) 10.35%, rgba(255, 255, 255, 0) 76.66%), url("images/list-with-us-home.jpg")'}>
                <StgHeader />
                <Flex justifyContent={'center'}>
                    <StgGetStarted setIsOpen={handleClose} />
                </Flex>

            </Box>

            <AuthModal setIsOpen={handleClose} isOpen={isOpen} />
        </Box>
    )
};


export default ListWithUs;
