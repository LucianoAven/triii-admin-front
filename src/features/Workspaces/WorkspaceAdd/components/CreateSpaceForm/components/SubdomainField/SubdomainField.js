/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { spaceSubdomainNameControl } from 'helpers/authControl';

//redux
import {
  getSubdomainAvailability,
  selectSubdomainAvailability,
  selectSubdomainStatus,
  selectSubdomain,
} from 'ReduxToolkit/features/subdomainSlice';
import { useDispatch, useSelector } from 'react-redux';

//components/ui
import { StyleContext } from 'style/styleProvider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField } from '@mui/material';

export default function SubdomainField({
  subdomainNameInput,
  handleSpaceSubdomainNameControl,
}) {
  const { t } = useTranslation();
  const { fontSize } = useContext(StyleContext);
  const dispatch = useDispatch();
  const available = useSelector(selectSubdomainAvailability);
  const status = useSelector(selectSubdomainStatus);
  const subdomain = useSelector(selectSubdomain);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);

  const hideStatusResult = () => {
    setIsAvailable(false);
    setIsUnavailable(false);
  };

  useEffect(() => {
    let timer = setTimeout(async () => {
      const subdomainName = subdomainNameInput.atributes.value;
      const subdomain = `${subdomainNameInput.atributes.value}.mytrii.app`;

      if (subdomainName !== '') {
        const subdomainJson = JSON.stringify({ subdomain });

        hideStatusResult();

        await dispatch(getSubdomainAvailability({ subdomainName, subdomainJson }));
      } else {
        hideStatusResult();
      }
    }, 1700);

    return () => clearTimeout(timer);
  }, [subdomainNameInput.atributes.value, dispatch]);

  useEffect(() => {
    const subdomainName = subdomainNameInput.atributes.value;

    if (subdomainName !== '') {
      handleSpaceSubdomainNameControl(subdomainName);

      available && spaceSubdomainNameControl(subdomainName)
        ? setIsAvailable(true)
        : setIsUnavailable(true);
    }
  }, [available, subdomain]);

  return (
    <>
      <Typography fontSize={fontSize.sm}>{t('workSpaces.subdomainName')}</Typography>
      <TextField
        fullWidth
        id="inputSubdomain"
        variant="outlined"
        className="mb-4 mt-2"
        sx={{
          "& legend": { display: "none" },
          "& fieldset": { top: 0 }}}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography fontSize={fontSize.sm} marginRight={1}>
                .mytrii.app
              </Typography>
              <Box width={20}>
                {status === 'loading' ? <CircularProgress size={20} /> : null}
                {isAvailable ? <CheckRoundedIcon color="success" /> : null}
                {isUnavailable ? <CloseRoundedIcon color="error" /> : null}
              </Box>
            </InputAdornment>
          ),
        }}
        {...subdomainNameInput.atributes}
      />
    </>
  );
}

SubdomainField.propTypes = {
  subdomainNameInput: PropTypes.object.isRequired,
  handleSpaceSubdomainNameControl: PropTypes.func.isRequired,
};
