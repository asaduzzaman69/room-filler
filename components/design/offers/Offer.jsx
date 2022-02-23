import { Grid, GridItem, Text, useMediaQuery } from '@chakra-ui/react';
import SVG from './Svg';

export const path = [
  { file: '/images/svgfile/pool.svg', name: 'Pool' },
  { file: '/images/svgfile/hottub.svg', name: 'Hot Tub' },
  { file: '/images/svgfile/patio.svg', name: 'Patio' },
  { file: '/images/svgfile/bbqgrill.svg', name: 'BBQ Grill' },
  { file: '/images/svgfile/firepit.svg', name: 'Fire Pit' },
  { file: '/images/svgfile/pooltable.svg', name: 'Pool Table' },
  { file: '/images/svgfile/indoorfireplace.svg', name: 'Indoor' },
  { file: '/images/svgfile/outdoordiningarea.svg', name: 'Outdoor dining area' },
  { file: '/images/svgfile/exerciseequipment.svg', name: 'Exercise equipment' },
];

const Offer = () => {
  const [isLargerThan1400] = useMediaQuery('(min-width: 1400px)');
  const favourite = [
    { file: '/images/svgfile/wifi.svg', name: 'Wifi' },
    { file: '/images/svgfile/tv.svg', name: 'Tv' },
    { file: '/images/svgfile/kitchen.svg', name: 'Kitchen' },
    { file: '/images/svgfile/washer.svg', name: 'Washer' },
    { file: '/images/svgfile/parking.svg', name: 'Free parking on premises' },
    { file: '/images/svgfile/paidparking.svg', name: 'Paid parking on premises' },
    { file: '/images/svgfile/ac.svg', name: 'Air conditioning' },
    { file: '/images/svgfile/workspace.svg', name: 'Dedicated workspace' },
    { file: '/images/svgfile/shower.svg', name: 'Outdoor shower' },
    { file: '/images/svgfile/smokealarm.svg', name: 'Smoke Alarm' },
    { file: '/images/svgfile/firstaid.svg', name: 'First aid kit' },
    { file: '/images/svgfile/alarm.svg', name: 'Carbon monoxide alarm' },
    { file: '/images/svgfile/fireextinguisher.svg', name: 'Fire extinguisher' },
  ];

  return (
    <GridItem
      mt='1rem'
      minW={'80%'}
      overflowY='auto'
      className='scroll'
      justifySelf='center'
      color='#313131'
      fontSize='1.3rem'
      fontWeight='semibold'
    >
      <Text mx={!isLargerThan1400 && '2rem'} my='2rem'>
        Do you have any standout amenities?
      </Text>

      <Grid
        gap='2rem'
        mx={!isLargerThan1400 && '2rem'}
        templateColumns={'repeat(3,1fr)'}
      >
        {path.map((el, i) => (
          <SVG path={el.file} name={el.name} key={i} />
        ))}
      </Grid>

      <Text
        mx={!isLargerThan1400 && '2rem'}
        width='100%'
        marginBlock='4rem 2rem'
      >
        What about these guest favorites?
      </Text>

      <Grid
        mx={!isLargerThan1400 && '2rem'}
        gap='2rem'
        templateColumns={'repeat(3,1fr)'}
      >
        {favourite.map((el, i) => (
          <SVG path={el.file} key={i} name={el.name} />
        ))}
      </Grid>
    </GridItem>
  );
};

export default Offer;
