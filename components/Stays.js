

import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import StaysItem from './StaysItem';
const Stays = ({ config }) => {
    return (
        <Box w={'1289px'}>
            <Grid gridColumnGap={'16px'} rowGap={'48px'} gridTemplateColumns={'repeat(4, minmax(0 , 1fr))'}>
                {
                    config.map((el) => <GridItem>
                        <StaysItem {...config} />
                    </GridItem>)
                }
            </Grid>

            <Flex py={'70px'} flexDir={'column'} justifyContent={'center'} alignItems="center">
                <Text>See more</Text>
                <ChevronDownIcon />
            </Flex>
        </Box>

    );
};

export default Stays;
