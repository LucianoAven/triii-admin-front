/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import refreshedJwtToken from 'helpers/refreshedJwtToken';

const URL = '/api/v1/User';

const getUser = async () => {
  const token = await refreshedJwtToken();
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const response = await axios.get(URL, config);
  return response.data;
};

const updateUser = async (newUserJson) => {
  const token = await refreshedJwtToken();
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const response = await axios.put(URL, newUserJson, config);
  return response.data;
};

const deleteUser = async () => {
  const token = await refreshedJwtToken();
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const response = await axios.delete(URL, config);
  return response.data;
};

export default { getUser, updateUser, deleteUser };
