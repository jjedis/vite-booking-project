import { useEffect, useState } from "react";
import "../styles/booking.css";

const Ajanvaraus = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(
    sessionStorage.getItem("selectedDate")
  );
  const [selectedService, setSelectedService] = useState<string | null>(
    sessionStorage.getItem("selectedService")
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(
    sessionStorage.getItem("selectedTime")
  );
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [dates, setDates] = useState<Date[]>([]);

  const today = new Date();
  const dayOfWeek = today.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const baseMonday = new Date(today);
  baseMonday.setDate(today.getDate() + diffToMonday);

  const availableTimes = [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ];

  const formatDate = (date: Date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    return `${dd}.${mm}`;
  };

  const formatFullDate = (date: Date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  useEffect(() => {
    const monday = new Date(baseMonday);
    monday.setDate(baseMonday.getDate() + weekOffset);

    const newDates = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });

    setDates(newDates);
  }, [weekOffset]);

  useEffect(() => {
    if (selectedDate) sessionStorage.setItem("selectedDate", selectedDate);
    if (selectedService) sessionStorage.setItem("selectedService", selectedService);
    if (selectedTime) sessionStorage.setItem("selectedTime", selectedTime);
  }, [selectedDate, selectedService, selectedTime]);

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(formatFullDate(date));
  };

  const handleNextWeek = () => {
    if (weekOffset < 28) setWeekOffset((prev) => prev + 7);
  };

  const handlePrevWeek = () => {
    if (weekOffset > 0) setWeekOffset((prev) => prev - 7);
  };

  return (
    <div className="page-container">
      <div className="booking-container">
        <div className="service">
          {["30-min", "45-min", "60-min", "purentalihas"].map((id, index) => (
            <div key={id} className="grid-wrap-service">
              <div
                className={`service-type ${
                  selectedService === id ? "service-type-clicked" : ""
                }`}
                id={id}
                onClick={() => handleServiceClick(id)}
              >
                {["Hieronta 30min", "Hieronta 45min", "Hieronta 60min", "Purentalihas-hieronta 60min"][index]}
              </div>
            </div>
          ))}
        </div>

        <div className="calendar-header">
          <div className="icon" id="icon-left" onClick={handlePrevWeek}>
            <i className="fa-solid fa-chevron-left"></i>
          </div>
          <h1>{today.toLocaleString("fi-FI", { month: "long" })}</h1>
          <div className="icon" id="icon-right" onClick={handleNextWeek}>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        </div>

        <div className="calendar-body">
          {dates.map((date, i) => {
            const isToday =
              date.toDateString() === today.toDateString();
            const isPast = date < today && !isToday;
            const fullDate = formatFullDate(date);

            return (
              <span key={i} className={`date-box ${isPast ? "date-box-inactive" : ""}`}>
                <div className="date-header">
                  <div className="weekday">
                    {["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"][i]}
                  </div>
                  <div className="weekday-large">
                    {[
                      "Maanantai",
                      "Tiistai",
                      "Keskiviikko",
                      "Torstai",
                      "Perjantai",
                      "Lauantai",
                      "Sunnuntai",
                    ][i]}
                  </div>
                  <div
                    className={`date-con ${
                      selectedDate === fullDate ? "date-clicked" : ""
                    }`}
                    onClick={() => handleDateClick(date)}
                  >
                    <div className="date">{formatDate(date)}</div>
                  </div>
                </div>
                <div className="time-container">
                  {isPast ? (
                    <div className="no-times">
                      <p>Ei varattavia aikoja</p>
                    </div>
                  ) : (
                    availableTimes.map((time) => (
                      <div
                        key={time}
                        className={`time-available time-wide ${
                          selectedTime === time && selectedDate === fullDate
                            ? "time-clicked"
                            : ""
                        }`}
                        onClick={() => handleTimeClick(time)}
                      >
                        {time}
                      </div>
                    ))
                  )}
                </div>
              </span>
            );
          })}
        </div>

        <div className="proceed-con">
          <button className="sub" type="submit" value="Jatka">
            Seuraava
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ajanvaraus;
