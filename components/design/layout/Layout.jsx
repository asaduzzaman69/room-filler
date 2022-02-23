import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import Forms from '../ui/Forms';
import LogoItem from '../ui/LogoItem';

const Layout = () => {
  return (
    <Grid height='100vh' templateColumns='repeat(2,1fr)'>
      <GridItem bg='rgb(8, 155, 171)'>
        <LogoItem />
      </GridItem>
      <GridItem overflow='hidden' height={'100%'}>
        <Forms />
      </GridItem>
    </Grid>
  );
};

export default Layout;
