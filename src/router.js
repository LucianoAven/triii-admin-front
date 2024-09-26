import React from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import { DataContext } from './context/contextApi';
import { ResetPasswordView, SignInView, SignUpView } from 'components';
import ProximamenteView from 'components/ProximamenteView/ProximamenteView';

/** Components */
import MainLayout from './features/MainLayout';
import { Workspaces, WorkspaceAdd, WorkspaceEdit } from './features/Workspaces';
import AuditLog from './features/auditLog/AuditLog';
import Profile from './features/Profile';
import Subscription from './features/Subscription/Subscription';
import Invoices from './features/Invoices/Invoices';
import Plans from 'features/Plans/Plans';
class Routes extends React.Component {
  static contextType = DataContext;
  render() {
    // const i = 0; 
    return (
       <MainLayout>
        <ReactRoutes>    
          {/* {i === 0 && (
            <Route path="/" element={<Profile />} />
            )} */}
          <Route path="/" element={<Profile />} />
          <Route path="/workspaces" element={<Workspaces />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/subscribe" element={<Subscription />} />
          <Route path="/auditlog" element={<AuditLog />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/workspaces/:id" element={<WorkspaceEdit />} />
          <Route path="/workspaces/Add" element={<WorkspaceAdd />} />
          <Route path="/signin" element={<SignInView />} />
          <Route path="/signup" element={<ProximamenteView />} />
          <Route path="/forgotpassword" element={<ResetPasswordView />} />
          <Route path="/signuptest" element={<SignUpView />} />
          <Route path="/subscribe/plans/:id" element={<Plans />} />
        </ReactRoutes>
      </MainLayout>
    );
  }
}

export default Routes;
