import s from "./WaterItem.module.css";
import sprite from "../../assets/sprite.svg";
import Modal from "../Modal/Modal.jsx";
import WaterModal from "../Modal/WaterModal/WaterModal.jsx";
import { useState } from "react";
import DeleteWaterModal from "../Modal/DeleteWaterModal/DeleteWaterModal.jsx";

const WaterItem = ({ id, amount, time }) => {
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);

  const liters = amount > 999 ? Number((amount / 1000).toFixed(2)) : amount;

  const handleDelete = () => {
    setIsModalDelete(true);
  };

  const handleEdit = () => {
    setIsModalEdit(true);
  };

  const handleDeleteClose = () => {
    setIsModalDelete(false);
  };

  const handleEditClose = () => {
    setIsModalEdit(false);
  };

  return (
    <li className={s.item}>
      <svg className={s.iconGlass} width="38" height="38">
        <use href={`${sprite}#icon-mage_water-glass-fill`}></use>
      </svg>
      <div className={s.dataWrapper}>
        <p className={s.textVolume}>{liters}{amount > 999 ? 'L' : 'ml'}</p>
        <p className={s.textTime}>{time}</p>
      </div>
      <div className={s.dataWrapperIcon}>
        <button className={s.buttonItem} type="button" onClick={handleEdit}>
          <svg className={s.iconChange} width="14" height="14">
            <use className={s.hoverIcon} href={`${sprite}#icon-edit-2`}></use>
          </svg>
        </button>
        <button className={s.buttonItem} type="button" onClick={handleDelete}>
          <svg className={s.iconDell} width="14" height="14">
            <use className={s.hoverIcon} href={`${sprite}#icon-trash-04`}></use>
          </svg>
        </button>
        <div>
          <Modal isOpen={isModalEdit} onClose={handleEditClose}>
            <WaterModal
              isOpen={isModalEdit}
              onClose={handleEditClose}
              id={id}
              type={"edit"}
            />
          </Modal>
          <Modal isOpen={isModalDelete} onClose={handleDeleteClose}>
            <DeleteWaterModal
              isOpen={isModalDelete}
              onClose={handleDeleteClose}
              id={id}
            />
          </Modal>
        </div>
      </div>
    </li>
  );
};
export default WaterItem;
