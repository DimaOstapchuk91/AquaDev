import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/user/slice.js';
import Loader from '../../components/Loader/Loader.jsx';
import { setAuthHeader } from '../../redux/service/configApi.js';

const GoogleCallbacks = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');

    if (accessToken) {
      dispatch(setUser({ token: accessToken }));

      navigate('/tracker');
      setAuthHeader(accessToken);
    } else {
      console.error('Authorization failed. No access token found.');
    }
  }, [searchParams, dispatch, navigate]);

  //
  return (
    <div>
      Авторизація... <Loader />
    </div>
  );
};

export default GoogleCallbacks;
