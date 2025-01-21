export const formatDateDatMonth = (dateStr) => {
  if (!dateStr) return "";

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateStr);

  const currentMonth = months[date.getMonth()];
  const currentYear = date.getFullYear();

  return `${currentMonth}, ${currentYear}`;
};
