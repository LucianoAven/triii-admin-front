import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
// import PDFApi from '../../../../components/pdf/API-QR_TerminosyCondiciones.pdf';
import Link from '@mui/material/Link';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display={'flex'}
          justifyContent={'end'}
          alignItems={'center'}
          width={1}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <Box display="flex" flexWrap={'wrap'} alignItems={'center'}>
            <Box marginTop={1} marginRight={2}>
              <Link
                component="a"
                href={'files/API-QR_TerminosyCondiciones.pdf'}
                color="text.primary"
                variant={'subtitle2'}
                underline="none"
                target="_blank"
                rel="noopener"
              >
                {t('global.privacyPolicy')}
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          align={'center'}
          variant={'subtitle2'}
          color="text.secondary"
          gutterBottom
        >
         Copyright &copy; 2022 Trii LLC. {t('footer.allRightsReserved')}
        </Typography>
        <Typography
          align={'center'}
          variant={'caption'}
          color="text.secondary"
          component={'p'}
        >
          {t('footer.description')}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
