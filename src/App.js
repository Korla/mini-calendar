import React, { useState } from 'react';
import './App.css';
import { getMonths, getDays, getDateRows } from './dateutils';

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
            monthRows[0].map((month, i) =>
              <td key={i}>{month}</td>
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
                    <td key={i}>{month}</td>
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
