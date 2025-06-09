export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const minutesStr = minutes > 0 ? `${minutes} хв` : "";
  const secondsStr = remainingSeconds > 0 ? `${remainingSeconds} сек` : "";

  return [minutesStr, secondsStr].filter(Boolean).join(" ");
}
