import s from './WaterItem.module.css'

const WaterItem = ({ value, time }) => {
  return (
    <div style={s.item}>
      <p>{value}ml</p>
      <p>{time}</p>
    </div>
  );
};
export default WaterItem;
