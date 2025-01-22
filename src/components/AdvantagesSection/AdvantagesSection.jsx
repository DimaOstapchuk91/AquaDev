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

import LocalizationDropdown from "../LocalizationDropdown/LocalizationDropdown";
import { Trans, useTranslation } from "react-i18next";

const AdvantagesSection = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const allUsersCount = useSelector(selectAllUsersCount);

  useEffect(() => {
    dispatch(getAllUsersCount());
  }, [dispatch]);

  return (
    <div className={css.section}>
      <div className={css.parentOneVisible}>
        <LocalizationDropdown />
      </div>
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
          <Trans
            i18nKey={
              allUsersCount === 1
                ? "advantagesSection.happyCustomers_one"
                : allUsersCount >= 2 && allUsersCount <= 4
                ? "advantagesSection.happyCustomers_two"
                : "advantagesSection.happyCustomers_other"
            }
            values={{ allUsersCount }}
            components={{
              span: <span className={css.span} />,
              br: <br />,
            }}
          />
        </p>
      </div>
      <div className={css.group}>
        <ul className={css.groupList}>
          <li className={css.groupListItem}>
            <div className={css.ellipse}></div>
            <p className={css.groupListItemText}>
              {t("advantagesSection.habitDrive")}
            </p>
          </li>
          <li className={css.groupListItem}>
            <p className={css.groupListItemTextBlack}>
              {t("advantagesSection.viewStatistics")}
            </p>
          </li>
          <li className={css.groupListItem}>
            <p className={css.groupListItemTextBlack}>
              {t("advantagesSection.personalRateSettings")}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdvantagesSection;
