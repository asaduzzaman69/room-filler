import { Input, InputGroup, useOutsideClick } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';

const CustomInput = ({ sx, placeholder, children, value, onChange }) => {

    const [isInputFocused, setIsInputFocused] = useState(false);
    const ref = useRef();

    const labelDefaultStyle = {
        position: 'absolute',
        top: '15px',
        left: '12px',
        color: '#6B6B6B',
        fontWeight: 500,
        zIndex: 100,
        transition: 'all 0.2s',
        fontSize: '15px',
        padding: '0px 5px',

    }

    const labelFocusedStyle = {
        fontSize: '13px',
        top: '6px',
        left: '12px',
    }

    useOutsideClick({
        ref: ref,
        handler: () => setIsInputFocused(false),
    })

    console.log(value)

    return (
        <InputGroup pos={'relative'} sx={sx} border={'1px solid #E5E5E5'} borderRadius={'8px'} position={'relative'} display={'block'}>
            <label style={{ ...labelDefaultStyle, ...((!!value || isInputFocused) && labelFocusedStyle) }} htmlFor="">{placeholder}</label>
            <Input onChange={onChange} value={value} _focus={{
                border: 'none'
            }} border={'none'} height={'50px'} fontSize={'15px'} fontWeight={500} paddingTop={'22px'} mb={1} ref={ref} onFocus={() => setIsInputFocused(true)} />
            {children}
        </InputGroup>
    );
};

export default CustomInput;
