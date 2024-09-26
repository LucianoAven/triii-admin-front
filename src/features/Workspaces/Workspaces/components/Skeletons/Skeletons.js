import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@mui/material/Skeleton';

const Skeletons = ({ isMobile }) => {
  const skeletons = 7;
  const skeletonArray = [...Array(skeletons)];

  return (
    <>
      {skeletonArray.map((e, index) => (
        <Skeleton
          sx={{ bgcolor: 'grey.200' }}
          variant="rounded"
          width={isMobile ? '100vw' : 'auto'}
          height="96px"
          className="mx-5 my-2"
          key={index}
        />
      ))}
    </>
  );
};

Skeletons.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default Skeletons;
