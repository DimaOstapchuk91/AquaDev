import { useDispatch } from 'react-redux';
import { aquaDevApi, setAuthHeader } from '../redux/service/configApi.js';
import { refreshUser } from '../redux/user/operations.js';

const useAccessRefresh = () => {
  const dispatch = useDispatch();

  const interceptor = aquaDevApi.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        error.config &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const token = await dispatch(refreshUser()).unwrap();
          setAuthHeader(token);
          console.log('test castom hook');
          console.log('token in castom hook', token);
          //   console.log(originalRequest);

          console.log('request');
          return await aquaDevApi(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return () => {
    aquaDevApi.interceptors.response.eject(interceptor);
  };
};

export default useAccessRefresh;
