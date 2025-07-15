const zeroTime = (date: Date) => {
  date.setHours(0, 0, 0, 0);
  return date;
};
export default zeroTime;
