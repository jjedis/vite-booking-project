import { useState } from "react";
import "./miniCalendar.css"

type Props = {
	onDateClick?: (date: Date) => void
}


export function MiniCalendar({onDateClick}: Props){
  const today = new Date();
	const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

	const year = viewDate.getFullYear();
	const month = viewDate.getMonth();

	const firstDay = new Date(year, month, 1).getDay();
	const startOffset = firstDay === 0 ? 6 : firstDay -1 ;
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	const cells: (number | null) [] = [
		...Array(startOffset).fill(null),
		...Array.from({ length: daysInMonth}, (_, i) => i+1)
	]
	const monthLabel = viewDate.toLocaleString("fi-FI", {month: "long"})

  return (
    <div className="mini-calendar">
      <div className="mini-cal-header">
        <div className="mini-cal-month">{monthLabel}</div>
        <div className="mini-cal-nav">
          <button onClick={() => setViewDate(new Date(year, month - 1, 1))}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
              />
            </svg>
          </button>
          <button onClick={() => setViewDate(new Date(year, month + 1, 1))}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mini-cal-grid">
        {["M", "T", "K", "T", "P", "L", "S"].map((d, i) => (
          <div key={i} className="mini-cal-weekday">
            {d}
          </div>
        ))}
        {cells.map((day, i) =>
          day === null ? (
            <div key={i} />
          ) : (
            <div
              key={i}
              className="mini-cal-day"
              onClick={() => onDateClick?.(new Date(year, month, day))}
            >
              {day}
            </div>
          ),
        )}
      </div>
    </div>
  );
}