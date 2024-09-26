import React, { useContext } from 'react';
import { StyleContext } from 'style/styleProvider';
//components/ui
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const DomainInfo = ({ workspaceStatus, domainHost }) => {
  const { fontWeight, fontSize } = useContext(StyleContext);

  return (
    <Box display={'flex'} pt={'8px'} flexDirection="column" gap={2}>
      <Typography fontSize={fontSize.xs} fontWeight={fontWeight.semibold}>
        {domainHost}
      </Typography>
      <Chip
        label={workspaceStatus}
        sx={{
          borderRadius: '5px',
          width: 'fit-content !important',
        }}
        size="small"
      />
    </Box>
  );
};

export default DomainInfo;
