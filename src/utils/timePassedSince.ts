export const timePassedSince = (
  startTimeStr: string
): number => {
  const start = new Date(startTimeStr);
  const now = new Date();

  if (isNaN(start.getTime())) return 0; // or throw an error, depending on use case

  return now.getTime() - start.getTime();
};
