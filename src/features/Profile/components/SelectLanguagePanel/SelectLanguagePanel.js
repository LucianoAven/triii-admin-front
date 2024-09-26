import React, { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleContext } from '../../../../style/styleProvider';
import { InitResetPasswordButton, ResetPasswordForm } from './components';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Select } from '@mui/material';
import moment from 'moment';

const SelectLanguagePanel = () => {
  const { t } = useTranslation();
  const { fontSize, color } = useContext(StyleContext);
  const [stage, setStage] = useState('initial');
  const { i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    // setWindowPath('');
  };

  let select = JSON.parse(localStorage.getItem('select'));

  const [languageSelected, setLanguageSelected] = useState(select ? select : '');

  const handleChangeLenguaje = useCallback((e) => {
    if (e.target.value === 'espanol') {
      changeLanguage('ES');
      setLanguageSelected('espanol');
      moment.locale('ES')
    } else {
      setLanguageSelected('ingles');
      changeLanguage('En');
      moment.locale('En')
    }
    localStorage.setItem('select', JSON.stringify(e.target.value));
  }, []); //eslint-disable-line
  const ResetPasswordFlow =  //eslint-disable-line
    stage === 'initial' ? (
      <InitResetPasswordButton setStage={setStage} />
    ) : (
      <ResetPasswordForm setStage={setStage} />
    );
   
  return (
    <div id="SelectLanguagePanel" className="panel">
      <div className="panel-hdr">
        <Typography fontSize={fontSize.sm} color={color.slate[700]}>
          {t('global.languages')}
        </Typography>
      </div>
      <div className="panel-container show">
        <div className="panel-content">
          <Grid item container xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'center' }}
              justifyContent={'flex-start'}
              width={1}
              paddingLeft={3.2}
            >
              <Select
                value={languageSelected}
                onChange={handleChangeLenguaje}
                className=" adjust-select mt-2 selectDropProfile"
                size="small"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                  color: theme => theme.palette.text.primary,
                  width: "100%",
                }}
                native={true}
              >
                <option className="select2-results__option" value={"espanol"}>
                  {t("global.spanish")}
                </option>
                <option className="select2-results__option" value={"ingles"}>
                  {t("global.english")}
                </option>
              </Select>
            </Box>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default SelectLanguagePanel;
