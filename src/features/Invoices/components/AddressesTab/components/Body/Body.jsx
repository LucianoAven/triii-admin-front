import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleContext } from '../../../../../../style/styleProvider';
import {Box, Table, TableBody, TableCell, TableRow, TextField} from '@mui/material';
import Typography from '@mui/material/Typography';

export default function Body({ user, isEditing, handleInputChange }) {
  const { t } = useTranslation();
  const { fontSize, fontWeight } = useContext(StyleContext);

  function createListData(title, data, name) {
    return { title, data, name };
  }

  const rows = [
    createListData(t('user.firstName'), user?.firstName, 'firstName'),
    createListData(t('user.lastName'), user?.lastName, 'lastName'),
    createListData(t('user.address'), user?.address, 'address'),
    createListData('Cuit', user?.cuit, 'cuit'),
  ];

  return (
    <Box display={'flex'} p={1.5}>
      <Table style={{ width: '100%' }}>
        <TableBody>
          {rows.map((row) => (
            <TableRow style={{ height: '80px' }} key={row.title}>
              <TableCell component="th" scope="row">
                <Typography fontSize={fontSize.md} fontWeight={fontWeight.medium}>
                  {row.title}
                </Typography>
              </TableCell>
              <TableCell style={{ width: '80%' }}>
                {isEditing ? (
                  <TextField
                    className="fadein"
                    variant="outlined"
                    onChange={(event) => handleInputChange(event)}
                    value={row.data}
                    name={row.name}
                    type="text"
                    size="small"
                    sx={{
                      "& legend": { display: "none" },
                      "& fieldset": { top: 0 }
                    }}

                  />
                ) : (
                  <Typography
                    className="fadein"
                    style={{ paddingLeft: '14px' }}
                    fontSize={fontSize.md}
                  >
                    {row.data}
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
