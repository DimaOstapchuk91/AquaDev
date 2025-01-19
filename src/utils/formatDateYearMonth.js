export const getformatDateYearMonth = (getDate) => {
  const date = getDate;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
};
