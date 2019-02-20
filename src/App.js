import React, { useState } from 'react';
import './App.css';
import { getMonths, getDays, getDateRows } from './dateutils';
import { getMonth } from 'date-fns';

const styles = {
  selectedMonth: {
    color: 'red'
  },
  outsideMonth: {
    color: 'red'
  }
}

const flatten = arr => arr.reduce((flat, a) => flat.concat(a), []);

export default () => {
  const [currentYear, setYear] = useState(2019);
  const monthRows = getMonths(currentYear);
  const currentIndex = getMonth(new Date());
  const curr = flatten(monthRows).find(({ index }) => index === currentIndex);
  const [currentMonth, setMonth] = useState(curr);
  const dateRows = getDateRows();
  console.log(currentYear, currentMonth, monthRows, dateRows);

  return (
    <table>
      <tbody>
        <tr>
          <td rowSpan="3" colSpan="5" className="buttons">
            <div>{currentYear}</div>
            <button onClick={() => setYear(currentYear - 1)}>Prev</button>
            <button onClick={() => setYear(currentYear + 1)}>Next</button>
          </td>
          {
            monthRows[0].map((month, i) =>
              <td key={i} style={month.index === currentMonth.index ? styles.selectedMonth : null} onClick={() => setMonth(month)}>{month.text}</td>
            )
          }
        </tr>
        {
          monthRows
            .filter((_, i) => i !== 0)
            .map((monthRow, i) => (
              <tr key={i}>
                {
                  monthRow.map((month, i) =>
                    <td key={i} style={month.index === currentMonth.index ? styles.selectedMonth : null} onClick={() => setMonth(month)}>{month.text}</td>
                  )
                }
              </tr>
            ))
        }
        {
          dateRows.map((dateRow, i) =>
            <tr className="data" key={i}>
              {
                dateRow.map((date, i) =>
                  <td key={i} style={date > currentMonth.daysInMonth ? styles.outsideMonth : null}>{date}</td>
                )
              }
              {
                getDays(i).map((day, i) =>
                  <td key={i}>{day}</td>
                )
              }
            </tr>
          )
        }
      </tbody>
    </table>
  );
};
