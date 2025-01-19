import { BallTriangle } from "react-loader-spinner";
import { useMediaQuery } from "react-responsive";

const Loader = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const size = isMobile ? 40 : 60;

  return (
    <BallTriangle
      height={size}
      width={size}
      radius={5}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      wrapperClass=""
      visible={true}
    />
  );
};

export default Loader;
