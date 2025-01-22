import i18next from "i18next";

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
    i18next.t("months.january"),
    i18next.t("months.february"),
    i18next.t("months.march"),
    i18next.t("months.april"),
    i18next.t("months.may"),
    i18next.t("months.june"),
    i18next.t("months.july"),
    i18next.t("months.august"),
    i18next.t("months.september"),
    i18next.t("months.october"),
    i18next.t("months.november"),
    i18next.t("months.december"),
  ];

  const date = new Date(dateStr);

  const day = date.getDate();
  const month = months[date.getMonth()];
  return `${day}, ${month}`;
};

export const formatDateYearMonth = (dateStr) => {
  if (!dateStr) return "";

  const months = [
    i18next.t("months.january"),
    i18next.t("months.february"),
    i18next.t("months.march"),
    i18next.t("months.april"),
    i18next.t("months.may"),
    i18next.t("months.june"),
    i18next.t("months.july"),
    i18next.t("months.august"),
    i18next.t("months.september"),
    i18next.t("months.october"),
    i18next.t("months.november"),
    i18next.t("months.december"),
  ];

  const date = new Date(dateStr);
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month}, ${year}`;
};
