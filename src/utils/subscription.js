export const calcEndDate = (startDate, days) => {
  const d = new Date(startDate);
  d.setDate(d.getDate() + Number(days || 30));
  return d;
};
