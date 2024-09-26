import React, { useContext } from 'react';
import { StyleContext } from '../../../../style/styleProvider';
import { useTranslation } from 'react-i18next';
import { PersonalInformationForm } from './components';
import Typography from '@mui/material/Typography';

const PersonalInformationPanel = () => {
  const { fontSize, color } = useContext(StyleContext);
  const { t } = useTranslation();

  return (
    <div id="AccountProfileInfoPanel" className="panel">
      <div className="panel-hdr">
        <Typography fontSize={fontSize.sm} color={color.slate[700]}>
          {t('profile.personalInformation')}
        </Typography>
      </div>
      <div className="panel-container show">
        <div className="panel-content">
          <PersonalInformationForm />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationPanel;
