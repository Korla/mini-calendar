import React, { useState } from 'react';
import './App.css';
import { getISODay } from 'date-fns';

const flex = {
  display: 'flex'
}

const row = {
  ...flex,
  flexDirection: 'row'
}

const column = {
  ...flex,
  flexDirection: 'column'
}

const range = (start, end) => Array(end - start + 1).fill().map((_, i) => start + i);

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const getDays = start => [...days.slice(start, 7), ...days.slice(0, start)];

const dateRows = range(1, 7)
  .map(
    i => range(0, 4)
      .map(i2 => i + i2 * 7)
      .map(date => date <= 31 ? date : '')
  );

const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const getMonths = year => {
  const months = range(0, 11)
    .map(m => getISODay(new Date(year, m, 1)))
    .map((start, i) => ({ month: allMonths[i], cell: start - 1 }));
  const result = [];
  const cells = range(0, 6);
  while (months.length) {
    const row = cells
      .map(i => {
        const index = months.findIndex(({ cell }) => cell === i);
        return index < 0 ? '' : months.splice(index, 1)[0].month;
      })
    result.push(row);
  }
  return result;
}

export default () => {
  const [year, setYear] = useState(2019);
  const monthRows = getMonths(year);
  return (
    <table>
      <tbody>
        <tr>
          <td rowSpan="3" colSpan="5" className="buttons">
            <div>{year}</div>
            <button onClick={() => setYear(year - 1)}>Prev</button>
            <button onClick={() => setYear(year + 1)}>Next</button>
          </td>
          {
            monthRows[0].map(month => (
              <td>{month}</td>
            ))
          }
        </tr>
        {
          monthRows
            .filter((monthRow, i) => i !== 0)
            .map(monthRow => (
              <tr>
                {
                  monthRow.map(month => (
                    <td>{month}</td>
                  ))
                }
              </tr>
            ))
        }
        {
          dateRows.map((row, i) => (
            <tr className="data">
              {
                row.map(cell => (
                  <td>{cell}</td>
                ))
              }
              {
                getDays(i).map(day =>
                  <td>{day}</td>
                )
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};
