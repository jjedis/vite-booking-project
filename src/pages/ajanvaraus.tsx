import "../styles/booking.css"
function Ajanvaraus() {
    return (
        <>

            <div className="page-container">
                <div className="booking-container">
                    <div className="service">
                        <div className="grid-wrap-service"><div className="service-type" id="30-min">Hieronta 30min</div></div>
                        <div className="grid-wrap-service"><div className="service-type" id="45-min">Hieronta 45min</div></div>
                        <div className="grid-wrap-service"><div className="service-type" id="60-min">Hieronta 60min</div></div>
                        <div className="grid-wrap-service"><div className="service-type" id="purentalihas">Purentalihas-hieronta 60min</div></div>
                    </div> 
                    <div className="calendar-header">
                        <div className="icon" id="icon-left"><i className="fa-solid fa-chevron-left"></i></div>
                        <h1>August</h1>
                        <div className="icon" id="icon-right"><i className="fa-solid fa-chevron-right"></i></div>
                    </div>
                
                    <div className="calendar-body">
                        <span className="date-box">
                            <div className="date-header">
                                <div className="weekday">Ma</div>
                                <div className="weekday-large">Maanantai</div>
                                <div className="date-con"><div className="date"></div></div> 
                            </div>
                            <div className="time-container">
                            
                            </div>
                        </span>
                        <span className="date-box">
                            <div className="date-header">
                                <div className="weekday">Ti</div>
                                <div className="weekday-large">Tiistai</div>
                                <div className="date-con"><div className="date"></div></div> 
                            </div>
                            <div className="time-container">
                            </div>
                    
                        </span>
                        <span className="date-box">
                            <div className="date-header">
                                <div className="weekday">Ke</div>
                                <div className="weekday-large">Keskiviikko</div>
                                <div className="date-con"><div className="date"></div></div> 
                            </div>
                            <div className="time-container">
                            </div>
                        </span>
                        <span className="date-box">
                            <div className="date-header">
                                <div className="weekday">To</div>
                                <div className="weekday-large">Torstai</div>
                                <div className="date-con"><div className="date"></div></div> 
                            </div>
                            <div className="time-container">
                            </div>
                        </span>
                        <span className="date-box">
                            <div className="date-header">
                                <div className="weekday">Pe</div>
                                <div className="weekday-large">Perjantai</div>
                                <div className="date-con"><div className="date"></div></div> 
                            </div>
                            <div className="time-container">
                            </div>
                        </span>
                        <span className="date-box">
                            <div className="date-header">
                                <div className="weekday">La</div>
                                <div className="weekday-large">Lauantai</div>
                                <div className="date-con"><div className="date"></div></div> 
                            </div>
                            <div className="time-container">
                            </div>
                        </span>
                        <span className="date-box">
                            <div className="date-header">
                                <div className="weekday">Su</div>
                                <div className="weekday-large">Sunnuntai</div>
                                <div className="date-con"><div className="date"></div></div> 
                            </div>
                            <div className="time-container">
                            </div>
                        </span>
                    
                    </div>
                    
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
                    <div className="proceed-con">
                            <button className="sub" type="submit" value="Jatka">Seuraava</button>
                    </div>

                </div>

                
            </div>
        </>
    )
}

export default Ajanvaraus;
