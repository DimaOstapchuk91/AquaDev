import css from "../AdvantagesSection/AdvantagesSection.module.css";

import firstCostomerMob from "../../assets/img/HomePageImg/customer1-phone.png";
import secondCustomerMob from "../../assets/img/HomePageImg/customer2-phone.png";
import thirdCustomerMob from "../../assets/img/HomePageImg/customer3-phone.png";

import firstCostomerMob2x from "../../assets/img/HomePageImg/customer1-phone-2x.png";
import secondCustomerMob2x from "../../assets/img/HomePageImg/customer2-phone-2x.png";
import thirdCustomerMob2x from "../../assets/img/HomePageImg/customer3-phone-2x.png";

import firstCostomer from "../../assets/img/HomePageImg/customer1-tab-desc.png";
import secondCustomer from "../../assets/img/HomePageImg/customer2-tab-desc.png";
import thirdCustomer from "../../assets/img/HomePageImg/customer3-tab-desc.png";

import firstCostomer2x from "../../assets/img/HomePageImg//customer1-tab-desc-2x.png";
import secondCustomer2x from "../../assets/img/HomePageImg/customer2-tab-desc-2x.png";
import thirdCustomer2x from "../../assets/img/HomePageImg/customer3-tab-desc-2x.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectAllUsersCount } from "../../redux/user/selectors";
import { getAllUsersCount } from "../../redux/user/operations";

const AdvantagesSection = () => {
  const dispatch = useDispatch();
  const allUsersCount = useSelector(selectAllUsersCount);

  useEffect(() => {
    dispatch(getAllUsersCount());
  }, [dispatch]);
  console.log("All Users Count:", allUsersCount);

  return (
    <div className={css.section}>
      <div className={css.customersBox}>
        <div className={css.customersContainer}>
          <picture className={css.firstContainer}>
            <source
              srcSet={`${firstCostomerMob} 1x, ${firstCostomerMob2x} 2x`}
              media="(max-width: 767px)"
            />
            <source
              srcSet={`${firstCostomer} 1x, ${firstCostomer2x} 2x`}
              media="(min-width: 768px)"
            />
            <img
              className={`${css.pictureImage}`}
              src={firstCostomer}
              alt="firstCustomer"
              loading="lazy"
            />
          </picture>
          <picture className={css.secondContainer}>
            <source
              srcSet={`${secondCustomerMob} 1x, ${secondCustomerMob2x} 2x`}
              media="(max-width: 767px)"
            />
            <source
              srcSet={`${secondCustomer} 1x, ${secondCustomer2x} 2x`}
              media="(min-width: 768px)"
            />
            <img
              className={`${css.pictureImage}`}
              src={secondCustomer}
              alt="secondCustomer"
              loading="lazy"
            />
          </picture>
          <picture className={css.thirdContainer}>
            <source
              srcSet={`${thirdCustomerMob} 1x, ${thirdCustomerMob2x} 2x`}
              media="(max-width: 767px)"
            />
            <source
              srcSet={`${thirdCustomer} 1x, ${thirdCustomer2x} 2x`}
              media="(min-width: 768px)"
            />
            <img
              className={`${css.pictureImage}`}
              src={thirdCustomer}
              alt="thirdCustomer"
              loading="lazy"
            />
          </picture>
        </div>
        <p className={css.sectionsTextLeters}>
          Our <span className={css.span}>{allUsersCount} happy</span> <br />{" "}
          customers
        </p>
      </div>
      <div className={css.group}>
        <ul className={css.groupList}>
          <li className={css.groupListItem}>
            <div className={css.ellipse}></div>
            <p className={css.groupListItemText}>Habit drive</p>
          </li>
          <li className={css.groupListItem}>
            <p className={css.groupListItemTextBlack}>View statistics</p>
          </li>
          <li className={css.groupListItem}>
            <p className={css.groupListItemTextBlack}>Personal rate setting</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdvantagesSection;
