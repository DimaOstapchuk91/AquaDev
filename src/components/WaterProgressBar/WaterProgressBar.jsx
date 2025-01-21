import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import s from "./WaterProgressBar.module.css";
import ChooseDate from "../ChooseDate/ChooseDate.jsx";
import { useTranslation } from "react-i18next";

const WaterProgressBar = ({ value, totalWaterInL, dailyNormaInL }) => {
  const { t } = useTranslation();
  return (
    <div className={s.progressBarContainer}>
      <div className={s.titleWrap}>
        <ChooseDate customClassName={"progressBarTitle"} />
        <p className={s.textWrap}>
          {totalWaterInL} / {dailyNormaInL}L
        </p>
      </div>

      <Slider
        value={value}
        marks={{
          0: {
            style: {
              color: "rgba(47, 47, 47, 0.6)",
              fontSize: "10px",
              lineHeight: "10px",
              fontWeight: "400",
              left: "2%",
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
              left: "96%",
            },
            label: "100%",
          },
          ...(value > 0 &&
            value < 100 &&
            value != 50 && {
              [value]: {
                style: {
                  top: "-30px",
                  color: "#87d28d",
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
          cursor: "default",
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
