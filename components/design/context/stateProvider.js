import { createContext, useReducer, useState } from 'react';

const stateProvider = createContext({
  isClicked: false,
  placeName: '',
  selectedName: '',
  dropChange: () => {},
  pageChange: () => {},
  pageBack: () => {},
  description: '',
});

const defaultValue = {
  guests: 1,
  beds: 1,
  bedrooms: 1,
  bathrooms: 1,
  description: '',
  title: '',
  selectedValue: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'Guestsinc':
      return {
        guests: state.guests < 15 ? state.guests++ : 1,
        ...state,
      };
    case 'Guestsdec':
      return { guests: state.guests > 1 ? state.guests-- : 1, ...state };
    default:
      state;
  }
  switch (action.type) {
    case 'Bedsinc':
      return { beds: state.beds < 7 ? state.beds++ : 1, ...state };
    case 'Bedsdec':
      return { beds: state.beds > 1 ? state.beds-- : 1, ...state };
    default:
      state;
  }
  switch (action.type) {
    case 'Bedroomsinc':
      return { bedrooms: state.bedrooms < 5 ? state.bedrooms++ : 1, ...state };
    case 'Bedroomsdec':
      return { bedrooms: state.bedrooms > 1 ? state.bedrooms-- : 1, ...state };
    default:
      state;
  }
  switch (action.type) {
    case 'Bathroomsinc':
      return {
        bathrooms: state.bathrooms < 7 ? state.bathrooms++ : 1,
        ...state,
      };
    case 'Bathroomsdec':
      return {
        bathrooms: state.bathrooms > 1 ? state.bathrooms-- : 1,
        ...state,
      };
    case 'title':
      return {
        title: action.value,
        ...state,
      };
    default:
      state;
  }
};

export const StateContext = ({ children }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [onClick, setOnClick] = useState(false);
  const [step, setStep] = useState(1);
  const [placeName, setPlaceName] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [progress, setProgress] = useState(0);

  const [state, dispatch] = useReducer(reducer, defaultValue);

  const dropChange = (value) => {
    setIsClicked(!isClicked);
    setSelectedName(value);
    setPlaceName(value);
  };

  const pageChange = () => {
    if (step) {
      setStep(step + 1);
    }
    if (step === 9) {
      setStep(step);
    }
    setOnClick(true);
    if (progress >= 100) {
      setProgress(progress);
    } else {
      setProgress(progress + 100 / 8);
    }
  };
  const pageBack = () => {
    if (step) {
      setStep(step - 1);
    }
    if (step === 1) {
      setStep(step);
    }
    setOnClick(!onClick);

    if (progress <= 100 / 9) {
      setProgress(0);
    } else setProgress(progress - 100 / 8);
  };
  const contextValue = {
    isClicked,
    placeName,
    selectedName,
    step,
    onClick,
    progress,
    dropChange,
    pageChange,
    pageBack,
    state,
    dispatch,
    setPlaceName,
    setSelectedName,
  };
  return (
    <stateProvider.Provider value={contextValue}>
      {children}
    </stateProvider.Provider>
  );
};

export default stateProvider;
