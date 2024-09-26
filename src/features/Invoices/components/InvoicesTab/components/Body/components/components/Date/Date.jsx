import React, { useContext } from 'react';
import { StyleContext } from '../../../../../../../../../style/styleProvider';
import {Box} from '@mui/material';
import Typography from '@mui/material/Typography';

export default function Date({ text, date }) {
  const { fontSize, fontWeight } = useContext(StyleContext);

  return (
    <Box textAlign={'center'}>
      <Typography fontWeight={fontWeight.semibold} fontSize={fontSize.sm}>
        {text}
      </Typography>
      <Typography fontSize={fontSize.xs}>{date}</Typography>
    </Box>
  );
}
