import { SearchIcon, SmallAddIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Flex, Image, Input, InputGroup, InputLeftElement, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import StgHeader from '../components/StgHeader';



import DataTable from 'react-data-table-component';


const labelStyle = {
    fontSize: '16px',
    fontWeight: 500,

}
const columns = [
    {
        name: 'Title',
        selector: row => row.title,
        sortable: true,
        cell: (row) => (
            <>
                <Image w={'113px'} height={'60px'} borderRadius={'8px'} src='https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' />
                <Text sx={labelStyle} ml={6}>
                    Modern Winter gateway |
                    4 Guest
                </Text>
            </>

        )



    },
    {
        name: 'Status',
        selector: row => row.year,
        sortable: true,
        cell: () => (
            <Flex alignItems={'center'}>
                <Box bg={'#259521'} borderRadius={'100%'} w={'10px'} h={'10px'} />
                <Text sx={labelStyle} ml={2}>Listed</Text>
            </Flex>
        ),
        maxWidth: '178px'

    },
    {
        name: 'Platimum',
        selector: row => row.year,
        sortable: true,
        cell: () => (
            <Text sx={labelStyle}>Yes</Text>
        ),
        maxWidth: '178px'
    },
    {
        name: 'Location',
        selector: row => row.year,
        sortable: true,
        cell: () => (
            <Text sx={labelStyle}>13 Trenton Ave. Veyo, UT 84782</Text>
        )
    },
];

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
]

const customStyles = {
    rows: {
        style: {
            padding: '18px 0px', // override the row height
            borderBottom: '2px solid rgba(0, 0, 0, 0.08);'
        },
    },
    headCells: {
        style: {
            '&:nth-child(1), &:nth-child(2) ': {
                opacity: 0
            }
        }
    }

};


const MyListing = () => {


    const btnStyle = {
        border: '2px solid #313131',
        borderRadius: '14px',
        fontSize: '16px',
        bg: 'transparent',
        padding: '22px 20px'
    }

    const inputStyle = {
        bg: '#F7F7F7',
        borderRadius: '50px'
    }
    return (
        <Box>
            <StgHeader isListing />
            <br />
            <br />
            <Container maxW={'container.xl'}>
                <Flex>
                    <Text fontSize={'28px'} fontWeight={500} mb={3} >2 Listings</Text>
                    <Spacer />
                    <Button sx={btnStyle}>
                        <SmallAddIcon w={'24px'} h={'24px'} />
                        <Text ml={2} textTransform={'capitalize'}>

                            Create listing
                        </Text>
                    </Button>
                </Flex>

                <Box ml={'-4px'} mb={4} w={'100%'} maxW={'500px'}>
                    <InputGroup sx={inputStyle} >
                        <InputLeftElement
                            sx={{
                                paddingLeft: '10px'
                            }}
                            children={<SearchIcon />}
                        />
                        <Input paddingLeft={'45px'} borderRadius={'50px'} border="none" placeholder='Search listing' />
                    </InputGroup>
                </Box>

                <Box>
                    <DataTable
                        columns={columns}
                        data={data}
                        selectableRows
                        customStyles={customStyles}
                        sortIcon={
                            <>
                                <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.65726 17.1539C4.69549 17.2094 4.74663 17.2548 4.8063 17.2862C4.86596 17.3175 4.93236 17.3339 4.99976 17.3339C5.06716 17.3339 5.13356 17.3175 5.19322 17.2862C5.25289 17.2548 5.30403 17.2094 5.34226 17.1539L9.09226 11.7372C9.13567 11.6748 9.16112 11.6016 9.16586 11.5257C9.17059 11.4497 9.15443 11.374 9.11913 11.3066C9.08383 11.2392 9.03073 11.1828 8.96561 11.1434C8.90049 11.1041 8.82583 11.0834 8.74976 11.0835H1.24976C1.17386 11.0838 1.09948 11.1048 1.03463 11.1442C0.96977 11.1837 0.916886 11.24 0.881664 11.3072C0.846441 11.3745 0.830212 11.45 0.834722 11.5258C0.839232 11.6016 0.86431 11.6747 0.90726 11.7372L4.65726 17.1539Z" fill="#CCCCCC" />
                                    <path d="M5.34274 0.846086C5.30451 0.790569 5.25337 0.745176 5.1937 0.713817C5.13404 0.682458 5.06764 0.666073 5.00024 0.666073C4.93284 0.666073 4.86644 0.682458 4.80678 0.713818C4.74711 0.745176 4.69596 0.790569 4.65774 0.846086L0.90774 6.26275C0.864333 6.32523 0.83888 6.39841 0.834143 6.47434C0.829406 6.55026 0.845567 6.62604 0.880871 6.69342C0.916175 6.76081 0.969272 6.81723 1.03439 6.85656C1.09951 6.89589 1.17417 6.91662 1.25024 6.9165L8.75024 6.9165C8.82614 6.91619 8.90052 6.89519 8.96537 6.85577C9.03023 6.81635 9.08311 6.75999 9.11834 6.69276C9.15356 6.62552 9.16979 6.54996 9.16528 6.4742C9.16077 6.39843 9.13569 6.32533 9.09274 6.26275L5.34274 0.846086Z" fill="#CCCCCC" />
                                </svg>

                            </>
                        }
                    />
                </Box>
            </Container>
        </Box>
    )
}
export default MyListing
