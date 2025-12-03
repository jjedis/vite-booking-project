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