import { getSession } from 'ReduxToolkit/features/sessionSlice';

const refreshedJwtToken = async () => {
  const session = await getSession();
  const { jwtToken } = session.idToken;

  return jwtToken;
};

export default refreshedJwtToken;
