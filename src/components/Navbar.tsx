import { NavLink } from "react-router-dom";
import '/src/navbar.css'
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const {isLoggedIn , logout, user} = useAuth()
  return (
    <>
      <nav
        className="navbar navbar-expand-md bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <p className="logo-1">Laura Sihvonen</p>
            <p className="logo-2">Hyvinvointipalvelut</p>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav">
              <div className="left-links">
                <ul>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                      }
                      to="/"
                    >
                      ETUSIVU
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                      }
                      to="/palvelut"
                    >
                      PALVELUT
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                      }
                      to="/yhteystiedot"
                    >
                      YHTEYSTIEDOT
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                      }
                      to="/ajanvaraus"
                    >
                      VARAA AIKA
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="right-links">
                <div className="nav-item">
                  <NavLink className="profile-link" to="/profiili">
                    <svg width="24" height="24" viewBox="0 0 16 16">
                      <path
                        fill="currentColor"                        
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
                      />
                    </svg>
                  </NavLink>
                </div>
                <div className="nav-item">
                  {isLoggedIn ? (
                    <button className="logout-button" onClick={logout}>
                      Kirjaudu ulos
                    </button>
                  ) : (
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive ? "login-button active-button" : "login-button"
                      }
                    >
                      Kirjaudu
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;