import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleContext } from '../../../../../../style/styleProvider';
import {Box, Button} from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Typography from '@mui/material/Typography';

export default function Header({
  handleEditButtonClick,
  handleSaveButtonClick,
  isEditing,
}) {
  const { t } = useTranslation();
  const { fontSize, buttonSize } = useContext(StyleContext);

  return (
    <Box
      display={'flex'}
      borderBottom="1px solid #e5e7eb"
      alignItems="center"
      justifyContent="space-between"
      height={'10%'}
      px={3}
    >
      <Typography fontSize={fontSize.lg}>
        {t('subscription.invoicingData')}
      </Typography>
      <Button
        startIcon={<ModeEditOutlineOutlinedIcon />}
        variant="outlined"
        color="primary"
        size={buttonSize.responsive}
        onClick={isEditing ? handleSaveButtonClick : handleEditButtonClick}
      >
        {isEditing
          ? t('global.save')
          : t('global.edit')}{' '}
      </Button>
    </Box>
  );
}
