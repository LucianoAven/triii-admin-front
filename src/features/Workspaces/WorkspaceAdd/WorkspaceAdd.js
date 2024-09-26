import React, { useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'react-image-crop/dist/ReactCrop.css';
import { useTranslation } from 'react-i18next';
import { StyleContext } from '../../../style/styleProvider';
import { CreateSpaceForm } from './components';
import Typography from '@mui/material/Typography';

const WorkspaceAdd = () => {
  const { t } = useTranslation();
  const { fontSize } = useContext(StyleContext);

  return (
    <div>
      <div className="border-faded border-0">
        <div className="page-content">
          <div className="content">
            <div className="text-center m-1 h1"></div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <div id="AccountProfileInfoPanel" className="panel">
                <div className="panel-hdr">
                  <Typography fontWeight={500} fontSize={fontSize.sm}>
                    {t('workSpaces.createNewSpace')}
                  </Typography>
                </div>
                <div className="panel-container show">
                  <div className="panel-content">
                    <CreateSpaceForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceAdd;
