import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleContext } from '../../../../../../style/styleProvider';
import Payment from './components';
import paymentList from '../../../../utils/paymentList';
import {Box, Button} from '@mui/material';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';

export default function Body() {
  const { t } = useTranslation();
  const { mediaQuery, buttonSize } = useContext(StyleContext);
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const maxHeight = mediaQuery.md ? '56vh' : mediaQuery.lg ? '58vh' : '63vh';

  const addPayments = () => {
    const filteredPaymentsLenght = filteredPayments.length;
    const paymentsToAdd = payments.slice(
      filteredPaymentsLenght,
      filteredPaymentsLenght + 3
    );
    setFilteredPayments(filteredPayments.concat(paymentsToAdd));
  };

  useEffect(() => {
    const initNumPayments = mediaQuery.xl ? 4 : 3;
    setPayments(paymentList);
    setFilteredPayments(paymentList.slice(0, initNumPayments));
  }, [mediaQuery.xl]);

  return (
    <Box
      height={'80%'}
      display={'flex'}
      maxHeight={maxHeight}
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box maxHeight="90%" height="90%" overflow="auto" pb={1}>
        {filteredPayments.map((payment) => (
          <Payment key={payment.id} pending={payment.pending} />
        ))}
      </Box>
      <Button
        style={{ alignSelf: 'center' }}
        size={buttonSize.responsive}
        color="primary"
        variant="contained"
        startIcon={<KeyboardDoubleArrowDownRoundedIcon />}
        onClick={() => addPayments()}
      >
        {t('interface.loadMore')}
      </Button>
    </Box>
  );
}
