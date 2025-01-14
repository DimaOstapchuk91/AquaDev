import { useSelector } from 'react-redux';
import WaterItem from '../WaterItem/WaterItem.jsx';
import s from './WaterList.module.css';
import { selectWaterPortions } from '../../redux/water/selectors.js';

const WaterList = () => {
  const dailyData = useSelector(selectWaterPortions);

  return (
    <ul className={s.container}>
      {dailyData.map(item => (
        <WaterItem
          key={item._id}
          id={item._id}
          amount={item.amount}
          time={item.time}
        />
      ))}
    </ul>
  );
};
export default WaterList;
