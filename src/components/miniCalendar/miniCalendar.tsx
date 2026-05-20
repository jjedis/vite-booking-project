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

  return (
    <div className="mini-calendar">
      <div className="mini-cal-header">
        <div className="mini-cal-month">Huhtikuu 2026</div>
        <div className="mini-cal-nav">
          <button></button>
          <button></button>
        </div>
      </div>
      <div className="mini-cal-grid">
        {["M", "T", "K", "T", "P", "L", "S"].map((d, i) => (
            <div key={i} className="mini-cal-weekday">{d}</div>
        ))}
				{cells.map((day, i) =>
					day === null ? (
						<div key={i}/>
					) : (
						<div 
							key={i}
							className="mini-cal-day"
							onClick={() => onDateClick?.(new Date(year, month, day))}
						>
							{day}
						</div>
					)
				
				)}
      </div>
    </div>
  );
}