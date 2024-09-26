/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, Fragment } from 'react';
import Router from './router';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSession,
  getSessionStatus,
  setSession,
} from './ReduxToolkit/features/sessionSlice';
import { setUser, getUserStatus } from './ReduxToolkit/features/user/userSlice.ts';
import moment from 'moment';
// import PageLoading from 'components/PageLoading/PageLoading';
//components/ui

const App = () => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const sessionStatus = useSelector(getSessionStatus);
  const userStatus = useSelector(getUserStatus);

  useEffect(() => {
    let momentLocale = moment.locale(
      navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language
    );
    console.log('momentLocale', momentLocale);
  }, []);

  useEffect(() => {
    dispatch(setSession());
  }, []);

  useEffect(() => {
    if (sessionStatus === 'succeeded' && userStatus === 'idle' && session) {
      dispatch(setUser());
    }
  }, [sessionStatus]);

  return (
    // <Fragment>{userStatus === 'succeeded' ? <Router /> :  <PageLoading />}</Fragment>
    <Fragment><Router /></Fragment>
  );
};

export default App;
