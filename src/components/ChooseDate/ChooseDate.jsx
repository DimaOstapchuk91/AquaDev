import { useSelector } from 'react-redux';
import { selectDateDay } from '../../redux/water/selectors.js';
import {
  formatDateDatMonth,
  getFormattedDate,
} from '../../utils/formatDate.js';
import s from './ChooseDate.module.css';

const ChooseDate = () => {
  const getDate = useSelector(selectDateDay);

  const comparison = getFormattedDate(new Date());

  const chosenDay =
    comparison === getDate ? 'Today' : formatDateDatMonth(getDate);

  return (
    <div>
      <p className={s.todayText}>{chosenDay}</p>
    </div>
  );
};
export default ChooseDate;