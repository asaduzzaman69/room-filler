import { Text } from '@chakra-ui/react';
import { useContext } from 'react';
import stateProvider from '../context/stateProvider';

const Options = ({ text }) => {
  const ctx = useContext(stateProvider);

  const optionsStyles = {
    background: '#fff',
    borderColor: '#E5E5E5',
    p: '1rem',
    _hover: {
      borderRadius: '8px',
      background: 'rgba(24, 167, 185, 0.1)',
    },
  };

  const selectHandler = (e) => {
    const value = e.target.innerText;
    ctx.dropChange(value);
  };

  return (
    <Text onClick={selectHandler} sx={{ ...optionsStyles }}>
      {text}
    </Text>
  );
};

export default Options;
