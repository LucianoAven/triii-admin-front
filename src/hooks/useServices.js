//redux
import { useDispatch } from 'react-redux';
import { setSession } from 'ReduxToolkit/features/sessionSlice';

const useServices = () => {
  const dispatch = useDispatch();

  const dispatchSession = async () => {
    return await dispatch(setSession());
  };

  return { dispatchSession };
};

export default useServices;
