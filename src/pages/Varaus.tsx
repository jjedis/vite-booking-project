import { useEffect, useState } from "react";
import "../styles/booking.css"

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

   
    // Set up today's date and find the Monday of the current week
  const today = new Date();
  const dayOfWeek = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const baseMonday = new Date(today);
  baseMonday.setDate(today.getDate() + diffToMonday);


    // *** NEW ***
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
    if (weekOffset < 28) setWeekOffset((prev) => prev + 7);
  };

  const handlePrevWeek = () => {
    if (weekOffset > 0) setWeekOffset((prev) => prev -7);
  };


  return (

    <div className="page-container">
      <div className="booking-container">
        <div className="service">
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
                      {formatDate(date)}</div>
                </div>
              );
            })};

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
    // Check if two dates refer to the same calendar day
    /*
      
    <div className="appointment-time">
    <div className="grid-wrap"><div className="time" id="10.00">10.00</div></div>
    <div className="grid-wrap"><div className="time" id="10.30">10.30</div></div>
    <div className="grid-wrap"><div className="time" id="11.00">11.00</div></div>
    <div className="grid-wrap"><div className="time" id="11.30">11.30</div></div>
    <div className="grid-wrap"><div className="time" id="12.00">12.00</div></div>
    <div className="grid-wrap"><div className="time" id="12.30">12.30</div></div>
    <div className="grid-wrap"><div className="time" id="13.00">13.00</div></div>
    <div className="grid-wrap"><div className="time" id="13.30">13.30</div></div>
    <div className="grid-wrap"><div className="time" id="14.00">14.00</div></div>
    <div className="grid-wrap"><div className="time" id="15.00">15.00</div></div>
    <div className="grid-wrap"><div className="time" id="15.30">15.30</div></div>
    <div className="grid-wrap"><div className="time" id="16.00">16.00</div></div>
    <div className="grid-wrap"><div className="time" id="16.30">16.30</div></div>
    <div className="grid-wrap"><div className="time" id="17.00">17.00</div></div>
    <div className="grid-wrap"><div className="time" id="17.30">17.30</div></div>
    <div className="grid-wrap"><div className="time" id="18.00">18.00</div></div>
  </div>
    
    
    const isSameDate = (date1, date2) =>
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();

    const clearClickedBorders = () => {
        document.querySelectorAll(".date, .date-current").forEach(el => {
            el.classList.remove("date-clicked");
        });
    };

    const clearClickedService = () => {
        document.querySelectorAll(".service-type, .service-type-clicked").forEach(el => {
            el.classList.remove("service-type-clicked");
        });
    };

    const animateScroll = (direction) => {
        if (calendarBody && window.innerWidth < 768) {
            calendarBody.classList.add(direction === 'right' ? 'slide-left' : 'slide-right');
            calendarBody.addEventListener('animationend', () => {
                calendarBody.classList.remove('slide-left', 'slide-right');
                populateDates();
            }, { once: true });
        } else {
            populateDates();
        }
    };

    serviceTypes.forEach(service => {
        service.addEventListener("click", () => {
            selectedService = service.id;
            clearClickedService();
            service.classList.add("service-type-clicked");
            console.log(selectedDate);
            console.log(selectedService);
            console.log(selectedTime);
        })
    })

    appointmentTimes.forEach(time => {
        time.addEventListener("click", () => {
            selectedTime = time.id;
            console.log(selectedDate);
            console.log(selectedService);
            console.log(selectedTime);
        })
    })
   
    // Main function to populate dates and update UI
    const populateDates = () => {
        const monday = new Date(baseMonday);
        monday.setDate(baseMonday.getDate() + weekOffset); // Adjust for week offset

        dateBoxes.forEach((box, i) => {
            const currentDate = new Date(monday);
            currentDate.setDate(monday.getDate() + i); // Calculate date for each box

            const fullDate = formatFullDate(currentDate);
            const shortDate = formatDate(currentDate);

            // Set ID and text content for the date
            box.id = fullDate;

            const timeContainer = box.querySelector(".time-container");
            const dateActive = box.querySelector(".date, .date-current, .date-inactive");
            if (dateActive) {
                dateActive.textContent = shortDate;

                // Restore blue border if this date is selected
                if (selectedDate === fullDate) {
                    dateActive.classList.add("date-clicked");
                }
                else {
                    dateActive.classList.remove("date-clicked");
                }

                // Add click listener to highlight selected date
                dateActive.addEventListener("click", () => {
                    clearClickedBorders();
                    dateActive.classList.add("date-clicked");
                    selectedDate = fullDate;
                });
            }

            // Clear any previous highlighting or inactive class
            box.classList.remove("date-box-current", "date-box-inactive");
            dateActive.classList.remove("date-current", "date-inactive");
            timeContainer.classList.remove("time-container-inactive");
            // Clear previous time slots before adding new ones
            timeContainer.innerHTML = "";

            // Create a "no times" element
            const noTimesEl = document.createElement("div");
            noTimesEl.classList.add("no-times");
            noTimesEl.innerHTML = "<p>Ei varattavia aikoja</p>";


            // Highlight today
            if (isSameDate(currentDate, today)) {
                box.classList.add("date-box-current");
                dateActive.classList.add("date-current");
                selectedDate = fullDate;
                
            }
            // Mark past dates as inactive
            else if (currentDate < today && !isSameDate(currentDate, today)) {
                box.classList.add("date-box-inactive");
                dateActive.classList.add("date-inactive");
                timeContainer.classList.add("time-container-inactive");
                timeContainer.appendChild(noTimesEl);
                return; // skip generating times
                

            }


            
            
            // Dynamically generate time slots
            const now = new Date();
            let allInactive = false;
            availableTimes.forEach(timeStr => {
                const timeDiv = document.createElement("div");
                timeDiv.classList.add("time-available", "time-wide"); // Keep your class names
                timeDiv.setAttribute("data-time", timeStr);
                timeDiv.textContent = timeStr;

                
                // Disable time slots in the past for today
                // Build a Date object for this time slot
                const [hours, minutes] = timeStr.split(":").map(Number);
                const slotDate = new Date(currentDate);
                slotDate.setHours(hours, minutes, 0, 0);

                // Compare full date+time
                if (slotDate < now && isSameDate(currentDate, today)) {
                    timeDiv.classList.add("time-inactive");
                    timeDiv.style.pointerEvents = "none"; // disable clicking
                }
                else{
                    allInactive = false;
                }
                
                


                

               
                // Highlight selected time for the selected date
                if (selectedTime === timeStr && selectedDate === fullDate) {
                    timeDiv.classList.add("time-clicked");
                }

                
                // Add click listener for selecting time slot
                timeDiv.addEventListener("click", () => {
                    selectedTime = timeStr;
                    selectedDate = fullDate;

                    // Clear previously selected time slot highlights
                    document.querySelectorAll(".time-clicked").forEach(el => {
                        el.classList.remove("time-clicked");
                    });

                    timeDiv.classList.add("time-clicked");
                    console.log(selectedDate, selectedService, selectedTime);
                });

                timeContainer.appendChild(timeDiv);

            });  
            if (allInactive) {
                timeContainer.innerHTML = "";
                timeContainer.appendChild(noTimesEl);
            }     

        });
    };

    // Initial population of the calendar
    populateDates();

    // Navigate to next week
    iconRight.addEventListener("click", () => {
        if (weekOffset < 28){
            weekOffset += 7;
            animateScroll("right");
            populateDates();
        }
      
    });

    // Navigate to previous week
    iconLeft.addEventListener("click", () => {
        if (weekOffset > 0) { // prevent going back past the start
            weekOffset -= 7;
            animateScroll('left');
            populateDates();
        }
    });
        // Swipe gesture support
        let touchStartX = 0;
        let touchEndX = 0;
    
        calendarBody.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
    
        calendarBody.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleGesture();
        });
    
        const handleGesture = () => {
            if (touchEndX < touchStartX - 50) {
                weekOffset += 7;
                animateScroll('right');
            }
            if (touchEndX > touchStartX + 50) {
                weekOffset -= 7;
                animateScroll('left');
            }
        };
    

);*/

