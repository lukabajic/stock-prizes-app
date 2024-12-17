export const formatPercentage = (value: string) => {
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return value;
  return `${numericValue.toFixed(2)}%`;
};

export const formatVolume = (value: string) => {
  const num = parseInt(value, 10);
  if (isNaN(num)) return value;
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
};
