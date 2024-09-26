import React, { useEffect, useCallback, useState, useContext } from 'react'; //eslint-disable-line
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './AuditLog.css';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DataContext } from 'context/contextApi';
import useMediaQuery from '@mui/material/useMediaQuery';
import Skeleton from '@mui/material/Skeleton';

//Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//Select
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

//Ppopover
import Popover from '@mui/material/Popover';

//RangePicker
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import moment from 'moment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useSelector, useDispatch } from 'react-redux';
//Redux
import {
  selectLogs,
  setLogs,
  setLogDateFilter,
  LogsTypeFilterSelector,
  LogsinitDateFilterSelector,
  LogsEndDateFilterSelector,
  LogTypeFilter,
  getLogsStatus,
} from 'ReduxToolkit/features/auditLogSlice';
import { getSessionStatus } from 'ReduxToolkit/features/sessionSlice';
import { es } from 'date-fns/locale';
// import { padding } from "@mui/system";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//session
import { setSession } from 'ReduxToolkit/features/sessionSlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
//Tipos de log
const Types = [
  { type: 1, value: 'Info' },
  { type: 2, value: 'Warning' },
  { type: 3, value: 'Error' },
];
function getStyles(name, valueType, theme) {
  return {
    fontSize: 12,
    fontWeight:
      valueType.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

toast.configure();

const AuditLog = () => {
  const { isMobile, showPageSideBar } = useContext(DataContext);
  const dispatch = useDispatch();
  const sessionStatus = useSelector(getSessionStatus);
  const Logs = useSelector(selectLogs);
  const initDate = useSelector(LogsinitDateFilterSelector);
  const endDate = useSelector(LogsEndDateFilterSelector);
  const typeDate = useSelector(LogsTypeFilterSelector);
  const { t } = useTranslation();
  const theme = useTheme();
  const logStatus = useSelector(getLogsStatus);

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  //#region Style
  const mobileStyle = {
    width: isMobile ? '100%' : '',
    flexColumn: isMobile ? 'column' : 'row',
    padding: isMobile ? '10px' : '',
    paddingLeft0: isMobile ? 'pl-0' : '',
    minWidth: isMobile ? 'min-width: calc(100vw - 108px)' : '',
  };

  //#endregion Style

  const [selectedDate, setSelectedDate] = useState({
    // initDate: useSelector(LogsinitDateFilterSelector),
    initDate: moment().startOf('month').format('L'),
    endDate: moment().endOf('month').format('L'),
  });

  useEffect(() => {
    if (sessionStatus === 'succeeded') {
      const initDate = moment().startOf('month').unix();
      const endDate = moment().endOf('month').unix();
      const typeDate = '';
      dispatch(setLogDateFilter({ initDate: initDate, endDate: endDate }));
      dispatch(setLogs({ initDate, endDate, typeDate }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //#region FilterEvents

  //#region SelectTypeFilter
  const [valueType, setValueType] = React.useState([]);

  const handleChangeFilterType = (event) => {
    let filterType = event.target.value;

    dispatch(LogTypeFilter({ ...filterType }));
    // dispatch(LogTypeFilter(valueType => [...valueType, filterType]))

    const {
      target: { value },
    } = event;

    setValueType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  //#endregion SelectTypeFilter
  //#region PopoverRangePicker
  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const open = Boolean(openPopover);
  const id = open ? 'simple-popover' : undefined;
  //#endregion PopoverRangePicker
  //#region RangePicker
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: 'selection',
    },
  ]);

  const selectRangeDate = useCallback((item) => {
    let fechaInicio = moment(item.selection.startDate).format('L');
    let fechaFin = moment(item.selection.endDate).format('L');
    let fechaInicioUnix = moment(item.selection.startDate).unix();
    let fechaFinUnix = moment(item.selection.endDate).unix();
    // const { initDate } = fechaInicio;
    // const { endDate } = fechaFin;
    dispatch(setLogDateFilter({ initDate: fechaInicioUnix, endDate: fechaFinUnix }));
    // setDate(date =>[...date, {startDate: fechaInicio, endDate: fechaFin}]);
    setDate([item.selection]);
    setSelectedDate({
      ...selectedDate,
      initDate: fechaInicio,
      endDate: fechaFin,
    });
    //eslint-disable-next-line
  }, []);
  //#endregion RangePicker
  //#region ApplyFilter

  const AplicarFiltro = async () => {
    if (sessionStatus === 'succeeded') {
      await dispatch(setSession());
      dispatch(setLogs({ initDate, endDate, typeDate })); //createAsyncThunk de Redux Toolkit permite multiples paramatremos solo si se pasan dentro de un objeto
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  //#endregion ApplyFilter
  //#endregion FilterEvents
  // console.log("logStatus ==", logStatus);
  useEffect(() => {
    logStatus === 'failed' && toast.error('No se pudo acceder a los registros');
  }, [logStatus === 'failed']); //eslint-disable-line

  return (
    <>
      <Box
        className="overflow-auto api-custom-scroll"
        style={{
          maxHeight: 'calc(100vh - 120px)',
          paddingRight: isMd ? '10px' : '0px',
        }}
      >
        <div style={{ margin: 16, marginTop: 0 }}>
          <div id="AccountProfileInfoPanel" className="panel">
            <div
              className={!isMd ? 'panel-hdr panel-hdr-xs' : 'panel-hdr'}
              style={{ justifyContent: 'space-between' }}
            >
              <Box
                className={
                  !isMd
                    ? 'd-flex align-items-center pl-0'
                    : 'd-flex align-items-center'
                }
                style={{ flexDirection: mobileStyle.flexColumn }}
              >
                <div>
                  <Box
                    className="boxOutlined"
                    style={{
                      minWidth: !isMd
                        ? showPageSideBar
                          ? 'calc(100vw - 150px)'
                          : 'calc(100vw - 108px)'
                        : '',
                    }}
                    onClick={handleOpenPopover}
                  >
                    <Typography
                      component={'span'}
                      sx={{ marginRight: 3, cursor: 'default' }}
                    >
                      {selectedDate.initDate} - {selectedDate.endDate}
                    </Typography>

                    <DateRangeIcon sx={{ cursor: 'pointer' }}></DateRangeIcon>
                  </Box>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={openPopover}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    {/* RangePicker */}
                    <DateRangePicker
                      onChange={selectRangeDate}
                      showSelectionPreview={true}
                      moveRangeOnFirstSelection={false}
                      months={2}
                      ranges={date}
                      direction="horizontal"
                      locale={es}
                    />
                    {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
                  </Popover>
                </div>
                <div style={{ marginLeft: !isMd ? '0px' : '15px' }}>
                  <FormControl
                    sx={{
                      m: 1,
                      minWidth: isMobile
                        ? showPageSideBar
                          ? 'calc(100vw - 150px)'
                          : 'calc(100vw - 108px)'
                        : 300,
                      maxWidth: 500,
                    }}
                    size="small"
                  >
                    <InputLabel id="demo-multiple-chip-label">
                      {t('global.type')}
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={valueType}
                      onChange={handleChangeFilterType}
                      input={
                        <OutlinedInput id="select-multiple-chip" label="Tipo" />
                      }
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={
                                value === 1
                                  ? 'Info'
                                  : value === 2
                                  ? 'Warning'
                                  : value === 3
                                  ? 'Error'
                                  : null
                              }
                              style={{ fontSize: 12 }}
                            />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {Types.map((value, index) => (
                        <MenuItem
                          key={index}
                          value={value.type}
                          style={getStyles(value, valueType, theme)}
                        >
                          {value.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </Box>
              <Button
                variant="contained"
                sx={{ marginRight: '16px' }}
                onClick={AplicarFiltro}
              >
                {t('filter.apply')}
              </Button>
            </div>
          </div>
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: isMd ? 'calc(100vh - 250px)' : 'calc(100vh - 340px)',
            }}
          >
            <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ minWidth: '110px' }}
                    style={{ backgroundColor: 'lightgray' }}
                  ></TableCell>
                  <TableCell
                    style={{ backgroundColor: 'lightgray' }}
                    sx={{ minWidth: '200px' }}
                    size={'small'}
                  >
                    {/* {t("editAccountDic.dateHour")} */}
                    {t('tableHeader.dateTime')}
                  </TableCell>
                  <TableCell style={{ backgroundColor: 'lightgray' }}>
                    {t('global.detail')}
                  </TableCell>
                </TableRow>
              </TableHead>

              {logStatus === 'failed' && Logs && (
                <>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan="3" sx={{ width: '100%' }}>
                        <Typography style={{ textAlign: 'center' }}>
                          {t('tableContent.noLogs')}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </>
              )}
              {logStatus === 'succeeded' && Logs.length === 0 && (
                <>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan="3" sx={{ width: '100%' }}>
                        <Typography style={{ textAlign: 'center' }}>
                          {t('tableContent.noLogs')}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </>
              )}
              {logStatus === 'loading' && Logs && Logs.length === 0 && (
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: '110px' }}>
                      <Skeleton variant="rectangular"></Skeleton>
                    </TableCell>
                    <TableCell sx={{ width: '200px' }}>
                      {' '}
                      <Skeleton variant="rectangular"></Skeleton>
                    </TableCell>
                    <TableCell sx={{ width: '100%' }}>
                      {' '}
                      <Skeleton variant="rectangular"></Skeleton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}

              <TableBody>
                {Logs &&
                  logStatus === 'succeeded' &&
                  Logs.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        '&:last-child td, &:last-child th': {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell sx={{ width: '110px' }}>
                        <Typography
                          sx={{
                            color:
                              row.type === 1
                                ? 'green'
                                : row.type === 2
                                ? 'orange'
                                : row.type === 3
                                ? 'red'
                                : 'white',
                            fontSize: '0.8rem',
                          }}
                        >
                          {row.type === 1
                            ? 'Info'
                            : row.type === 2
                            ? 'Warning'
                            : row.type === 3
                            ? 'Error'
                            : 'error data type'}
                        </Typography>
                      </TableCell>
                      <TableCell scope="row" sx={{ minWidth: '200px' }}>
                        {moment(row.datetime).format('L, h:mm a')}
                      </TableCell>
                      <TableCell sx={{ width: '100%' }}>{row.details}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>
    </>
  );
};

export default AuditLog;
