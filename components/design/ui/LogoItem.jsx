import { Box, Flex, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import stateProvider from '../context/stateProvider';
import Questions from './Questions';

const LogoItem = () => {
  const { step } = useContext(stateProvider);

  const activeStyles = {
    fontSize: '2rem',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
  };

  const logoStyles = {
    position: 'absolute',
    width: '200px',
    height: '160px',
    left: '0',
    top: '0',
    zIndex: '10',
    background: 'rgba(201, 231, 255, .5)',
    borderRadius: '5px 5px 106.5px',
    fontSize: '2rem',
    color: '#313131',
    fontWeight: 'bold',
    alignItems: 'center',
    flexWrap: 'nowrap',
    cursor: 'pointer',
  };

  const boxStytes = {
    display: 'flex',
    marginLeft: '5rem',
    position: 'relative',
    zIndex: '10',
    gap: '.5rem',
  };

  return (
    <Box
      height='100%'
      backgroundImage={`url(/images/${step}.png)`}
      backgroundPosition='center'
      backgroundRepeat={'no-repeat'}
      backgroundSize='cover'
      position={'relative'}
    >
      <Box
        backgroundColor={'rgba(7, 203, 227, 0.67)'}
        width='100%'
        height={'100%'}
        position='absolute'
      ></Box>
      <Flex sx={{ ...logoStyles }}>
        <Box sx={{ ...boxStytes }}>
          <Text as='u'>Stay</Text>
          <Text color='#fff' as={'span'}>
            STG
          </Text>
        </Box>
      </Flex>
      <Flex sx={{ ...activeStyles }}>
        <Questions />
      </Flex>
    </Box>
  );
};

export default LogoItem;
