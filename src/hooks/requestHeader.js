import { useSelector } from "react-redux";
import { aquaDevApi } from "../redux/service/configApi.js";
import { selectAccesToken } from "../redux/user/selectors.js";

const useRequestHeader = () => {
  const accessToken = useSelector(selectAccesToken);
  aquaDevApi.interceptors.request.use(
    (request) => {
      if (accessToken) {
        request.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default useRequestHeader;
