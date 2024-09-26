/* eslint-disable react/prop-types */
import React from 'react';
import { Select, MenuItem, FormControl, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function LenguageSelect({ value, onChange }) {
  const { t } = useTranslation();

  return (
    <Box marginRight={{ xs: 1, sm: 2 }}>
      <FormControl variant="standard" sx={{ m: 1 }} size={'small'}>
        <Select
          sx={{
            '& .MuiSelect-select.MuiSelect-standard.MuiInput-input.MuiInputBase-input.MuiInputBase-inputSizeSmall': {
              paddingBottom: '0px',
            },
          }}
          autoWidth
          value={value}
          onChange={onChange}
        >
          <MenuItem value="espanol">
            <Typography fontSize="13px">{t('global.spanish')}</Typography>
          </MenuItem>
          <MenuItem value="ingles">
            <Typography fontSize="13px">{t('global.english')}</Typography>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

LenguageSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
};
