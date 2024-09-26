import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Spaces } from '@trii/types';
import { useTranslation } from 'react-i18next';
import { StyleContext } from '../../../../../../../style/styleProvider';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DataCenterSelect = ({ regionSelect, setRegionSelect }) => {
  const { fontSize } = useContext(StyleContext);
  const { t } = useTranslation();

  const SelectOptions = Spaces.RegionInfo.list.map((region) => (
    <MenuItem value={region.Value}>
      <Typography fontSize={fontSize.md}>
        {t(`workSpaces.${region.Name}`)}
      </Typography>
    </MenuItem>
  ));

  const handleSelect = (event) => {
    setRegionSelect(event.target.value);
  };

  return (
    <Box minWidth={'100%'}>
      <InputLabel id="simple-select-label">
        <Typography fontSize={fontSize.sm}>{t('workSpaces.dataCenter')}</Typography>
      </InputLabel>
      <FormControl fullWidth>
        <Select
          labelId="simple-select-label"
          value={regionSelect}
          onChange={handleSelect}
          variant="outlined"
        size="small"

          sx={{
            "& legend": { display: "none" },
            "& fieldset": { top: 0 },
            marginBottom: 10}}
        >
          {SelectOptions}
        </Select>
      </FormControl>
    </Box>
  );
};

DataCenterSelect.propTypes = {
  regionSelect: PropTypes.string.isRequired,
  setRegionSelect: PropTypes.func.isRequired,
};

export default DataCenterSelect;
