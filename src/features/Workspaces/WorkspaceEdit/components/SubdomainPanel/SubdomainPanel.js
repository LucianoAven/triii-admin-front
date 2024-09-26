import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// components/ui
import { SubdomainCustom } from './components';
import EditWorkspacePanel from 'components/EditWorkspacePanel/EditWorkspacePanel';

const SubdomainPanel = ({ workspace, setWorkspace, fetchWorkspace }) => {
  const { t } = useTranslation();

  return (
    <EditWorkspacePanel title={t('workSpaces.subdomainName')}>
      <SubdomainCustom
        workspace={workspace}
        setWorkspace={setWorkspace}
        fetchWorkspace={fetchWorkspace}
      />
    </EditWorkspacePanel>
  );
};

SubdomainPanel.propTypes = {
  workspace: PropTypes.object,
  setWorkspace: PropTypes.func,
};

export default SubdomainPanel;
