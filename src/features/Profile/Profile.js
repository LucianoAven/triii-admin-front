import React, { useEffect } from 'react';

//components/ui
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css';
import {
  ResetPasswordPanel,
  PersonalInformationPanel,
  EraseAccountPanel,
  SelectLanguagePanel
} from './components';
import { Container } from '@mui/material';

toast.configure();

const Profile = () => {
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.pathname = "/profile";
    }
  }, []);

  return (
    <div className="border-faded border-0">
      <Container maxWidth="md">
        <PersonalInformationPanel />
        <ResetPasswordPanel />
        <SelectLanguagePanel />

        <EraseAccountPanel />
      </Container>
    </div>
  );
};

export default Profile;
