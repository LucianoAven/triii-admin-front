/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import refreshedJwtToken from 'helpers/refreshedJwtToken';

const URL = '/api/v1/Spaces';

//GET
const getAddress = async (id) => {
  const token = await refreshedJwtToken();
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const response = await axios.get(`${URL}/${id}`, config);
  return response.data;
};

const getAddressList = async () => {
  const token = await refreshedJwtToken();
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const response = await axios.get(URL, config);
  return response.data;
};

//PUT
const updateAddress = async (dataJSON) => {
  const token = await refreshedJwtToken();
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const response = await axios.put(URL, dataJSON, config);
  return response.data;
};



export default {
  getAddress,
  getAddressList,
  updateAddress,
};
