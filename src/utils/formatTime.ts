export default function formatTime(milliseconds: number) {
  const milliInSeconds = Math.round(milliseconds / 1000);
  const minutes = Math.floor(milliInSeconds / 60);
  const seconds = milliInSeconds % 60;

  return milliseconds !== 0
    ? `${minutes}:${seconds.toString().padStart(2, "0")}`
    : "-:--";
}
