import { getISODay } from 'date-fns';

const range = (start, end) => Array(end - start + 1).fill().map((_, i) => start + i);

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const getDays = start => [...days.slice(start, 7), ...days.slice(0, start)];

export const getDateRows = () => range(1, 7)
  .map(
    i => range(0, 4)
      .map(i2 => i + i2 * 7)
      .map(date => date <= 31 ? date : '')
  );

export const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const getMonths = year => {
  const months = range(0, 11)
    .map(m => getISODay(new Date(year, m, 1)))
    .map((start, i) => ({ text: allMonths[i], cell: start - 1, index: i }));
  const result = [];
  const cells = range(0, 6);
  while (months.length) {
    const row = cells
      .map(i => {
        const index = months.findIndex(({ cell }) => cell === i);
        return index < 0 ? { text: '', cell: -1, index: -1 } : months.splice(index, 1)[0];
      })
    result.push(row);
  }
  return result;
}