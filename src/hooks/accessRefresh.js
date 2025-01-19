import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { aquaDevApi, setAuthHeader } from '../redux/service/configApi.js';
import { refreshUser } from '../redux/user/operations.js';
import { selectIsLoggedIn } from '../redux/user/selectors.js';

const useAccessRefresh = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!isLogin) return;

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

            originalRequest.headers.Authorization = 'Bearer ' + token;

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
  }, [dispatch, isLogin]);

  return null;
};

export default useAccessRefresh;
