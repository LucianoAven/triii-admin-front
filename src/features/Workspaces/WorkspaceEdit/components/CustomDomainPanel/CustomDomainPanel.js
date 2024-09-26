import React from 'react';
import { useTranslation } from 'react-i18next';
//components/ui
import DomainCustomize from './components/DomainCustomize';
import EditWorkspacePanel from 'components/EditWorkspacePanel/EditWorkspacePanel';

const CustomDomainPanel = ({ workspace, setWorkspace, fetchWorkspace }) => {
  const { t } = useTranslation();

  return (
    <EditWorkspacePanel title={t('workSpaces.customDomain')}>
      <DomainCustomize
        workspace={workspace}
        setWorkspace={setWorkspace}
        fetchWorkspace={fetchWorkspace}
      />
    </EditWorkspacePanel>
  );
};

export default CustomDomainPanel;
