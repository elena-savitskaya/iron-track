const chartColorVars = [
  "--color-chart-1",
  "--color-chart-2",
  "--color-chart-3",
  "--color-chart-4",
  "--color-chart-5",
];

export const getRandomChartColor = () => {
  const index = Math.floor(Math.random() * chartColorVars.length);
  return getComputedStyle(document.documentElement)
    .getPropertyValue(chartColorVars[index])
    .trim();
};
