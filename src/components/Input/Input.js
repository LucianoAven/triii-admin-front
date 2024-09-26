import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

//Input component with atributes and placeholder props, better used with useField hook
export default function Input({ label, atributes }) {
  return (
    <Grid item xs={12}>
      <TextField InputLabelProps={{
        shrink: true
      }} label={label} {...atributes} variant="outlined" fullWidth defaultValue={atributes.name}/>
    </Grid>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  atributes: PropTypes.object.isRequired,
};
