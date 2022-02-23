import { ArrowDownIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { HStack, Tag } from '@chakra-ui/react';
import React from 'react';


const tagsArray = ['platinum', 'Resorts', 'Pools', 'Private Homes', 'shard space']

const TagFilter = ({ selectedValue = 'platinum', setSelectedValue }) => {

    const defaultStyle = {
        border: '1px solid #6B6B6B',
        borderRadius: '12px',
        padding: '10px 16px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#6B6B6B',
        background: 'white'

    }

    const activeStyle = {
        border: '1.5px solid #18A7B9',
        color: '#313131'

    }
    return (

        <HStack my={'40px'}>
            {
                tagsArray.map((el) => <Tag textTransform={'capitalize'} onClick={() => setSelectedValue(el)} sx={{
                    ...defaultStyle, ...(selectedValue === el && activeStyle)
                }}>{el} {selectedValue === el && <ChevronDownIcon />}</Tag>)
            }
        </HStack>
    )
}

export default TagFilter;
