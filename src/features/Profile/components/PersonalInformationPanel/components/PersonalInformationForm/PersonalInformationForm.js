import React, { useState, useContext, useEffect } from 'react';
import { StyleContext } from 'style/styleProvider';
import { useTranslation } from 'react-i18next';
import useField from 'hooks/useField';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updateUserName } from 'ReduxToolkit/features/user/userSlice.ts';

//components/ui
import { nameInputControl } from 'helpers/authControl';
import { Input, FormNotificationError } from 'components';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Spinner from 'react-bootstrap/Spinner';
import { TextField } from '@mui/material';

const PersonalInformationForm = () => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const nameInput = useField('name', user.name);
  const [isLoading, setIsLoading] = useState(false);
  const { buttonSize } = useContext(StyleContext);
  useEffect(() => {
    nameInput.actions.onSetNewValue(user.name)
  }, [user]) //eslint-disable-line
  
  // const session = useSelector(sessionSlice)
  // console.log("user", session)

  const changeNameProfile = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const name = nameInput.atributes.value;
    const userNameObj = {
      name,
    };
    const userNameJson = JSON.stringify(userNameObj);

    if (inputFormControl(name)) await dispatch(updateUserName(userNameJson));

    setIsLoading(false);
  };

  const inputFormControl = (name) => {
    if (nameInputControl(name)) {
      nameInput.actions.onSuccess();
      return true;
    }

    nameInput.actions.onError(
      <FormNotificationError errorMsg={t('profile.error.invalidName')} />
    );
    return false;
  };
  return (
    <form onSubmit={changeNameProfile} className="form-group">
      <Grid item container xs={12}>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretched', sm: 'center' }}
          justifyContent={'flex-'}
          width={1}
          margin={'0 auto'}
        >
          <Box
            display="flex"
            flexDirection={{
              xs: 'column',
              sm: 'column',
              md: 'column',
            }}
            alignItems={{
              xs: 'stretched',
              sm: 'center',
              md: 'start',
            }}
            gap={0.3}
            justifyContent={'flex-start'}
            className={'marginLeftImgProfile'}
            width={1}
            margin={'0 auto'}
          >
            {/* <Typography fontSize={fontSize.md}>{user.email}</Typography> */}
            {/* <Typography fontSize={fontSize.sm} mb={3}>
              {t('profile.provider')}: "password"
            </Typography> */}
            <TextField label="Email" InputLabelProps={{
              shrink: true,
            }}
              InputProps={{
                readOnly: true,
              }}
              value={user.email} fullWidth variant="outlined">

            </TextField>
            <Box mb={2}></Box>
            <Grid container spacing={4}>
              <Input {...nameInput} label={t('profile.enterName')} />
            </Grid>
            {/* <TextField label={t('profile.enterName')} variant="outlined" InputLabelProps={{
              shrink: true,
            }}
            {...nameInput} fullWidth>
            </TextField> */}
            <Grid mt={2} item container xs={12}>
              <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'stretched', sm: 'center' }}
                justifyContent={'flex-end'}
                width={1}
                margin={'0 auto'}
              >
                <Button
                  size={buttonSize.responsive}
                  type="submit"
                  variant={'contained'}
                  disabled={isLoading}
                  startIcon={
                    isLoading ? (
                      <Spinner
                        style={{
                          height: '1rem',
                          width: '1rem',
                          fontSize: '12px',
                        }}
                        animation="border"
                      />
                    ) : null
                  }
                >
                  {isLoading
                    ? t('global.saving')
                    : t('global.save')}
                </Button>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </form>
  );
};

export default PersonalInformationForm;
