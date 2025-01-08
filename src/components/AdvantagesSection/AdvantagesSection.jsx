import css from '../AdvantagesSection/AdvantagesSection.module.css';

const AdvantagesSection = () => {

  return (
    <div className={css.section}>
      <div className={css.customersBox}>
        <p className={css.sectionsTextLeters}>
          Our <span className={css.span}>happy</span> <br />{' '}
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