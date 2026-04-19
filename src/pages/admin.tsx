import "../styles/admin.css"

function Admin() {

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
        <div className="admin-calendar">
          <div className="admin-calendar-date-wrapper">
            <div className="a-corner"></div>
            <div className="a-calendar-dates">
              <div className="a-date">
                <div className="date-text">MA</div>
                <div className="date-number">11</div>
              </div>
              <div className="a-date">
                <div className="date-text">TI</div>
                <div className="date-number">11</div>
              </div>
              <div className="a-date">
                <div className="date-text">KE</div>
                <div className="date-number">11</div>
              </div>
              <div className="a-date">
                <div className="date-text">TO</div>
                <div className="date-number">11</div>
              </div>
              <div className="a-date">
                <div className="date-text">PE</div>
                <div className="date-number">11</div>
              </div>
              <div className="a-date">
                <div className="date-text">LA</div>
                <div className="date-number">11</div>
              </div>
              <div className="a-date">
                <div className="date-text">SU</div>
                <div className="date-number">11</div>
              </div>
            </div>
          </div>
          <div className="calendar-content">
            <div className="time-stamps">
              <div className="hour-marker"></div>
              {calendarTimes.map((time) => {
                return (
                  <div key={time} className="hour-marker">
                    <div className="hour-marker-time">
                      {time}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="calendar-days">
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Admin;