import React from 'react';
//components/ui
import { CopyIcon } from './components';
import StatusAdornment from 'components/StatusAdornment';
import { TextField } from '@mui/material';

const CNAMEInput = ({ cnameField, cNameStatus }) => {
  return (
    <TextField
      {...cnameField.atributes}
      fullWidth
      disabled
      id="inputSubdomain"
      variant="outlined"
      size="small"
      InputProps={{
        style: { color: '#000' },
        endAdornment: (
          <>
            <StatusAdornment status={cNameStatus} />
            <CopyIcon textToCopy={cnameField.atributes.value} />
          </>
        ),
      }}
    />
  );
};

export default CNAMEInput;
