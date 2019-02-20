import React, { useState } from 'react';
import './App.css';
import { getMonths, getDays, getDateRows } from './dateutils';
import { getMonth } from 'date-fns';

const styles = {
  sunday: {
    color: 'red'
  }
}

const flatten = arr => arr.reduce((flat, a) => flat.concat(a), []);

export default () => {
  const [currentYear, setYear] = useState(2019);
  const monthRows = getMonths(currentYear);
  const currentIndex = getMonth(new Date());
  const [currentMonthIndex, setMonth] = useState(currentIndex); // This needs to be an index to handle switching years
  const currentMonth = flatten(monthRows).find(({ index }) => index === currentMonthIndex);
  const dateRows = getDateRows();
  console.log(currentYear, currentMonth, monthRows, dateRows);

  return (
    <table>
      <tbody>
        <tr>
          <td rowSpan='3' colSpan='5' className='buttons'>
            <h1>{currentYear}</h1>
            <button onClick={() => setYear(currentYear - 1)}>Prev</button>
            <button onClick={() => setYear(currentYear + 1)}>Next</button>
          </td>
          {
            monthRows[0].map((month, i) =>
              <td key={i}
                className={[month.text !== '' ? 'hover' : '', month.index === currentMonth.index ? 'selected' : ''].join(' ')}
                onClick={() => setMonth(month.index)}>
                {month.text}
              </td>
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
                    <td key={i}
                      className={[month.text !== '' ? 'hover' : '', month.index === currentMonth.index ? 'selected' : ''].join(' ')}
                      onClick={() => setMonth(month.index)}>
                      {month.text}
                    </td>
                  )
                }
              </tr>
            ))
        }
        {
          dateRows.map((dateRow, i) =>
            <tr className='date' key={i}>
              {
                dateRow.map((text, i) =>
                  <td key={i} className={[text !== '' ? 'hover' : '', text > currentMonth.daysInMonth ? 'disabled' : ''].join(' ')}>{text}</td>
                )
              }
              {
                getDays(i).map((day, i) =>
                  <td key={i} style={day === 'Sun' ? styles.sunday : null}>{day}</td>
                )
              }
            </tr>
          )
        }
      </tbody>
    </table>
  );
};
