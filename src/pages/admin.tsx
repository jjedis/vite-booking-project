import "../styles/admin.css";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";

type Booking = {
  id: string;
  start_time: string;
  end_time: string;
  status: string;
  notes: string;

  service: {
    name: string;
    duration: number;
  };

  customer: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
  };
};

function Admin() {
  const { token, user } = useAuth();

  const [dates, setDates] = useState<Date[]>([]);
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showCancel, setShowCancel] = useState(false);
  const [overlayStyle, setOverlayStyle] = useState<React.CSSProperties>({});
  const calendarRef = useRef<HTMLDivElement>(null);

  const [dragStart, setDragStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragEnd, setDragEnd] = useState<number | null>(null);
  const [dragDay, setDragDay] = useState<Date | null>(null);
  const [selectedBlockedSlots, setSelectedBlockedSlots] = useState<{
    day: Date;
    startDate: Date;
    endDate: Date;
    start: number;
    end: number;
  } | null>(null);

  const SLOT_HEIGHT = 12;
  const START_HOUR = 10;
  const TOP_OFFSET = SLOT_HEIGHT * 4;



  // Set up today's date and find the Monday of the current week
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const baseMonday = new Date(today);
  baseMonday.setDate(today.getDate() + diffToMonday);

  const getMinutesFromStart = (dateString: string) => {
    const date = new Date(dateString);

    const parts = new Intl.DateTimeFormat("fi-FI", {
      timeZone: "Europe/Helsinki",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(date);

    const hours = Number(parts.find((p) => p.type === "hour")?.value);
    const minutes = Number(parts.find((p) => p.type === "minute")?.value);

    return (hours - START_HOUR) * 60 + minutes;
  };

  const minutesToPixels = (minutes: number) => {
    return (minutes / 15) * SLOT_HEIGHT;
  };

  const isSameDay = (date1: Date, date2: Date) =>
    date1.toDateString() === date2.toDateString();

  //populating dates array
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

  //fetching bookings to populate calendar
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
      `http://localhost:4000/api/adminBookings?start=${start.toISOString()}&end=${end.toISOString()}`,
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

  // canceling booking
  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    try {
      await fetch("http://localhost:4000/api/cancel-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingId: selectedBooking.id }),
      });

      setBookings((prev) =>
        prev.filter((b) => b.start_time !== selectedBooking.start_time),
      );

      setShowCancel(false);
      setSelectedBooking(null);
    } catch (err) {
      console.error("cancel failed", err);
    }
  };
  // Blocking bookings
  const handleBlockedTime = async () => {
    if (!selectedBlockedSlots) return;
    //if (user?.role !== "admin") return;

    try {
      await fetch("http://localhost:4000/api/block-time", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          start_time: selectedBlockedSlots.startDate.toISOString(),
          end_time: selectedBlockedSlots.endDate.toISOString(),
          customer_id: user?.customerId,
        }),
      });
    } catch (err) {
      console.error("Failed to block time", err);
    }
    setDragDay(null);
    setDragStart(null);
    setDragEnd(null);
    setSelectedBlockedSlots(null);
  }

  const handleNextWeek = () => {
    if (weekOffset < 28) {
      setWeekOffset((prev) => prev + 7);
    }
  };

  const handlePrevWeek = () => {
    if (weekOffset > 0) {
      setWeekOffset((prev) => prev - 7);
    }
  };
  // date formatter for dd.mm.hh.mm
  const formatDateTime = (iso: string) => {
    return new Intl.DateTimeFormat("fi-FI", {
      timeZone: "Europe/Helsinki",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  };

  const formatDateOverlay = (iso: string) => {
    return new Date(iso).toLocaleString("fi-FI", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    });
  };
  //Helper to convert minutes since midnight to time
  const minutesToTime = (minutes: number) => {
    const totalMinutes = (START_HOUR ) * 60 + minutes;

    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };

  //Helper to convert minutes to datetime
  const buildDateTime = (day: Date, minutesFromStart: number) => {
    const date = new Date(day);

    const totalMinutes = START_HOUR * 60 + minutesFromStart;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  };

  // uppercasing first letter of a word
  const uppercasing = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  const calendarTimes = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  return (
    <div className="admin-page">
      <div className="admin-navbar">
        <div className="week-changers">
          <button className="week-previous" onClick={handlePrevWeek}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
              />
            </svg>
          </button>
          <button className="week-next" onClick={handleNextWeek}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="page-content">
        <div className="admin-calendar" ref={calendarRef}>
          <div className="admin-calendar-date-wrapper">
            <div className="a-corner"></div>
            <div className="a-calendar-dates">
              {dates.map((date) => {
                const isToday = date.toDateString() === today.toDateString();

                return (
                  <div className="a-date">
                    <div className="date-text">
                      {date
                        .toLocaleString("fi-FI", { weekday: "short" })
                        .toUpperCase()}
                    </div>
                    <div className="date-number">
                      {date.toLocaleString("fi-FI", { day: "numeric" })}
                      <div
                        className={`
                        ${isToday ? "date-today-active" : "date-today"}
                      `}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="calendar-content">
            {selectedBooking && (
              <div className="booking-overlay" style={overlayStyle}>
                <div className="overlay-exit">
                  <button onClick={() => setSelectedBooking(null)}>
                    <svg
                      className="exit-button"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                  </button>
                </div>
                <div className="overlay-header-section">
                  {selectedBooking.service.name}
                  <div className="separator"></div>
                </div>
                <div className="overlay-content">
                  <div className="overlay-section">
                    <div className="overlay-icon">
                      <svg
                        className="time-icon"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 -960 960 960"
                      >
                        <path d="m608.41-290.57 61.5-61.02-146.32-146.32V-678.8h-87.18v216.13l172 172.1ZM480-71.87q-84.91 0-159.34-32.12-74.44-32.12-129.5-87.17-55.05-55.06-87.17-129.5Q71.87-395.09 71.87-480t32.12-159.34q32.12-74.44 87.17-129.5 55.06-55.05 129.5-87.17 74.43-32.12 159.34-32.12t159.34 32.12q74.44 32.12 129.5 87.17 55.05 55.06 87.17 129.5 32.12 74.43 32.12 159.34t-32.12 159.34q-32.12 74.44-87.17 129.5-55.06 55.05-129.5 87.17Q564.91-71.87 480-71.87ZM480-480Zm0 317.13q131.8 0 224.47-92.54 92.66-92.55 92.66-224.59 0-132.04-92.66-224.59-92.66-92.54-224.47-92.54-131.8 0-224.47 92.54-92.66 92.55-92.66 224.59 0 132.04 92.66 224.59 92.66 92.54 224.47 92.54Z" />
                      </svg>
                    </div>
                    <div className="section-text">
                      <p>
                        {formatDateOverlay(selectedBooking.start_time)}{" "}
                        {formatDateTime(selectedBooking.start_time)}
                        {" - "}
                        {formatDateTime(selectedBooking.end_time)}
                      </p>
                    </div>
                  </div>
                  <div className="overlay-section">
                    <div className="overlay-icon">
                      <svg
                        className="person-icon"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 -960 960 960"
                      >
                        <path d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640Zm0 400Z" />{" "}
                      </svg>
                    </div>
                    <div className="section-text">
                      <p>
                        {uppercasing(selectedBooking.customer.first_name)}{" "}
                        {uppercasing(selectedBooking.customer.last_name)}
                      </p>
                    </div>
                  </div>
                  <div className="overlay-section">
                    <div className="overlay-icon">
                      <svg
                        width="16"
                        height="16"
                        className="phone-icon"
                        fill="currentColor"
                        viewBox="0 -960 960 960"
                      >
                        <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                      </svg>
                    </div>
                    <div className="section-text">
                      <p>{selectedBooking.customer.phone}</p>
                    </div>
                  </div>
                  <div className="overlay-section">
                    <div className="overlay-icon">
                      <svg
                        width="16"
                        height="16"
                        className="email-icon"
                        fill="currentColor"
                        viewBox="0 -960 960 960"
                      >
                        <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />{" "}
                      </svg>
                    </div>
                    <div className="section-text">
                      <p>{selectedBooking.customer.email}</p>
                    </div>
                  </div>
                  <div className="notes-section">
                    <div className="notes-heading">Viesti</div>
                    <div className="note-box">
                      <p>{selectedBooking.notes}</p>
                    </div>
                  </div>
                  <div className="cancel-section">
                    <button
                      className="admin-cancel-button"
                      onClick={() => setShowCancel(true)}
                    >
                      {" "}
                      Peruuta varaus
                    </button>
                  </div>
                </div>
              </div>
            )}
            {selectedBlockedSlots && (
              <div className="booking-overlay" style={overlayStyle}>
                <div className="overlay-exit">
                  <button
                    onClick={() => {
                      setSelectedBlockedSlots(null);
                    }}
                  >
                    <svg
                      className="exit-button"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                  </button>
                </div>
                <div className="overlay-header">
                  <input type="text" placeholder="Lisää otsikko"></input>
                  <div className="separator"></div>
                </div>
                <div className="overlay-content">
                  <div className="overlay-section">
                    <div className="overlay-icon">
                      <svg
                        className="time-icon"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 -960 960 960"
                      >
                        <path d="m608.41-290.57 61.5-61.02-146.32-146.32V-678.8h-87.18v216.13l172 172.1ZM480-71.87q-84.91 0-159.34-32.12-74.44-32.12-129.5-87.17-55.05-55.06-87.17-129.5Q71.87-395.09 71.87-480t32.12-159.34q32.12-74.44 87.17-129.5 55.06-55.05 129.5-87.17 74.43-32.12 159.34-32.12t159.34 32.12q74.44 32.12 129.5 87.17 55.05 55.06 87.17 129.5 32.12 74.43 32.12 159.34t-32.12 159.34q-32.12 74.44-87.17 129.5-55.06 55.05-129.5 87.17Q564.91-71.87 480-71.87ZM480-480Zm0 317.13q131.8 0 224.47-92.54 92.66-92.55 92.66-224.59 0-132.04-92.66-224.59-92.66-92.54-224.47-92.54-131.8 0-224.47 92.54-92.66 92.55-92.66 224.59 0 132.04 92.66 224.59 92.66 92.54 224.47 92.54Z" />
                      </svg>
                    </div>
                    <div className="section-text">
                      {selectedBlockedSlots && (
                        <p>
                          {formatDateOverlay(
                            selectedBlockedSlots.startDate.toISOString(),
                          )}{" "}
                          {formatDateTime(
                            selectedBlockedSlots.startDate.toISOString(),
                          )}
                          {" - "}
                          {formatDateTime(
                            selectedBlockedSlots.endDate.toISOString(),
                          )}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="cancel-section">
                    <button
                      className="admin-block-button"
                      onClick={() => handleBlockedTime()}
                    >
                      Sulje lista
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="time-stamps">
              <div className="hour-marker"></div>
              {calendarTimes.map((time) => {
                return (
                  <div key={time} className="hour-marker">
                    <div className="hour-marker-time">{time}</div>
                  </div>
                );
              })}
            </div>
            <div className="calendar-days">
              {dates.map((date) => (
                <div
                  key={date.toISOString()}
                  className="calendar-day"
                  onMouseDown={(e) => {
                    if (e.button !== 0) return;
                    setIsDragging(true);
                    if ((e.target as HTMLElement).closest(".booking-block")) {
                      return;
                    }

                    const rect = e.currentTarget.getBoundingClientRect();
                    const y = e.clientY - rect.top - TOP_OFFSET;

                    const minutes = Math.floor(y / SLOT_HEIGHT) * 15;

                    setDragStart(minutes);
                    setDragEnd(minutes);
                    setDragDay(date);
                  }}
                  onMouseMove={(e) => {
                    if (dragStart === null) return;
                    if (!isDragging) return;

                    const rect = e.currentTarget.getBoundingClientRect();
                    const y = e.clientY - rect.top - TOP_OFFSET;

                    const minutes = Math.floor(y / SLOT_HEIGHT) * 15;

                    setDragEnd(minutes);
                  }}
                  onMouseUp={(e) => {
                    if (dragStart === null || dragEnd === null || !dragDay)
                      return;

                    const start = Math.min(dragStart, dragEnd);
                    const end = Math.max(dragStart, dragEnd);

                    const startDate = buildDateTime(dragDay, start);
                    const endDate = buildDateTime(dragDay, end);

                    const newSlot = {
                      day: dragDay,
                      startDate: startDate,
                      endDate: endDate,
                      start: start,
                      end: end,
                    };

                    e.stopPropagation();

                    if (!calendarRef.current) return;

                    const calendarRect =
                      calendarRef.current.getBoundingClientRect();
                    const rect = (
                      e.currentTarget as HTMLElement
                    ).getBoundingClientRect();

                    const overlayWidth = 340;
                    const overlayHeight = 422;

                    // default: LEFT side of the day column
                    let left = rect.left - calendarRect.left - overlayWidth - 5;
                    let top = rect.top - calendarRect.top;

                    // if not enough space on left → move to RIGHT
                    if (left < 0) {
                      left = rect.right - calendarRect.left + 5;
                    }

                    // clamp inside right edge
                    if (left + overlayWidth > calendarRect.width) {
                      left = calendarRect.width - overlayWidth - 10;
                    }

                    // clamp vertical overflow
                    if (top + overlayHeight > calendarRect.height) {
                      top = calendarRect.height - overlayHeight - 10;
                    }

                    if (top < 0) top = 10;

                    setOverlayStyle({
                      position: "absolute",
                      left: `${left}px`,
                      top: `${top}px`,
                      zIndex: 1000,
                    });

                    setSelectedBlockedSlots(newSlot);
                    setSelectedBooking(null);
                    setDragStart(null);
                    setDragEnd(null);
                    setDragDay(null);
                    setIsDragging(false);
                    console.log(selectedBlockedSlots);
                  }}
                >
                  {selectedBlockedSlots &&
                    isSameDay(selectedBlockedSlots.day, date) && (
                      <div
                        className="drag-preview"
                        style={{
                          top:
                            minutesToPixels(selectedBlockedSlots.start) +
                            TOP_OFFSET,
                          height: minutesToPixels(
                            selectedBlockedSlots.end -
                              selectedBlockedSlots.start,
                          ),
                        }}
                      >
                        <div className="preview-text">
                          {minutesToTime(selectedBlockedSlots.start)} -{" "}
                          {minutesToTime(selectedBlockedSlots.end)}
                        </div>
                      </div>
                    )}
                  {dragStart !== null &&
                    dragEnd !== null &&
                    dragDay === date && (
                      <div
                        className="drag-preview"
                        style={{
                          top:
                            minutesToPixels(Math.min(dragStart, dragEnd)) +
                            TOP_OFFSET,
                          height: minutesToPixels(
                            Math.abs(dragEnd - dragStart),
                          ),
                        }}
                      >
                        <div className="preview-text">
                          {minutesToTime(Math.min(dragStart, dragEnd))} -{" "}
                          {minutesToTime(Math.max(dragStart, dragEnd))}
                        </div>
                      </div>
                    )}
                  {bookings
                    .filter((booking) =>
                      isSameDay(new Date(booking.start_time), date),
                    )
                    .map((booking) => {
                      const startMinutes = getMinutesFromStart(
                        booking.start_time,
                      );
                      const endMinutes = getMinutesFromStart(booking.end_time);
                      console.log(booking);
                      const top =
                        minutesToPixels(startMinutes) + SLOT_HEIGHT * 4;
                      const height = minutesToPixels(endMinutes - startMinutes);
                      console.log(booking.status);
                      return (
                        <div
                          key={booking.id}
                          className={`booking-block ${
                            booking.status === "blocked" ? "blocked" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            const calendarRect =
                              calendarRef.current!.getBoundingClientRect();

                            const rect = (
                              e.currentTarget as HTMLElement
                            ).getBoundingClientRect();

                            const overlayWidth = 340;
                            const overlayHeight = 422;

                            let left =
                              rect.left - calendarRect.left - overlayWidth - 5;
                            let top = rect.top - calendarRect.top;

                            if (left < 0) {
                              left = rect.right - calendarRect.left + 5;
                            }
                            if (left + overlayWidth > calendarRect.width) {
                              left = calendarRect.width - overlayWidth - 10;
                            }

                            if (top + overlayHeight > calendarRect.height) {
                              top = calendarRect.height - overlayHeight - 10;
                            }

                            if (top < 0) top = 10;
                            setSelectedBooking(booking);
                            setSelectedBlockedSlots(null);
                            setOverlayStyle({
                              position: "absolute",
                              left: `${left}px`,
                              top: `${top}px`,
                              zIndex: 1000,
                            });
                          }}
                          style={{
                            top: `${top}px`,
                            height: `${height}px`,
                          }}
                        >
                          <div className="block-info">
                            <div className="service-name">
                              {booking.service.name}
                            </div>
                            <div className="service-time">
                              {formatDateTime(booking.start_time)} -{" "}
                              {formatDateTime(booking.end_time)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showCancel && (
        <div
          className="admin-cancel-overlay"
          onClick={() => setShowCancel(false)}
        >
          <div
            className="cancel-overlay-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cancel-message">
              <p>
                Haluatko varmasti peruuttaa varauksen <br />
                <strong>{selectedBooking?.service.name}</strong> <br />
                {selectedBooking && formatDateTime(selectedBooking.start_time)}
                {" - "}
                {selectedBooking && formatDateTime(selectedBooking.end_time)}
              </p>
            </div>
            <div className="admin-cancel-buttons">
              <button className="button-1" onClick={() => setShowCancel(false)}>
                Poistu
              </button>
              <button className="button-2" onClick={handleCancelBooking}>
                Peruuta Varaus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
