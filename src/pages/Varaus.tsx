import { useEffect, useState, useRef } from "react";
import "../styles/booking.css";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";

type Service = {
  id: string;
  name: string;
  duration: number;
};

type Booking = {
  id: string;
  start_time: string;
  end_time: string;
};

const services: Service[] = [
  { id: "30-min", name: "Hieronta 30min", duration: 30 },
  { id: "45-min", name: "Hieronta 45min", duration: 45 },
  { id: "60-min", name: "Hieronta 60min", duration: 60 },
  { id: "purentalihas", name: "Purentalihas-hieronta 60min", duration: 60 },
];

const Ajanvaraus = () => {

  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    const stored = sessionStorage.getItem("selectedDate");
    return stored ? new Date(stored) : null;
  });

  const [selectedService, setSelectedService] = useState<Service | null>(() => {
    const stored = sessionStorage.getItem("selectedService");
    return stored ? JSON.parse(stored) : null;
  });

  const [selectedTime, setSelectedTime] = useState<string | null>(
    sessionStorage.getItem("selectedTime"),
  );

  const [weekOffset, setWeekOffset] = useState<number>(0);

  const [dates, setDates] = useState<Date[]>([]);
  const swipeDirection = useRef(0);

  const [open, setOpen] = useState(false);
    useState("Valitse palvelu");

  const [now, setNow] = useState(new Date());

  const [bookings, setBookings] = useState<Booking[]>([]);

  const navigate = useNavigate();

  const SLOT_MINUTES = 30;

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
    "18:00",
  ];

  const weekdays = ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"];

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

  const isTimeBooked = (bookings: Booking[], date: Date, time: string) => {
    if (!Array.isArray(bookings)) return false;
    const [h, m] = time.split(":").map(Number);

    const slotStart = new Date(date);
    slotStart.setHours(h, m, 0, 0);

    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + SLOT_MINUTES);

    return bookings.some((b) => {
      const bookingStart = new Date(b.start_time);
      const bookingEnd = new Date(b.end_time);

      return slotStart < bookingEnd && slotEnd > bookingStart;
    });
  };

  useEffect(() => {
    if (dates.length === 0) return;

    const start = new Date(
      dates[0].getFullYear(),
      dates[0].getMonth(),
      dates[0].getDate(),
      0,
      0,
      0,
    );

    const end = new Date(
      dates[6].getFullYear(),
      dates[6].getMonth(),
      dates[6].getDate(),
      23,
      59,
      59,
    );

    fetch(
      `http://localhost:4000/api/bookings?start=${start.toISOString()}&end=${end.toISOString()}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBookings(data);
        } else if (Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        } else {
          setBookings([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setBookings([]);
      });
  }, [dates]);

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
    if (selectedDate)
      sessionStorage.setItem("selectedDate", selectedDate.toISOString());
    if (selectedService)
      sessionStorage.setItem(
        "selectedService",
        JSON.stringify(selectedService),
      );
    if (selectedTime) sessionStorage.setItem("selectedTime", selectedTime);
  }, [selectedDate, selectedService, selectedTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isTimeInPast = (date: Date, time: string) => {
    const [hours, minutes] = time.split(":").map(Number);

    const timeDate = new Date(date);
    timeDate.setHours(hours, minutes, 0, 0);

    return timeDate <= now;
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
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
      setWeekOffset((prev) => prev - 7);
    }
  };

  const handleProceed = () => {
    if (!selectedService || !selectedDate || !selectedTime) return;

    navigate("/varaustiedot", {
      state: {
        selectedService,
        selectedDate,
        selectedTime,
      },
    });
  };

  const variants = {
    enter: (direction: number) => ({
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
    <div className="booking-page">
      <div className="booking-container">
        <div className="service-desktop">
          {services.map((service) => (
            <div key={service.id} className="grid-wrap-service">
              <div
                className={`service-type ${
                  selectedService?.id === service.id
                  ? "service-type-clicked" 
                  : ""
                }`}
                onClick={() => handleServiceClick(service)}
              >
                {service.name}
              </div>
            </div>
          ))}
        </div>

        <div className="service-mobile">
          <div
            className={`custom-select ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <span className="selected-option">{selectedService?.name || "Valitse palvelu"}</span>

            <span className="arrow"></span>

            {open && (
              <div className="options">
                {services.map(service => (
                  <div
                    className="option"
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service);
                      setOpen(false);
                    }}
                  >
                    {service.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="calendar-header">
          <div className="icon" id="icon-left" onClick={handlePrevWeek}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="arrow-icon"
              viewBox="0 0 16 16"
            >
              <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753" />
            </svg>
          </div>
          <h1>{today.toLocaleString("fi-FI", { month: "long" })}</h1>
          <div className="icon" id="icon-right" onClick={handleNextWeek}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="arrow-icon"
              viewBox="0 0 16 16"
            >
              <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753" />
            </svg>
          </div>
        </div>

        <div className="calendar-body calendar-desktop">
          {dates.map((date, i) => {
            const isToday = date.toDateString() === today.toDateString();
            const isPast = date < today && !isToday;
            const fullDate = formatFullDate(date);

            return (
              <span
                key={i}
                className={`date-box ${isPast ? "date-box-inactive" : ""}`}
              >
                <div className="date-header">
                  <div className="weekday-large">
                    {
                      [
                        "Maanantai",
                        "Tiistai",
                        "Keskiviikko",
                        "Torstai",
                        "Perjantai",
                        "Lauantai",
                        "Sunnuntai",
                      ][i]
                    }
                  </div>
                  <div className="date-con">
                    <div
                      className={`
                        date
                        ${selectedDate && formatFullDate(selectedDate) === fullDate ? "date-clicked" : ""}
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
                    availableTimes.map((time) => {
                      const timeIsPast = isToday && isTimeInPast(date, time);
                      const booked = isTimeBooked(bookings, date, time);

                      return (
                        <div
                          key={time}
                          className={`time-available time-wide 
                            ${timeIsPast || booked ? "time-wide-inactive" : ""}
                            ${
                              selectedTime === time && selectedDate && formatFullDate(selectedDate) === fullDate
                                ? "time-clicked"
                                : ""
                            }
                          `}
                          onClick={() => {
                            if (timeIsPast || booked) return;
                            handleDateClick(date);
                            handleTimeClick(time);
                          }}
                        >
                          {time}
                        </div>
                      );
                    })
                  )}
                </div>
              </span>
            );
          })}
        </div>
        <div className="calendar-body calendar-mobile">
          <div className="mobile-arrow left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="arrow-left"
              viewBox="0 0 16 16"
              onClick={handlePrevWeek}
            >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
            </svg>
          </div>
          <div className="mobile-arrow right" onClick={handleNextWeek}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="arrow-right"
              viewBox="0 0 16 16"
              onClick={handleNextWeek}
            >
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
            </svg>
          </div>
          <div className="weekdays">
            {weekdays.map((day) => (
              <div key={day} className="weekday">
                {day}
              </div>
            ))}
          </div>
          <div className="mobile-wrapper">
            <AnimatePresence mode="wait" custom={swipeDirection.current}>
              <motion.div
                key={weekOffset}
                custom={swipeDirection.current}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
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
                      className={`mobile-date ${
                        selectedDate && formatFullDate(selectedDate) === fullDate ? "selected" : ""
                      }`}
                      key={i}
                      onClick={() => !isPast && handleDateClick(date)}
                    >
                      <div
                        className={`
                          date 
                          ${isPast ? "date-inactive" : ""}
                          ${selectedDate && formatFullDate(selectedDate) === fullDate ? "date-clicked" : ""}`}
                      >
                        {formatDate(date)}
                      </div>
                    </div>
                  );
                })}
                ;
              </motion.div>
            </AnimatePresence>
          </div>

          {selectedDate && (
            <div className="mobile-times">
              {availableTimes.map((time) => {

                const isTodaySelected =
                  selectedDate.toDateString() === today.toDateString();

                const timeIsPast =
                  isTodaySelected
                    ? isTimeInPast(selectedDate, time)
                    : false;

                const booked = isTimeBooked(bookings, selectedDate, time);


                return (
                  <div className="grid-wrap" key={time}>
                    <div
                      className={`time 
                        ${timeIsPast || booked ? "time-inactive" : ""}
                        ${selectedTime === time ? "time-clicked" : ""}
                      `}
                      onClick={() => {
                        if (timeIsPast || booked) return;
                        handleTimeClick(time);
                      }}
                    >
                      {time}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="proceed-con">
          <Button
            variant="compact"
            disabled={!selectedService || !selectedDate || !selectedTime}
            onClick={handleProceed}
          >
            Seuraava
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Ajanvaraus;
