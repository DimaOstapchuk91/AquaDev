import { BallTriangle } from "react-loader-spinner"
const Loader = () => {
  return (
    <BallTriangle
      height={80}
      width={80}
      radius={5}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      wrapperClass=""
      visible={true}
    />
  )
}

export default Loader