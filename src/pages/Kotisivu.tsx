import "../styles/home.css"

function Etusivu() {
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
              <div className="btn primary">
                Varaa aika
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
              <div className="btn light">Katso palvelut</div>
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
      <section className="service-section">
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
            <div className="service-card">
              <div className="icon-bg">
                <svg
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                >
                  <path d="m323-488 210 23 16-34-61-33-93-8 6-79 111 8 221 123q17 10 35.5 12.5T802-484L606-680H357l-65-96-110 55 76 183q8 21 25.5 34t39.5 16Zm-9 79q-44-5-78.5-31T184-507L80-760l240-120 80 120h208q16 0 31 6.5t26 17.5l255 256-34 34q-38 38-91 45.5T695-419l-76-41-13 29q-11 23-33 35.5t-48 9.5l-211-23ZM130-121l-22-77 190-50q72-19 153-35.5T599-300q75 0 139.5 30T866-189l-54 59q-51-43-105.5-66.5T599-220q-64 0-141 16.5T319-171l-189 50Z" />
                </svg>
              </div>

              <h3>Hieronta 60min</h3>
              <p className="desc">
                Perinteinen kokovartalohieronta, joka rentouttaa lihakset ja
                rauhoittaa mielen.
              </p>
              <div className="divider"></div>
              <div className="service-meta">
                <span className="duration">
                  <svg
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                  >
                    <path d="m608.41-290.57 61.5-61.02-146.32-146.32V-678.8h-87.18v216.13l172 172.1ZM480-71.87q-84.91 0-159.34-32.12-74.44-32.12-129.5-87.17-55.05-55.06-87.17-129.5Q71.87-395.09 71.87-480t32.12-159.34q32.12-74.44 87.17-129.5 55.06-55.05 129.5-87.17 74.43-32.12 159.34-32.12t159.34 32.12q74.44 32.12 129.5 87.17 55.05 55.06 87.17 129.5 32.12 74.43 32.12 159.34t-32.12 159.34q-32.12 74.44-87.17 129.5-55.06 55.05-129.5 87.17Q564.91-71.87 480-71.87ZM480-480Zm0 317.13q131.8 0 224.47-92.54 92.66-92.55 92.66-224.59 0-132.04-92.66-224.59-92.66-92.54-224.47-92.54-131.8 0-224.47 92.54-92.66 92.55-92.66 224.59 0 132.04 92.66 224.59 92.66 92.54 224.47 92.54Z" />
                  </svg>
                  60min
                </span>
                <span className="price">55€</span>

                <div className="service-link">
                  Varaa aika
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    width="16px"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="service-card">
              <svg
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="m323-488 210 23 16-34-61-33-93-8 6-79 111 8 221 123q17 10 35.5 12.5T802-484L606-680H357l-65-96-110 55 76 183q8 21 25.5 34t39.5 16Zm-9 79q-44-5-78.5-31T184-507L80-760l240-120 80 120h208q16 0 31 6.5t26 17.5l255 256-34 34q-38 38-91 45.5T695-419l-76-41-13 29q-11 23-33 35.5t-48 9.5l-211-23ZM130-121l-22-77 190-50q72-19 153-35.5T599-300q75 0 139.5 30T866-189l-54 59q-51-43-105.5-66.5T599-220q-64 0-141 16.5T319-171l-189 50Z" />
              </svg>
              <h3>Hieronta 60min</h3>
              <p className="desc">
                Perinteinen kokovartalohieronta, joka rentouttaa lihakset ja
                rauhoittaa mielen.
              </p>
              <div className="divider"></div>
              <div className="time-price">
                <div className="duration">
                  <svg
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                  >
                    <path d="m608.41-290.57 61.5-61.02-146.32-146.32V-678.8h-87.18v216.13l172 172.1ZM480-71.87q-84.91 0-159.34-32.12-74.44-32.12-129.5-87.17-55.05-55.06-87.17-129.5Q71.87-395.09 71.87-480t32.12-159.34q32.12-74.44 87.17-129.5 55.06-55.05 129.5-87.17 74.43-32.12 159.34-32.12t159.34 32.12q74.44 32.12 129.5 87.17 55.05 55.06 87.17 129.5 32.12 74.43 32.12 159.34t-32.12 159.34q-32.12 74.44-87.17 129.5-55.06 55.05-129.5 87.17Q564.91-71.87 480-71.87ZM480-480Zm0 317.13q131.8 0 224.47-92.54 92.66-92.55 92.66-224.59 0-132.04-92.66-224.59-92.66-92.54-224.47-92.54-131.8 0-224.47 92.54-92.66 92.55-92.66 224.59 0 132.04 92.66 224.59 92.66 92.54 224.47 92.54Z" />
                  </svg>
                  <div className="minutes">60min</div>
                </div>
                <div className="price">55€</div>
              </div>
              <div className="make-appointment">
                Varaa aika
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="16px"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </div>
            <div className="service-card">
              <svg
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="m323-488 210 23 16-34-61-33-93-8 6-79 111 8 221 123q17 10 35.5 12.5T802-484L606-680H357l-65-96-110 55 76 183q8 21 25.5 34t39.5 16Zm-9 79q-44-5-78.5-31T184-507L80-760l240-120 80 120h208q16 0 31 6.5t26 17.5l255 256-34 34q-38 38-91 45.5T695-419l-76-41-13 29q-11 23-33 35.5t-48 9.5l-211-23ZM130-121l-22-77 190-50q72-19 153-35.5T599-300q75 0 139.5 30T866-189l-54 59q-51-43-105.5-66.5T599-220q-64 0-141 16.5T319-171l-189 50Z" />
              </svg>
              <h3>Hieronta 60min</h3>
              <p className="desc">
                Perinteinen kokovartalohieronta, joka rentouttaa lihakset ja
                rauhoittaa mielen.
              </p>
              <div className="divider"></div>
              <div className="time-price">
                <div className="duration">
                  <svg
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                  >
                    <path d="m608.41-290.57 61.5-61.02-146.32-146.32V-678.8h-87.18v216.13l172 172.1ZM480-71.87q-84.91 0-159.34-32.12-74.44-32.12-129.5-87.17-55.05-55.06-87.17-129.5Q71.87-395.09 71.87-480t32.12-159.34q32.12-74.44 87.17-129.5 55.06-55.05 129.5-87.17 74.43-32.12 159.34-32.12t159.34 32.12q74.44 32.12 129.5 87.17 55.05 55.06 87.17 129.5 32.12 74.43 32.12 159.34t-32.12 159.34q-32.12 74.44-87.17 129.5-55.06 55.05-129.5 87.17Q564.91-71.87 480-71.87ZM480-480Zm0 317.13q131.8 0 224.47-92.54 92.66-92.55 92.66-224.59 0-132.04-92.66-224.59-92.66-92.54-224.47-92.54-131.8 0-224.47 92.54-92.66 92.55-92.66 224.59 0 132.04 92.66 224.59 92.66 92.54 224.47 92.54Z" />
                  </svg>
                  <div className="minutes">60min</div>
                </div>
                <div className="price">55€</div>
              </div>
              <div className="make-appointment">
                Varaa aika
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="16px"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Etusivu;
