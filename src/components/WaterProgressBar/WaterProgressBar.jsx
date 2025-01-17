import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import s from "./WaterProgressBar.module.css";

const WaterProgressBar = ({ value }) => {
  return (
    <div className={s.progressBarContainer}>
      <h3 className={s.title}>Today</h3>
      <Slider
        value={value}
        marks={{
          0: {
            style: {
              color: "rgba(47, 47, 47, 0.6)",
              fontSize: "10px",
              lineHeight: "10px",
              fontWeight: "400",
            },
            label: "0%",
          },
          50: {
            style: {
              color: "rgba(47, 47, 47, 0.6)",
              fontSize: "10px",
              lineHeight: "10px",
              fontWeight: "400",
            },
            label: "50%",
          },
          100: {
            style: {
              color: "rgba(47, 47, 47, 0.6)",
              fontSize: "10px",
              lineHeight: "10px",
              fontWeight: "400",
            },
            label: "100%",
          },
          ...(value <= 100 &&
            (value <= 40 || value >= 60) && {
              [value]: {
                style: {
                  color: "rgba(47, 47, 47, 0.6)",
                  fontSize: "10px",
                  lineHeight: "10px",
                  fontWeight: "400",
                },
                label: `${value}%`,
              },
            }),
        }}
        railStyle={{
          backgroundColor: "#F0EFF4",
          height: 6,
        }}
        handleStyle={{
          borderColor: "#9BE1A0",
          height: 15,
          width: 15,
          marginTop: -5,
        }}
        trackStyle={{
          backgroundColor: "#9BE1A0",
          height: 6,
        }}
      />
    </div>
  );
};

export default WaterProgressBar;
