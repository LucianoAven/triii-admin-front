import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { StyleContext } from 'style/styleProvider';

//ts
import { StyleContextType } from 'style/types';
import { Spaces } from '@trii/types';

//components/ui
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
const Workspace = ({ workspace, isMobile }: WorkspaceProps) => {
  const { fontSize, fontWeight, color, shadow } = useContext(
    StyleContext
  ) as StyleContextType;
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  const { t } = useTranslation()
  const TooltipPers = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      // @ts-ignore
      backgroundColor: theme.palette.primary.main,
      marginTop: "-60px!important"
    },
  })) as typeof Tooltip;
  return (
    <Fade style={{ transitionDuration: '750ms' }} in={show}>

      <a className="color-fusion-300 " href={`https://${workspace.domain_active}`} target="_blank" rel="noopener noreferrer">


        <Box
          className="px-4 py-2"
          sx={isMobile ? { width: '100vw' } : { width: 'auto' }}
        >
          <TooltipPers title={t('workSpaces.openLink')} color="primary" disableInteractive>
            <Box
              className="panel-inner my-0"
              display={'flex'}
              bgcolor={color.neutral[50]}
              boxShadow={shadow.md}
              borderRadius={1}
              px={{ md: '1.5rem', lg: '1.5rem' }}
            // gridColumnGap={{ md: '7rem', lg: '13rem' }}
            >
              <Box
                className={
                  isMobile
                    ? 'd-flex align-items-center p-3 w-100'
                    : 'd-flex justify-content-between align-items-center p-3 w-100'
                }
              >
                <Box className="m-0" style={{ width: 64, height: 64 }}>
                  <img
                    alt="workspace avatar"
                    src={
                      workspace.image_url !== ''
                        ? workspace.image_url
                        : '/img/buildingDefault.png'
                    }
                    className="rounded-circle"
                    style={{ width: 64, height: 64 }}
                  />
                </Box>
                {!isMobile ? (
                  <>
                    <Box className="d-inline-block ml-3 mr-auto pr-4">
                      <Box display={"flex"} alignItems={"center"}>
                        <Typography
                          fontWeight={fontWeight.semibold}
                          fontSize={fontSize.sm}
                          mr={2}
                        >
                          {workspace.name}
                        </Typography>
                        <Chip label={t("global.owner")} sx={{
                          borderRadius: '5px',
                          width: 'fit-content !important',
                        }}
                          size="small" color="success"></Chip>
                      </Box>
                      <br></br>
                      <Typography
                        fontWeight={fontWeight.normal}
                        fontSize={fontSize.sm}
                      >
                        {workspace.domain_active}
                      </Typography>
                    </Box>
                    <Chip
                      label={Spaces.Status[workspace.status]}
                      // color={item.status === 3 ? 'success' : 'warning'}
                      sx={{ borderRadius: '5px' }}
                      size="small"
                    />
                  </>
                ) : (
                  <>
                    <Box className={'d-flex flex-column pl-3 align-items-center'}>
                      <Box className="d-inline-block ml-3 mr-auto pr-4">
                        <Box>

                          <Typography
                            fontWeight={fontWeight.semibold}
                            fontSize={fontSize.sm}
                          >
                            {workspace.name}
                          </Typography>
                          <Chip label="chip" sx={{
                            borderRadius: '5px',
                            width: 'fit-content !important',
                          }}
                            size="small"></Chip>
                        </Box>
                        <br></br>

                        <Typography
                          fontWeight={fontWeight.normal}
                          fontSize={fontSize.sm}
                        >
                          {workspace.domain_active}
                        </Typography>
                      </Box>
                      <Chip
                        label={Spaces.Status[workspace.status]}
                        // color={item.category === 'usuario' ? 'info' : 'success'}
                        sx={{
                          borderRadius: '5px',
                          width: 'fit-content !important',
                        }}
                        size="small"
                        className={'mt-3'}
                      />
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </TooltipPers>
        </Box>
      </a>
    </Fade>
  );
};

interface WorkspaceProps {
  index: number;
  workspace: Spaces.ISpace;
  isMobile: boolean;
}

export default Workspace;
