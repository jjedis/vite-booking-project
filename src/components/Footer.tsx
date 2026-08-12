import { NavLink } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <footer className="sw-footer">
      <div className="sw-footer-inner">
        <div className="sw-grid">
          <div>
            <p className="sw-brand-name">Stillwater</p>
            <p className="sw-tagline"></p>
            <div className="sw-social">
              <a href="#" aria-label="Instagram">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37a4 4 0 1 1-7.914 1.174 4 4 0 0 1 7.914-1.174z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className="sw-eyebrow">Explore</p>
            <ul className="sw-links">
              <li>
                <NavLink to="/ajanvaraus">Varaa hieronta</NavLink>
              </li>
              <li>
                <NavLink to="/palvelut">Palvelut &amp; hinnasto</NavLink>
              </li>
              <li>
                <NavLink to="/about">Meistä</NavLink>
              </li>
              <li>
                <NavLink to="/login">Kirjaudu</NavLink>
              </li>
            </ul>
          </div>

          <div>
            <p className="sw-eyebrow">Yhteystiedot</p>
            <div className="sw-visit-item">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="bi bi-envelope-fill position-static me-1"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
              </svg>
              <span>laura.sihvonen@outlook.com</span>
            </div>
            <div className="sw-visit-item">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>+358 9 123 4567</span>
            </div>
            <div className="sw-visit-item">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Mon&ndash;Sat, 9:00&ndash;20:00</span>
            </div>
          </div>
        </div>

        <div className="sw-wave-wrap">
          <svg
            className="sw-wave"
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="sw-wave-calm"
              d="M0,30 Q50,10 100,30 Q150,48.5 200,30 Q250,13 300,30 Q350,45.5 400,30 Q450,16 500,30 Q550,42.5 600,30 Q650,19 700,30 Q750,39.5 800,30 Q850,22 900,30 Q950,36.5 1000,30 Q1050,25 1100,30 Q1150,33.5 1200,30"
            />
          </svg>
        </div>

        <div className="sw-bottom">
          <span>&copy; 2026 Stillwater Massage &amp; Bodywork</span>
          <ul className="sw-bottom-links">
            <li>
              <NavLink to="/tietosuoja">Tietosuoja</NavLink>
            </li>
            <li>
              <NavLink to="/kayttoehdot">Käyttöehdot</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
