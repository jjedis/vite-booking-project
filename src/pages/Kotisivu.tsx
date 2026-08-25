import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import BookingCalendar from "../components/booking";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Etusivu() {
  type Service = {
    id: string;
    name: string;
    duration_minutes: number;
    price_cents: number;
    description: string;
  };

  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  //fetching available services
  useEffect(() => {
    fetch("http://localhost:4000/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Failed to fetch services", err));
  }, []);
  console.log(selectedService)

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <div className="banner">
            <div className="eyebrow">Hieronta &amp; hyvinvointi</div>
            <h1>
              Löydä rauha kehon<br></br> ja mielen <em>välillä</em>
            </h1>
            <p>
              Ammattitaitoista hierontaa ja hyvinvointihoitoja rauhallisessa
              ympäristössä. Varaa aikasi helposti verkossa ja anna itsellesi
              hetki, jonka ansaitset.
            </p>
            <div className="banner-buttons">
              <Link to="/#varaa-aika">
                <div className="btn primary">
                  Varaa aika
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </Link>
              <Link to="/#palvelut">
                <div className="btn light">Katso palvelut</div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="about-me">
        <div className="container">
          <div className="about-me-img"></div>
          <div className="about-me-content"></div>
        </div>
      </section>
      <section className="service-section" id="palvelut">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Palvelumme</div>
            <h2>Hoidot jokaiseen tarpeeseen</h2>
            <p>
              Valikoimastamme löydät sopivan hoidon niin rentoutumiseen,
              palautumiseen kuin särkyjen lievitykseen.
            </p>
          </div>
          <div className="service-grid">
            {services.map((service) => {
              return (
                <div key={service.id} className="service-card">
                  <div className="service-icon">
                    <svg
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="currentColor"
                    >
                      <path d="m323-488 210 23 16-34-61-33-93-8 6-79 111 8 221 123q17 10 35.5 12.5T802-484L606-680H357l-65-96-110 55 76 183q8 21 25.5 34t39.5 16Zm-9 79q-44-5-78.5-31T184-507L80-760l240-120 80 120h208q16 0 31 6.5t26 17.5l255 256-34 34q-38 38-91 45.5T695-419l-76-41-13 29q-11 23-33 35.5t-48 9.5l-211-23ZM130-121l-22-77 190-50q72-19 153-35.5T599-300q75 0 139.5 30T866-189l-54 59q-51-43-105.5-66.5T599-220q-64 0-141 16.5T319-171l-189 50Z" />
                    </svg>
                  </div>
                  <h3>{service.name}</h3>
                  <p className="desc">
                    Perinteinen kokovartalohieronta, joka rentouttaa lihakset ja
                    rauhoittaa mielen.
                  </p>
                  <div className="divider"></div>
                  <div className="service-meta">
                    <div className="duration-con">
                      <div className="duration">
                        <svg
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="currentColor"
                        >
                          <path d="m608.41-290.57 61.5-61.02-146.32-146.32V-678.8h-87.18v216.13l172 172.1ZM480-71.87q-84.91 0-159.34-32.12-74.44-32.12-129.5-87.17-55.05-55.06-87.17-129.5Q71.87-395.09 71.87-480t32.12-159.34q32.12-74.44 87.17-129.5 55.06-55.05 129.5-87.17 74.43-32.12 159.34-32.12t159.34 32.12q74.44 32.12 129.5 87.17 55.05 55.06 87.17 129.5 32.12 74.43 32.12 159.34t-32.12 159.34q-32.12 74.44-87.17 129.5-55.06 55.05-129.5 87.17Q564.91-71.87 480-71.87ZM480-480Zm0 317.13q131.8 0 224.47-92.54 92.66-92.55 92.66-224.59 0-132.04-92.66-224.59-92.66-92.54-224.47-92.54-131.8 0-224.47 92.54-92.66 92.55-92.66 224.59 0 132.04 92.66 224.59 92.66 92.54 224.47 92.54Z" />
                        </svg>
                        <div className="minutes">
                          {service.duration_minutes}min
                        </div>
                      </div>
                    </div>
                    <div className="price">{service.price_cents / 100}€</div>

                    <div className="service-link">
                      <Link
                        to="/#varaa-aika"
                        onClick={() => setSelectedService(service)}
                      >
                        Varaa aika
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          width="16px"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="contact-section" id="yhteystiedot">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Yhteystiedot</div>
            <h2>Tule käymään tai ota yhteyttä</h2>
            <p>
              Löydät meidät helposti – kysy rohkeasti lisää tai varaa aikasi
              suoraan alta
            </p>
          </div>
          <div className="contact-wrapper">
            <div className="contact-card">
              <div className="card-head">
                <h3>Laura Sihvonen</h3>
                <p>Hyvinvointipalvelut</p>
              </div>
              <div className="contact-row">
                <div className="ic">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className="txt-label">Puhelin</div>
                  <div className="txt-val">0400973316</div>
                </div>
              </div>
              <div className="contact-row">
                <div className="ic">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M22 6 12 13 2 6" />
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                  </svg>
                </div>
                <div>
                  <div className="txt-label">Sähköposti</div>
                  <div className="txt-val">laura.sihvonen@outlook.com</div>
                </div>
              </div>
              <div className="contact-row">
                <div className="ic">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div>
                  <div className="txt-label">Aukioloajat</div>
                  <div className="txt-val">Ma&ndash;La, 9:00&ndash;20:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="booking-section" id="varaa-aika">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Varaa aika</div>
            <h2>Ajanvaraus muutamassa klikkauksessa</h2>
            <p>
              Valitse palvelu, sopiva päivä ja aika – vahvistus saapuu suoraan
              sähköpostiisi.
            </p>
          </div>
          <div className="varaa-grid">
            <div className="steps">
              <div className="step">
                <div className="step-num">1</div>
                <div>
                  <h4>Valitse palvelu</h4>
                  <p>
                    Selaa hoitovalikoimaa ja valitse itsellesi sopiva hoito.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="step-num">2</div>
                <div>
                  <h4>Valitse päivä ja aika</h4>
                  <p>Näet vapaat ajat suoraan kalenterista reaaliajassa. </p>
                </div>
              </div>
              <div className="step">
                <div className="step-num">3</div>
                <div>
                  <h4>Vahvista varaus</h4>
                  <p>Täytä yhteystietosi ja saat vahvistuksen sähköpostiin.</p>
                </div>
              </div>
            </div>
            <div className="booking-card">
              <BookingCalendar
                forceMobile={true}
                selectedServiceId={selectedService?.id}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Etusivu;
