/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import refreshedJwtToken from 'helpers/refreshedJwtToken';

const URL = '/api/v1/Spaces';

//GET
const getWorkspace = async (id) => {
  const token = await refreshedJwtToken();
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.get(`${URL}/${id}`, config);
  return response.data;
};

const getWorkspaces = async () => {
  const token = await refreshedJwtToken();
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const response = await axios.get(URL, config);
  return response.data;
};

//POST
const postWorkspacePhoto = async (id, photo) => {
  const token = await refreshedJwtToken();
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const fd = new FormData();

  fd.append('photo', photo, photo.name);

  const response = await axios.post(`${URL}/${id}/setphoto`, fd, config);
  return response.data;
};

const postWorkspace = async (newWorkspaceJson) => {
  const token = await refreshedJwtToken();
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const response = await axios.post(URL, newWorkspaceJson, config);
  return response.data;
};

//PUT
const updateWorkspace = async (dataJSON) => {
  const token = await refreshedJwtToken();
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const response = await axios.put(URL, dataJSON, config);
  return response.data;
};

const putWorkspaceDomain = async (dataJSON, id) => {
  const token = await refreshedJwtToken();
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.put(`${URL}/${id}/customDomain`, dataJSON, config);
  return response.data;
};

//DEL
const deleteWorkspace = async (id) => {
  const token = await refreshedJwtToken();
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const response = await axios.delete(`${URL}/${id}`, config);
  return response.data;
};

const deleteCustomDomain = async (id) => {
  const token = await refreshedJwtToken();
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const response = await axios.delete(`${URL}/${id}/customDomain`, config);
  return response.data;
};

export default {
  getWorkspace,
  getWorkspaces,
  postWorkspace,
  deleteWorkspace,
  putWorkspaceDomain,
  updateWorkspace,
  postWorkspacePhoto,
  deleteCustomDomain,
};
