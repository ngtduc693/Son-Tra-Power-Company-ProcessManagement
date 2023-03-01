export const getDayOfTime = (d1, d2) => {
  let ms1 = d1.getTime();
  let ms2 = d2.getTime();
  return Math.abs(Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000)));
};
export const convertTimestampToDate = (d) => {
  return new Date(d.seconds * 1000 + d.nanoseconds / 1000000);
};

export const convertDateTimeToString = (today) => {
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}
