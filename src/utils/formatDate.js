export const getFormattedDate = (getDate) => {
  const date = getDate;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getformatDateYearMonth = (getDate) => {
  const date = getDate;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
};

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

  const day = date.getDate();
  const month = months[date.getMonth()];
  return `${day}, ${month}`;
};

export const formatDateYearMonth = (dateStr) => {
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
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month}, ${year}`;
};
