import { NavLink } from "react-router-dom";
import '/src/navbar.css'

function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-md bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <p className='logo-1'>Laura Sihvonen</p>
          <p className='logo-2'>Hyvinvointipalvelut</p></a>
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
        
        <div className="collapse navbar-collapse"  id="navbarNav">
          <ul className="navbar-nav">
            <div className="left-links">
              <li className="nav-item">
                <NavLink className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"} to="/">Etusivu</NavLink> 
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"} to="/palvelut">Palvelut</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"} to="/ajanvaraus">Varaa</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"} to="/yhteystiedot">Yhteystiedot</NavLink>
            </li>
            </div>
            <div className="right-links">
              <li className="nav-item">
                <NavLink to="/login" className={({ isActive }) =>
                isActive ? "login-button active-button" : "login-button"
                }>
                Kirjaudu
                </NavLink>
              </li>
            </div>
          </ul>   
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar;