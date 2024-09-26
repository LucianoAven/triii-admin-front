/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const URL = '/api/v1/Domains/Check';

const getSubdomainAvailability = async (subdomainJson) => {
  const response = await axios.post(URL, subdomainJson);

  return response.data;
};

export default { getSubdomainAvailability };
