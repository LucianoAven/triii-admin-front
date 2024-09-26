import React, { useContext } from 'react';
import { StyleContext } from '../../../../../../style/styleProvider';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

export default function Subscription({ subscriptionData }) {
  const { fontSize, fontWeight, color, shadow } = useContext(StyleContext);
  const navigate = useNavigate();

  const redirectChangePlan = () => {
    // window.open('/subscribe/plans/1', '_blank', 'noopener,noreferrer');
    navigate('/subscribe/plans/1');
  }

  return (
    <Box
      display={'flex'}
      bgcolor={color.neutral[50]}
      boxShadow={shadow.md}
      borderRadius={4}
      py={{ md: '1.1rem', lg: '1.4rem' }}
      px={{ md: '2.1rem', lg: '3.5rem' }}
      gridColumnGap={{ md: '7rem', lg: '13rem' }}
    >
      <Box width={"100%"}>
        {/* caja 1 */}
        <Box display="flex" justifyContent={"space-between"}>
          <Box display="flex" style={{ gap: '0.5rem' }} marginRight={5}>
            <CardMembershipOutlinedIcon
              fontSize={'medium'}
              sx={{ color: color.orange[400] }}
            />
            <Box style={{ gap: '0.5rem', display: 'flex', flexDirection: 'column' }}>
              <Box
                style={{
                  gap: '0.3rem',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '0.7rem',
                }}
              >
                <Typography
                  fontWeight={fontWeight.semibold}
                  color={color.slate[900]}
                  fontSize={fontSize.lg}
                >
                  {subscriptionData.name}
                </Typography>
                <LaunchOutlinedIcon />
              </Box>
              {/* <Typography fontSize={fontSize.xs}>
            {subscriptionData.description}
          </Typography> */}
              <Box
                py={'0.4rem'}
                style={{
                  backgroundColor: color.orange[100],
                  border: '1px solid',
                  borderColor: color.orange[200],
                  borderRadius: '4px',
                }}
              >
                <Typography
                  textAlign={'center'}
                  color={color.orange[500]}
                  fontWeight={fontWeight.semibold}
                  fontSize={fontSize.sm}
                >
                  {subscriptionData.status}
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* Current plan name */}
          <Box display={"flex"} flexDirection={"column"} alignItems={"flex-end"}> 
            <Typography fontWeight={fontWeight.semibold} fontSize={fontSize.lg}>
              {subscriptionData.plan}
            </Typography>
            <Button sx={{marginTop: 2}} variant={"contained"} size={"small"} onClick={redirectChangePlan}>
              Change
            </Button>            
          </Box>
        </Box>
        {/* caja 2 */}
        <Box display="flex" style={{marginTop: '30px'}}>
          <Typography variant={'caption'} fontWeight={fontWeight.semibold}>
            *{subscriptionData.daysRemaining} - days free trial remaining
          </Typography>
          <Typography  variant={'caption'} >
            (Trial ends on {subscriptionData.trialEnds})
          </Typography>

          {/* <Typography
            fontSize={fontSize.md}
            fontWeight={fontWeight.semibold}
            color={color.blue[600]}
          >
            Switch Trial
          </Typography> */}
        </Box>
      </Box>
    </Box>
  );
}
