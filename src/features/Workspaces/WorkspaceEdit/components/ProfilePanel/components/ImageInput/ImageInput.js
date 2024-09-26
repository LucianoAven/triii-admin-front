import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import workspacesService from 'services/workspaces';

//redux
import { useDispatch } from 'react-redux';
import { upsertWorkspace } from 'ReduxToolkit/features/workspace/workspaceSlice.ts';

//components/ui
import { Spinner } from 'react-bootstrap';

const ImageInput = ({ workspaceId, imageUrl, fetchWorkspace }) => {
  const { t } = useTranslation();
  const [savingImage, setSavingImage] = useState(false);
  const dispatch = useDispatch();

  const inputImage = savingImage ? (
    <Spinner
      animation="border"
      style={{
        marginLeft: 5,
        marginRight: 5,
        height: 54,
        width: 54,
        fontSize: '14px',
        color: 'lightgray',
      }}
    />
  ) : (
    <img
      src={imageUrl !== '' ? imageUrl : '/img/buildingDefault.png'}
      className="editIconProfile rounded-circle"
      style={{
        cursor: 'pointer',
        width: 64,
        height: 64,
      }}
      alt=""
    />
  );

  const handleImageChange = async (event) => {
    const newImage = event.target.files[0];

    setSavingImage(true);

    try {
      const updatedWorkspace = await workspacesService.postWorkspacePhoto(
        workspaceId,
        newImage
      );
      await fetchWorkspace();
      dispatch(upsertWorkspace(updatedWorkspace));
    } catch (err) {
      console.log(err);
    }

    setSavingImage(false);
  };

  return (
    <label title={t('global.updatePhoto')}>
      <input
        type="file"
        onChange={(event) => handleImageChange(event)}
        style={{ display: 'none' }}
        disabled={savingImage}
      />
      {inputImage}
    </label>
  );
};

export default ImageInput;
