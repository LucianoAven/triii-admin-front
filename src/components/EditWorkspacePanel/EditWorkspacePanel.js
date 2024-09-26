import React, { useContext } from 'react';
import { StyleContext } from 'style/styleProvider';
import Typography from '@mui/material/Typography';

const EditWorkspacePanel = ({ children, title }) => {
  const { color, fontSize } = useContext(StyleContext);

  return (
    <div className="panel">
      <div className="panel-hdr">
        <Typography color={color.slate[700]} fontSize={fontSize.sm}>
          {title}
        </Typography>
      </div>
      <div className="panel-container show">
        <div className="panel-content">{children}</div>
      </div>
    </div>
  );
};

export default EditWorkspacePanel;
