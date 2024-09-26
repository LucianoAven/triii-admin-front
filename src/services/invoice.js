/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import refreshedJwtToken from 'helpers/refreshedJwtToken';

const URL = '/api/v1/Spaces';

//GET
const getInvoice = async (id) => {
  const token = await refreshedJwtToken();
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const response = await axios.get(`${URL}/${id}`, config);
  return response.data;
};

const getInvoicesList = async () => {
  const token = await refreshedJwtToken();
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const response = await axios.get(URL, config);
  return response.data;
};

export default {
  getInvoice,
  getInvoicesList,
};
