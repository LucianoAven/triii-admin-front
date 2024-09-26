import React, { useState } from 'react';
import useField from 'hooks/useField';
import { useTranslation } from 'react-i18next';
import workspacesService from 'services/workspaces';
//redux
import { useDispatch } from 'react-redux';
import { upsertWorkspace } from 'ReduxToolkit/features/workspace/workspaceSlice.ts';
//components/ui
import { CNAMEInput } from './components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SpinnerIcon from 'components/SpinnerIcon/SpinnerIcon';
import { Input } from 'components';

const DomainStepper = ({
  domainHost,
  workspaceId,
  fetchWorkspace,
  setConfigDomain,
}) => {
  const dispatch = useDispatch();
  const nameField = useField('text', domainHost);
  const cnameField = useField('text', 'TEST.org.ar');
  const [activeStep, setActiveStep] = useState(0);
  const [cNameStatus, setCNameStatus] = useState('idle');
  const { t } = useTranslation();

  const steps = [
    {
      label: t('edit.stepper.firstStep.title'),
      description: t('edit.stepper.firstStep.subtitle'),
      content: <Input {...nameField} label={'Domain'} />,
    },
    {
      label: t('edit.stepper.secondStep.title'),
      description: t('edit.stepper.secondStep.subtitle'),
      content: <CNAMEInput cnameField={cnameField} cNameStatus={cNameStatus} />,
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const verifyCname = async () => {
    const verifyData = { action: 'verify', host: nameField.atributes.value };
    const verifyDataJson = JSON.stringify(verifyData);

    setCNameStatus('loading');
    try {
      const { isOK } = await workspacesService.putWorkspaceDomain(
        verifyDataJson,
        workspaceId
      );

      if (isOK) {
        setCNameStatus('available');
      } else {
        setCNameStatus('unavailable');
      }
    } catch (error) {
      console.log(error);
      setCNameStatus('unavailable');
    }
  };

  const confirmCname = async () => {
    const confirmData = { action: 'confirm', host: nameField.atributes.value };
    const confirmDataJson = JSON.stringify(confirmData);

    setCNameStatus('confirming');
    try {
      const newWorkspace = await workspacesService.putWorkspaceDomain(
        confirmDataJson,
        workspaceId
      );

      dispatch(upsertWorkspace(newWorkspace));
      await fetchWorkspace();
      setConfigDomain(false);
    } catch (error) {
      console.log(error);
      setCNameStatus('unavailable');
    }
  };

  return (
    <Box mt={3} className="panel-inner  mb-0" p={3}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step
            key={step.label}
            sx={{
              '& .MuiSvgIcon-root': {
                width: 32,
                height: 32,
              },
            }}
          >
            <StepLabel
              optional={
                <Typography variant="caption">{step.description}</Typography>
              }
              sx={{
                '& .MuiStepLabel-label': {
                  fontWeight: 700,
                },
              }}
            >
              {step.label}
            </StepLabel>
            <StepContent style={{ paddingTop: 15 }}>
              {step.content}
              <Box sx={{ mb: 2 }}>
                <div>
                  {index === steps.length - 1 && (
                    <Button
                      variant="contained"
                      onClick={verifyCname}
                      sx={{ mt: 2, mr: 2 }}
                      disabled={cNameStatus === 'loading'}
                    >
                      {t('edit.stepper.secondStep.verify')}
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={index === steps.length - 1 ? confirmCname : handleNext}
                    sx={{ mt: 2, mr: 2 }}
                    startIcon={
                      index === steps.length - 1 && (
                        <SpinnerIcon isLoading={cNameStatus === 'confirming'} />
                      )
                    }
                    disabled={
                      index === steps.length - 1 && cNameStatus !== 'available'
                    }
                  >
                    {index === steps.length - 1
                      ? t('edit.stepper.secondStep.finish')
                      : t('edit.stepper.secondStep.continue')}
                  </Button>
                  <Button
                    variant={'outlined'}
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 2, mr: 1 }}
                  >
                    {t('edit.stepper.secondStep.back')}
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button variant={'outlined'} onClick={handleReset} sx={{ mt: 2, mr: 2 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default DomainStepper;
