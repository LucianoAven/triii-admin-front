import React from 'react';
import Box from '@mui/material/Box';
import Container from 'components/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Main } from 'components/layouts';

const ProximamenteView = () => {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Main>
      <Box
        sx={
          mode === 'light'
            ? { backgroundColor: 'rgba(247, 250, 255, 1)' }
            : { backgroundColor: 'rgba(247, 250, 255, 0.1)' }
        }
      >
        <Container maxWidth={800} height={'100vh'} display='flex' alignItems='center' justifyContent='center'>
          <Box >
            <Typography variant="h4">Próximamente...</Typography>
          </Box>
        </Container>
      </Box>
    </Main>
  );
};

export default ProximamenteView;
