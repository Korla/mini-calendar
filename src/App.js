import React, { useState } from 'react';
import './App.css';
import { getMonths, getDays, getDateRows } from './dateutils';
import { getMonth } from 'date-fns';

const selectedMonth = {
  color: 'red'
}

export default () => {
  const [currentYear, setYear] = useState(2019);
  const [currentMonth, setMonth] = useState(getMonth(new Date()));
  const monthRows = getMonths(currentYear);

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
              <td key={i} style={month.index === currentMonth ? selectedMonth : null} onClick={() => setMonth(month)}>{month.text}</td>
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
                    <td key={i} style={month.index === currentMonth ? selectedMonth : null} onClick={() => setMonth(month)}>{month.text}</td>
                  )
                }
              </tr>
            ))
        }
        {
          getDateRows().map((row, i) =>
            <tr className="data" key={i}>
              {
                row.map((cell, i) =>
                  <td key={i}>{cell}</td>
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
