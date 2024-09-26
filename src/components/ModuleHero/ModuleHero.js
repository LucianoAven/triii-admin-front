import React, { useContext, useState, useEffect } from 'react';
import { StyleContext } from 'style/styleProvider';
import PropTypes from 'prop-types';
import { alpha, useTheme } from '@mui/material/styles'; //eslint-disable-line
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from 'components/Container';
// import IconButton from '@mui/material/IconButton';
// import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import Slide from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import { useTranslation } from 'react-i18next';

const ModuleHero = ({
  moduleName,
  moduleDescription,
  primaryColor,
  // secondaryColor,
  // backgroundColor,
  imgSource,
}) => {
  const [show, setShow] = useState(false);
  const { mediaQuery } = useContext(StyleContext);
  const theme = useTheme(); //eslint-disable-line
  const { t } = useTranslation();

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Container>
      <Fade in={show} mountOnEnter unmountOnExit>
        <Slide direction="up" in={show} mountOnEnter unmountOnExit>
          <Grid
            container
            spacing={4}
            // bgcolor={backgroundColor}
            borderRadius={3}
          >
            <Grid item container xs={12} md={6} alignItems={'center'}>
              <Box>
                <Box marginBottom={2}>
                  <Typography
                    variant="h2"
                    color="text.primary"
                    sx={{ fontWeight: 700 }}
                  >
                    Trii
                    <Typography
                      color={primaryColor}
                      marginLeft={1}
                      component={'span'}
                      variant={'inherit'}
                      // sx={{
                      //   background: `linear-gradient(180deg, transparent 85%, ${alpha(
                      //     secondaryColor,
                      //     1,
                      //   )} 0%)`,
                      // }}
                    >
                      {moduleName}
                    </Typography>
                  </Typography>
                </Box>
                <Box marginBottom={3}>
                  <Typography variant="h6" component="p" color="text.secondary">
                    {t(moduleDescription)}
                  </Typography>
                </Box>
                {/* <IconButton
                  style={{
                    backgroundColor: secondaryColor,
                    boxShadow:
                      '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                  }}
                  href="#info-section"
                >
                  <KeyboardDoubleArrowDownRoundedIcon
                    sx={{
                      color: primaryColor,
                      fontSize: 42,
                    }}
                  />
                </IconButton> */}
              </Box>
            </Grid>
            <Grid
              item
              container
              alignItems={'center'}
              justifyContent={'center'}
              xs={12}
              md={6}
            >
              {mediaQuery.mdPlus && (
                <Box
                  component={'img'}
                  height={0.8}
                  width={0.8}
                  src={imgSource}
                  alt="..."
                  borderRadius={2}
                  maxWidth={600}
                  maxHeight={500}
                  // sx={{
                  //   objectFit: 'contain',
                  //   boxShadow: '19px 20px 0 0 rgb(140 152 164 / 13%)',
                  //   filter:
                  //     theme.palette.mode === 'dark'
                  //       ? 'brightness(0.9)'
                  //       : 'none',
                  //   bgcolor: secondaryColor,
                  // }}
                />
              )}
            </Grid>
          </Grid>
        </Slide>
      </Fade>
    </Container>
  );
};

ModuleHero.propTypes = {
  moduleName: PropTypes.string.isRequired,
  moduleDescription: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  imgSource: PropTypes.string.isRequired,
};

export default ModuleHero;
