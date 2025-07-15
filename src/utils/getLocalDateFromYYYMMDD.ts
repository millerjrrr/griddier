const getLocalDateFromYYYYMMDD = (dateString: string) => {
  if (dateString === "") return new Date();
  const [year, month, day] = dateString
    .split("-")
    .map(Number);
  return new Date(year, month - 1, day);
};

export default getLocalDateFromYYYYMMDD;
