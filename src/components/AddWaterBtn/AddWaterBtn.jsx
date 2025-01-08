import React from "react";
import "./AddWaterBtn.css";

const AddWaterBtn = ({ customClassName }) => {
  const handleAddWaterBtnClick = () => {
    //   tbd openning Modal...some state?
  };

  return (
    <button
      type="button"
      onClick={handleAddWaterBtnClick}
      className={customClassName}
    >
      <div className="textContainer">
        <span className="spanContainer">+</span> Add water
      </div>
    </button>
  );
};

export default AddWaterBtn;
