import React, { useState, useEffect } from 'react';
import { spaceSubdomainNameControl } from 'helpers/authControl';
import { useTranslation } from 'react-i18next';
import subdomainService from 'services/subdomain';

//components/ui
import { FormNotificationError } from 'components';
import StatusAdornment from 'components/StatusAdornment';
import { TextField } from '@mui/material';

const SubdomainInput = ({ subdomainNameInput, existingSubdomainName }) => {
  console.log(existingSubdomainName);
  const { t } = useTranslation();
  const [adornmentStatus, setAdornmentStatus] = useState('iddle');
  const subdomainInputValue = subdomainNameInput.atributes.value;

  const handleSpaceSubdomainNameControl = (subdomainName, subdomainAvailability) => {
    !spaceSubdomainNameControl(subdomainName)
      ? subdomainNameInput.actions.onError(
          <FormNotificationError
            errorMsg={t('add.error.invalidSubdomain')}
          />
        )
      : !subdomainAvailability
      ? subdomainNameInput.actions.onError(
          <FormNotificationError
            errorMsg={t('add.error.nonAvailableSubdomain')}
          />
        )
      : subdomainNameInput.actions.onSuccess();
  };

  useEffect(() => {
    let timer = setTimeout(async () => {
      if (
        subdomainInputValue !== '' &&
        subdomainInputValue !== existingSubdomainName
      ) {
        setAdornmentStatus('loading');

        const subdomain = `${subdomainInputValue}.mytrii.app`;
        const subdomainJson = JSON.stringify({ subdomain });

        const { available } = await subdomainService.getSubdomainAvailability(
          subdomainJson
        );

        handleSpaceSubdomainNameControl(subdomainInputValue, available);

        available && spaceSubdomainNameControl(subdomainInputValue)
          ? setAdornmentStatus('available')
          : setAdornmentStatus('unavailable');
      }
    }, 1700);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subdomainInputValue]);

  return (
    <TextField
      {...subdomainNameInput.atributes}
      fullWidth
      id="inputSubdomain"
      variant="outlined"
      size="small"
      InputProps={{
        endAdornment: (
          <>
            <StatusAdornment status={adornmentStatus} text={'.mytrii.app'} />
          </>
        ),
      }}
    />
  );
};

export default SubdomainInput;
