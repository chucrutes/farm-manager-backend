export const calculatePercentage = (value: number): number => {
  return value / 100
}

export const calculateTotalAfterCommission = (
  total: number,
  percentage: number,
): number => {
  return total * (1 - percentage)
}
