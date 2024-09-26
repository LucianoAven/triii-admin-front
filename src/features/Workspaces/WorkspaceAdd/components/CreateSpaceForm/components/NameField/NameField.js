import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { StyleContext } from '../../../../../../../style/styleProvider';
import { TextField } from '@mui/material';

export default function NameField({ workspaceNameInput }) {
  const { t } = useTranslation();
  const { fontSize } = useContext(StyleContext);

  return (
    <>
      <Typography fontSize={fontSize.sm}>{t('global.name')}</Typography>
      <TextField
        fullWidth
        variant="outlined"
        className="mb-4 mt-2"
        sx={{
          "& legend": { display: "none" },
          "& fieldset": { top: 0 }}}
        size="small"
        {...workspaceNameInput.atributes}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  );
}

NameField.propTypes = {
  workspaceNameInput: PropTypes.object.isRequired,
};
