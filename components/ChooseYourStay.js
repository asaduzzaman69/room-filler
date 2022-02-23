import React, { useState } from 'react';
import { Box, Tag, Text } from '@chakra-ui/react';

import Stays from './Stays';
import TagFilter from './TagFilter';
import SearchFilter from './SearchFilter';

const config = [1, 2, 3, 4, 5, 6, 7, 8]

const ChooseYourStay = ({ properties }) => {
    const [selectedValue, setSelectedValue] = useState();
    return (
        <div>
            <Text mb={6} fontWeight={600} fontSize={'46px'}> <Text as={'span'} color={'#18A7B9'}> Choose </Text>  Your Stay</Text>
            <SearchFilter />
            <TagFilter selectedValue={selectedValue} setSelectedValue={setSelectedValue} />

            <Stays config={config} />

        </div>
    );
};



export default ChooseYourStay;
