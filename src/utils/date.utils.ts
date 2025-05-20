export const isStartDateGreaterThanEndDate = (
  startDate: Date,
  endDate: Date,
): boolean => {
  return startDate.getTime() > endDate.getTime()
}
