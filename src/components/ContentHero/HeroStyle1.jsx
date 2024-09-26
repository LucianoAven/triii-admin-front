import React, { useState, useEffect } from 'react';
// import { InfoList } from './components';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Grow from '@mui/material/Grow';
// import { useTheme } from '@mui/material';
// import useMediaQuery from '@mui/material/useMediaQuery';
import { Typography } from '@mui/material';

export default function HeroStyle1({ directionTitle, title, subtitle }) {
  const [show, setShow] = useState(false);
  //   const theme = useTheme();

  //   const isMd = useMediaQuery(theme.breakpoints.up('md'), {
  //     defaultMatches: true,
  //   });

  useEffect(() => {
    setShow(true);
  }, []);
  // console.log('item', title.dic);


  return (
    <Grow unmountOnExit in={show}>
      <Grid
        item
        container
        spacing={4}
        direction={directionTitle === 'left'? 'row' : 'row-reverse'}
      >
        <Grid
          item
          container
          alignItems={'start'}
          justifyContent={'center'}
          xs={12}
          md={6}
        >
          <Box height={'auto'} maxWidth={600}>
            <Typography variant="p" fontWeight={'bold'} fontSize={'24px'}>
              {title}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={6}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box>
            <Typography sx={{ whiteSpace: 'pre-line' }}>{subtitle}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Grow>
  );
}

HeroStyle1.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  directionTitle: PropTypes.string.isRequired,
};
