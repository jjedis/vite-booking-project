import { useEffect, useState, useRef } from "react";
import "../styles/booking.css";
import {motion, AnimatePresence} from "motion/react";

const Ajanvaraus = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(
    sessionStorage.getItem("selectedDate")
  );
  const [selectedService, setSelectedService] = useState<string | null>(
      sessionStorage.getItem("selectedService")
  );
  const [selectedTime, setSelectedTime] = useState<string | null> (
    sessionStorage.getItem("selectedTime")
  );
  const [weekOffset ,setWeekOffset] = useState<number>(0);

  const [dates, setDates] = useState<Date[]>([]);
  const swipeDirection = useRef(0);

  const [open, setOpen] = useState(false);
  const [selectedServiceLabel, setSelectedServiceLabel] = useState("Valitse palvelu");
  


   
    // Set up today's date and find the Monday of the current week
  const today = new Date();
  const dayOfWeek = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
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
    "18:00"
  ];


  const formatDate = (date: Date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    return `${dd}.${mm}`;
  };

  const formatFullDate = (date: Date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  useEffect(() =>{
    const monday = new Date(baseMonday);
    monday.setDate(baseMonday.getDate() + weekOffset);

    const newDates = Array.from({length: 7}).map((_, i) =>{
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

  const handleDateClick = (date:Date) => {
    setSelectedDate(formatFullDate(date));
  };

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };
  const handleNextWeek = () => {
    if (weekOffset < 28) {
      swipeDirection.current = 1;
      setWeekOffset((prev) => prev + 7);
    }
  };

  const handlePrevWeek = () => {
    if (weekOffset > 0) {
      swipeDirection.current = -1;
      setWeekOffset((prev) => prev -7);
    }
  };

  const variants = {
    enter: (direction:number) =>({
      x: direction > 0 ? 150 : -150,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -150 : 150,
      opacity: 0,
    }),
  };


  return (

    <div className="page-container">
      <div className="booking-container">
      <div className="service-desktop">
        {["30-min", "45-min", "60-min", "purentalhas"].map((id, index) => (
          <div key={id} className="grid-wrap-service">
            <div
              className={`service-type ${
              selectedService === id ? "service-type-clicked" : ""
              }`}
              id={id}
              onClick={() => handleServiceClick(id)}
            >
              {["Hieronta 30min", "Hieronta 45min", "Hieronta 60min","Purentalihas-hieronta 60min"][index]}
            </div>
          </div>
        ))}
      </div> 
      <div className="service-mobile">
        <div className={`custom-select ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
          <span className="selected-option">
            {selectedServiceLabel}
          </span>

          <span className="arrow"></span>

          {open && (
            <div className="options">
              {[
                { id: "30-min", label: "Hieronta 30min" },
                { id: "45-min", label: "Hieronta 45min" },
                { id: "60-min", label: "Hieronta 60min" },
                { id: "purentalhas", label: "Purentalihas-hieronta 60min" }
              ].map((item) => (
                <div 
                  className="option"
                  key={item.id}
                  onClick={() => {
                    handleServiceClick(item.id);
                    setSelectedServiceLabel(item.label);
                    setOpen(false);
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

        <div className="calendar-header">
          <div className="icon" id="icon-left" onClick={handlePrevWeek}>
            <svg xmlns="http://www.w3.org/2000/svg" 
              fill="currentColor" 
              className="arrow-icon" 
              viewBox="0 0 16 16"
            >
              <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753"/>
            </svg>
          </div>
          <h1>{today.toLocaleString("fi-FI", {month: "long"})}</h1>
          <div className="icon" id="icon-right" onClick={handleNextWeek}>
            <svg xmlns="http://www.w3.org/2000/svg" 
              fill="currentColor" 
              className="arrow-icon" 
              viewBox="0 0 16 16"
            >
              <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753"/>
            </svg>
          </div>
        </div>
              
        <div className="calendar-body calendar-desktop">
          {dates.map((date, i) => {
            const isToday = date.toDateString() === today.toDateString();
            const isPast = date < today && !isToday;
            const fullDate = formatFullDate(date);
              
            return(
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
                      "Sunnuntai"
                    ][i]}
                  </div>
                  <div className="date-con">
                    <div 
                      className={`
                        date
                        ${selectedDate === fullDate ? "date-clicked" : ""}
                        ${isPast ? "date-inactive" : ""}
                      `}
                      onClick={() => handleDateClick(date)}
                    >
                      {formatDate(date)}
                    </div>
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
                        onClick={() => {
                          handleDateClick(date);
                          handleTimeClick(time);
                        }}
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
        <div className="calendar-body calendar-mobile">
          <AnimatePresence mode="wait" custom={swipeDirection.current}>
            <motion.div
              key={weekOffset}
              custom={swipeDirection.current}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25}}
              drag="x"
              dragConstraints={{left:0, right: 0}}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) handleNextWeek();
                else if (info.offset.x > 80) handlePrevWeek();
              }}
              className="mobile-slide"
            >

              {dates.map((date, i) => {
                const isToday = date.toDateString() === today.toDateString();
                const fullDate = formatFullDate(date);
                const isPast = date < today && !isToday;

                return (
                  <div
                    className={`mobile-date ${selectedDate === fullDate ? "selected" : ""}`}
                    key={i}
                    onClick={() => !isPast && handleDateClick(date)}
                  >
                    <div className="weekday">
                      {["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"][i]}
                    </div>
                    
                    <div 
                      className={`
                        date 
                        ${isPast ? "date-inactive" : ""}
                        ${selectedDate === fullDate ? "date-clicked" : ""}`
                      }
                        
                    >
                      {formatDate(date)}
                    </div>
                  </div>
                );
              })};
            </motion.div>
          </AnimatePresence>

              {selectedDate && (
                <div className="mobile-times">
                  {availableTimes.map((time) =>(
                    <div className="grid-wrap">
                      <div
                        key={time}
                        className={`time ${selectedTime === time ? "time-clicked" : ""}`}
                        onClick={() => handleTimeClick(time)}
                      >
                        {time}
                      </div>
                    </div>
                  ))}
                </div>
              )}
           
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

