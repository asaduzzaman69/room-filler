import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import React from 'react'

const ScrollGrow = ({ children, scrollIcon }) => {

    const scrollIconStyle = {
        pos: 'absolute',
        right: 0,
        background: 'linear-gradient(270.99deg, #FFFFFF 36.3%, rgba(255, 255, 255, 0) 101.25%)',
        height: '100%',
        display: 'flex',
        alignItems: 'center'

    }
    return (

        <Box overflow={"hidden"} display={'flex'} overscrollX={'scroll'} pos='relative'>
            {children}
            {
                scrollIcon ? (
                    <Box sx={scrollIconStyle}>
                        {scrollIcon}
                    </Box>
                ) : (

                    <ChevronRightIcon pos={'absolute'} right={0} />
                )
            }
        </Box>
    )
}

export default ScrollGrow;
