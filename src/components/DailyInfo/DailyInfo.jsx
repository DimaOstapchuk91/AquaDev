import WaterList from "../WaterList/WaterList.jsx";

const DailyInfo = () => {
  const waterData = [
    { volume: 250, time: '08:00' },
    { volume: 200, time: '10:30' },
    { volume: 300, time: '12:45' },
    { volume: 150, time: '14:00' },
    { volume: 400, time: '16:20' },
  ];
  return (
    <div>
      <h3>Consumed Water</h3>
      <WaterList waterData={waterData}/>
    </div>
  );
};

export default DailyInfo;
