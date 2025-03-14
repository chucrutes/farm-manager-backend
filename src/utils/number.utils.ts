export const calculatePercentage = (value: number): number => {
  return value / 100
}

export const calculateTotalAfterCommission = (
  total: number,
  commission: number,
): number => {
  const percentage = calculatePercentage(commission)
  return total * (1 - percentage)
}
