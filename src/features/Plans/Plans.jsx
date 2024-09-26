import React, { useCallback, useContext, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'react-image-crop/dist/ReactCrop.css';
import { useTranslation } from 'react-i18next';
import { StyleContext } from '../../style/styleProvider';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button, CardActions, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const Plans = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { fontSize } = useContext(StyleContext);
    const mock = [
        {
            planType: 'basic',
            title: t('subscription.basic'),
            subtitle: t('pricing.accessAllFeatures'),
            price: { monthly: '$22', annual: '$190' },
            features: [
                t('pricing.accountLineNumber'),
                t('pricing.messageOnlyText'),
                t('pricing.multimediaMessage'),
                t('pricing.webhookNotification'),
                t('pricing.5daysTrial'),
                t('pricing.requiresCreditCard'),
            ],
            isSubscribed: true
        },
        {
            planType: 'pro',
            title: t('subscription.pro'),
            subtitle: t('pricing.accessAllFeatures'),
            price: { monthly: '$22', annual: '$190' },
            features: [
                t('pricing.accountLineNumber'),
                t('pricing.messageOnlyText'),
                t('pricing.multimediaMessage'),
                t('pricing.webhookNotification'),
                t('pricing.5daysTrial'),
                t('pricing.requiresCreditCard'),
            ],
            isSubscribed: false,
        },
        {
            planType: 'enterprise',
            title: t('subscription.enterprise'),
            subtitle: t('pricing.accessAllFeatures'),
            price: { monthly: '$22', annual: '$190' },
            features: [
                t('pricing.accountLineNumber'),
                t('pricing.messageOnlyText'),
                t('pricing.multimediaMessage'),
                t('pricing.webhookNotification'),
                t('pricing.5daysTrial'),
                t('pricing.requiresCreditCard'),
            ],
            isSubscribed: false,
        },
    ];
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    const [pricingOption, setPricingOption] = useState('monthly');

    const handleClick = (event, newPricingOption) => {
        if (newPricingOption !== null) {
            setPricingOption(newPricingOption);
        }
    };
    const [openModalUpgrade, setOpenModalUpgrade] = React.useState(false);
    const handleOpenModalUpgrade = () => {
        setOpenModalUpgrade(true);

    }
    const handleCloseModalUpgrade = () => setOpenModalUpgrade(false);
    const acceptNewPlan = () => {
        setOpenModalUpgrade(false);
    }
    const renderToggler = () => (
        <Box display={'flex'} justifyContent={'center'} marginBottom={4}>
            <ToggleButtonGroup value={pricingOption} exclusive onChange={handleClick}>
                <ToggleButton
                    value="monthly"
                    size={isMd ? 'large' : 'small'}
                    sx={{
                        backgroundColor:
                            pricingOption === 'monthly'
                                ? `${theme.palette.primary.light} !important`
                                : 'transparent',
                        border: '1px solid #008dff',
                        width: '100px',
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 700,
                            color:
                                pricingOption !== 'annual' ? 'common.white' : 'text.primary',
                        }}
                    >
                        {t('pricing.monthly')}
                    </Typography>
                </ToggleButton>
                <ToggleButton
                    value="annual"
                    size={isMd ? 'large' : 'small'}
                    sx={{
                        backgroundColor:
                            pricingOption === 'annual'
                                ? `${theme.palette.primary.light} !important`
                                : 'transparent',
                        border: '1px solid #008dff',
                        width: '100px',
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 700,
                            color:
                                pricingOption === 'annual' ? 'common.white' : 'text.primary',
                        }}
                    >
                        {t('pricing.annual')}
                    </Typography>
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
    const backToSubscribeList = () => {
        navigate('/subscribe');

    }
    const [actualPlan, setActualPlan] = useState(mock[0]) //basic plan
    const [newPlan, setNewPlan] = useState(mock[1]) //pro plan

    const renderModalUpgrade = () => (
        <Dialog
            open={openModalUpgrade}
            onClose={handleCloseModalUpgrade}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {t('subscription.switchPlan')}
                <IconButton
                    aria-label="close"
                    size={"small"}
                    onClick={handleCloseModalUpgrade}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon sx={{
                        fontSize: '20px',
                    }} />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {t('subscription.switchPlanDescription1')} <Typography component="span" sx={{ fontWeight: "bold" }}>{actualPlan.title}</Typography> {t('subscription.switchPlanDescription2')} <Typography sx={{ fontWeight: "bold" }} component="span">{newPlan.title}</Typography> {t('subscription.switchPlanDescription3')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleCloseModalUpgrade} color="primary">
                    {t('global.cancel')}
                </Button>
                <Button
                    onClick={acceptNewPlan}
                    //  disabled={isLoading}
                    variant="outlined"
                    color="success"
                //  startIcon={startIcon}
                >
                    {t('subscription.switchTo')}&nbsp;<Typography component="span" sx={{ fontWeight: "bold", fontSize: "14px", marginTop: "-2px" }}>{newPlan.title}</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <>
            <Container maxWidth="md">
                <Box className="border-faded border-0" >
                    <Box id="AccountProfileInfoPanel" className="panel mb-auto"  >
                        {/* header */}
                        <Box className="panel-hdr">
                            <Box paddingLeft={0} mr={1}>
                                <IconButton size="small" onClick={backToSubscribeList}>
                                    <ArrowBackIcon sx={{
                                        fontSize: '20px',
                                    }}></ArrowBackIcon>
                                </IconButton>
                            </Box>
                            <Typography fontWeight={500} fontSize={fontSize.sm}>
                                {t('plans.plans')}
                            </Typography>
                        </Box>
                        {/* body */}
                        <Box className="panel-container show">
                            <Box className="panel-content">
                                {/* toggler annual/monthly */}

                                {renderToggler()}
                                {/* plans cards */}
                                <Container>
                                    <Grid container style={{ flexWrap: "nowrap", alignItems: 'center', overflow: "auto", paddingBottom: 10 }}>
                                        {mock.map((item, i) => (
                                            <Grid item key={i} sx={12} md={4} mr={3}>
                                                <Box
                                                    component={Card}
                                                    height={1}
                                                    display={'flex'}
                                                    flexDirection={'column'}
                                                    variant={'outlined'}
                                                    borderColor={item.isSubscribed && "gray"}
                                                    backgroundColor={item.isSubscribed && "#ebf6fd"}

                                                >
                                                    <CardContent
                                                        sx={{
                                                            padding: 2.5,
                                                            minHeight: '500px',
                                                        }}
                                                    >
                                                        <Box marginBottom={2}>
                                                            <Typography variant={'h4'} fontWeight={600} gutterBottom>
                                                                {item.title}
                                                            </Typography>
                                                            <Typography color={'text.secondary'}>
                                                                {item.subtitle}
                                                            </Typography>
                                                        </Box>
                                                        <Box
                                                            display={'flex'}
                                                            alignItems={'baseline'}
                                                            marginBottom={2}
                                                        >
                                                            <Typography variant={'h3'} fontWeight={700}>
                                                                {pricingOption === 'annual'
                                                                    ? item.price.annual
                                                                    : item.price.monthly}
                                                            </Typography>
                                                            <Typography
                                                                variant={'subtitle1'}
                                                                color={'text.secondary'}
                                                                fontWeight={700}
                                                            >
                                                                {pricingOption === 'annual' ? '/y' : '/mo'}
                                                            </Typography>
                                                        </Box>
                                                        <Grid container spacing={1}>
                                                            {item.features.map((feature, j) => (
                                                                <Grid item xs={12} key={j}>
                                                                    <Box
                                                                        component={ListItem}
                                                                        disableGutters
                                                                        width={'auto'}
                                                                        padding={0}
                                                                    >
                                                                        <Box
                                                                            component={ListItemAvatar}
                                                                            minWidth={'auto !important'}
                                                                            marginRight={2}
                                                                        >
                                                                            <Box
                                                                                component={Avatar}
                                                                                // bgcolor={theme.palette.primary.main}
                                                                                width={20}
                                                                                height={20}
                                                                            >
                                                                                <svg
                                                                                    width={12}
                                                                                    height={12}
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    viewBox="0 0 20 20"
                                                                                    fill="currentColor"
                                                                                >
                                                                                    <path
                                                                                        fillRule="evenodd"
                                                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                        clipRule="evenodd"
                                                                                    />
                                                                                </svg>
                                                                            </Box>
                                                                        </Box>
                                                                        <ListItemText primary={feature} />
                                                                    </Box>
                                                                </Grid>
                                                            ))}
                                                        </Grid>
                                                    </CardContent>
                                                    <Box flexGrow={1} />
                                                    <CardActions sx={{ justifyContent: 'flex-end', padding: 1, paddingBottom: 2 }}>
                                                        {item.isSubscribed ? (
                                                            <>
                                                                <Button sx={{ whiteSpace: "nowrap", textAlign: "center" }} disabled size={'small'} variant={'contained'} startIcon={<CheckCircleOutlineIcon />}>
                                                                    {t('subscription.currentPlan')}
                                                                </Button>
                                                            </>
                                                        ) : (

                                                            <Button size={'small'} variant={'contained'} onClick={handleOpenModalUpgrade}>
                                                                {t('subscription.upgrade')}
                                                            </Button>
                                                        )}
                                                    </CardActions>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>

                                </Container>
                                <Typography
                                    align={'center'}
                                    variant={'caption'}
                                    color="text.secondary"
                                    component={'p'}
                                    style={{ marginTop: '30px' }}
                                >
                                    *{t('pricing.trialAdvice')}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
            {renderModalUpgrade()}
        </>
    )
}

export default Plans