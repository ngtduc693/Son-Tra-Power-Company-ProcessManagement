export const getDayOfTime = (d1, d2) => {
  let ms1 = d1.getTime();
  let ms2 = d2.getTime();
  return Math.abs(Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000)));
};
export const convertTimestampToDate = (d) => {
  return d ? new Date(d.seconds * 1000 + d.nanoseconds / 1000000) : "";
};

export const convertDateTimeToString = (today) => {
  if (today) {
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }
  return "";
};

export const getCurrentDate = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export const convertVnTimeStringToDate =(str) => {
  var parts = str.split("/");
  var day = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[2], 10);
  return new Date(year, month - 1, day);
}

export const convertDateTimeStringToVnTime = (today) => {
  return today ? convertDateTimeToString(new Date(Date.parse(today))) : "";
};

export const timestampRenderer = ({ value }) => {
  return value === undefined || value === null
    ? ""
    : convertDateTimeToString(convertTimestampToDate(value));
};
export const hyperlinkMultiValueRenderer = ({ value }) => {
  return (
    <div>
      <a href={value[0].link}>value[0].name</a>
      <br></br>
      <a href={value[1].link}>value[1].name</a>
    </div>
  );
};
