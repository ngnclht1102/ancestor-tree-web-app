import moment from 'moment'

/**
 * Sort objects by latest date first
 * @param item1 Object with a createdAt field that contains a Date string
 * @param item2 Object with a createdAt field that contains a Date string
 * @returns {number} Ordering
 */
export const dateSortDesc = (item1: any, item2: any) => {
  const date1 = new Date(item1.createdAt)
  const date2 = new Date(item2.createdAt)
  if (moment(date1).isAfter(date2)) return -1
  if (moment(date1).isBefore(date2)) return 1
  return 0
}
