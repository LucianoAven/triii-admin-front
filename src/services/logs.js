/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import refreshedJwtToken from 'helpers/refreshedJwtToken';

const getLogs = async (dateData) => {
  const token = await refreshedJwtToken();
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const URL = `/api/v1/AuditLogs?start=${dateData.initDate}&end=${dateData.endDate}&type=${dateData.typeDate}`;
  const response = await axios.get(URL, config);
  return response.data;
};

export default { getLogs };
