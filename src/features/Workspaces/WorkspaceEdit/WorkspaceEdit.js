/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import workspacesService from 'services/workspaces';
//components/ui
import {
  ErasePanel,
  ProfilePanel,
  SubdomainPanel,
  CustomDomainPanel,
} from './components';
import { makeStyles } from '@mui/material';

const WorkspaceEdit = () => {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState(null);

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();

  const fetchWorkspace = async () => {
    const response = await workspacesService.getWorkspace(id);

    setWorkspace(response);
  };

  useEffect(() => {
    fetchWorkspace();
  }, []);

  if (!workspace) return <></>;
  return (
    <div className={classes.root}>
      <div className="border-faded border-0">
        <div className="page-content">
          <div className="content">
            <div className="text-center m-1 h1"></div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <ProfilePanel workspace={workspace} fetchWorkspace={fetchWorkspace} />
              <SubdomainPanel
                workspace={workspace}
                setWorkspace={setWorkspace}
                fetchWorkspace={fetchWorkspace}
              />
              <CustomDomainPanel
                workspace={workspace}
                fetchWorkspace={fetchWorkspace}
              />
              <ErasePanel workspace={workspace} setWorkspace={setWorkspace} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceEdit;
