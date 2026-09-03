import "../styles/profile.css"
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

function Profiili() {

  const navigate = useNavigate();
  const {user, logout, login, isLoggedIn, token} = useAuth()

  type comingBookings = {
    start_time: string;
    service: string;
    id: number;
  }
// declaring states
  const [bookings, setBookings] = useState<comingBookings[]>([])
  const [selectedBooking, setSelectedBooking] = useState<comingBookings | null>(null,);

  const [showEdit, setShowEdit] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [editInfo, setEditInfo] = useState({
    firstName: "",
    lastName: "",
    email:"",
    phone:"",
    address:"",
    postalCode:"",
    city:"",


  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

// handler for seting editinfo state
  const handleInfoChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEditInfo((prev) => ({ ...prev, [name]: value }));
  };

  // handler for setting passwordForm state
  const handlePasswordFormChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  // handler for submiting edit form
  const handleSubmit = async (e: FormEvent <HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    const updatedData = {
      firstName: editInfo.firstName || user?.firstName,
      lastName: editInfo.lastName || user?.lastName,
      email: editInfo.email || user?.email,
      phone: editInfo.phone || user?.phone,
      address: editInfo.address || user?.address,
      postalCode: editInfo.postalCode || user?.postalCode,
      city: editInfo.city || user?.city,
    };

    try{
      const res = await fetch("http://localhost:4000/api/update-profile", {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({customerId: user?.customerId, ...updatedData,}),
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      const data = await res.json();

      console.log("Updated user:", data)

      login(data.token);

      setShowEdit(false);

    }catch(err) {
      console.error("Update failed", err);
    }
  }

  // handler for submitting change-password form
  const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Uudet salasanat eivät täsmää");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPasswordError(data.error || "Salasanan vaihto epäonnistui");
        return;
      }

      setPasswordSuccess("Salasana vaihdettu");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error("Password change failed", err);
      setPasswordError("Salasanan vaihto epäonnistui");
    }
  };

// handle logout
  const handleLogout = () => {
    logout();
    navigate("/")
  }

  // edit info handler

  // handler for canceling booking and updating databse
  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    try{
      await fetch("http://localhost:4000/api/cancel-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({bookingId: selectedBooking.id }),
      });

      setBookings((prev) =>
        prev.filter((b) => b.start_time !== selectedBooking.start_time),
      );

      setShowCancel(false);
      setSelectedBooking(null);
    }
    catch(err){
      console.error("cancel failed", err)
    }
  }
// fetching upcoming bookings to render
  useEffect(() => {
    if (!user?.customerId || !token) return;
      fetch(`http://localhost:4000/api/upcoming/${user?.customerId}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Failed to fetch bookings", err))
  }, [bookings, user, token]);

  useEffect(() => {
    if (user && showEdit) {
      setEditInfo({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone?.toString() || "",
        address: user.address || "",
        postalCode: user.postalCode?.toString() || "",
        city: user.city || "",
      });
    }
  }, [user, showEdit]);

  useEffect(() => {
    if (showChangePassword) {
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordError("");
      setPasswordSuccess("");
    }
  }, [showChangePassword]);

//dateformatter for upcoming bookings
  const formatDateTime = (iso: string) => {
    const date = new Date(iso)

    return date.toLocaleString("fi-FI", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"

    });
  };

// formatter for customers phonenumber 
  const formatPhone = (phone?: number) => {
    if (!phone) return "";

    const str = phone.toString();
    return `${str.slice(0, 3)} ${str.slice(3, 6)} ${str.slice(6)}`;
  };


  //if not logged in => button to navigate home
  if (!isLoggedIn) {
    return (
      <div className="guest-redirect">
        <div className="redirect-card">
          <p>Kirjaudu jatkaaksesi</p>
          <div className="redirect-buttons">
            <button onClick={() => navigate("/")}>Takaisin</button>
            <button onClick={() => navigate("/login")}>Kirjaudu</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="profile-page d-flex gap-2 justify-content-center ms-auto w-100">
      <div className="profile-info card text-center p-0 m-2">
        <img
          src="\src\assets\card-banner.png"
          className="card-img-top"
          alt=""
        />
        <div className="card-body p-3">
          <h4 className="card-title">
            {user?.firstName
              ? user.firstName.charAt(0).toUpperCase() + user?.firstName.slice(1)
              : "Käyttäjä"}
          </h4>
          <div className="card-email">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="bi bi-envelope-fill position-static me-1"
            >
              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
            </svg>
            {user?.email || "test@example.com"}
          </div>
          <div className="card-phone">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="bi bi-telephone-fill position-static me-1"
            >
              <path
                fillRule="evenodd"
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
              />
            </svg>
            {formatPhone(user?.phone) || "0101010101010"}
          </div>
          <div className="divider"></div>
          <div className="card-edit">
            <button
              className="edit-info-button"
              onClick={() => setShowEdit(true)}
            >
              Muokkaa tietoja
            </button>
            <button
              className="edit-info-button"
              onClick={() => setShowChangePassword(true)}
            >
              Vaihda salasana
            </button>
          </div>
          <div className="divider"></div>
          <div className="card-logout">
            <button onClick={handleLogout}>Kirjaudu ulos</button>
          </div>
        </div>
      </div>
      <div className="profile-bookings m-2">
        <div className="upcoming-bookings">
          <div className="bookings-divider">
            <h5>
              <strong>Tulevat varaukset</strong>
            </h5>
            <div className="divider"></div>
          </div>
          {bookings.map((booking, index) => (
            <div key={index} className="booking-con">
              <div className="booking-details">
                <div className="wrapper_header">
                  <strong>{booking.service}</strong>
                </div>
                <p>{formatDateTime(booking.start_time)}</p>
              </div>
              <div className="cancel-booking">
                <button
                  className="cancel-button"
                  onClick={() => {
                    setSelectedBooking(booking);
                    setShowCancel(true);
                  }}
                >
                  Peruuta
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="past-bookings">
          <div className="bookings-divider">
            <h5>
              <strong>Menneet Varaukset</strong>
            </h5>
            <div className="divider"></div>
          </div>
        </div>
      </div>
      <div className="giftcard card text-center  m-2">
        <div className="card-body">
          <h5 className="card-title-gift">
            <strong>Lahjakortit</strong>
          </h5>
          <div className="divider"></div>
          <p className="card-text">Saldo: 0€</p>
          <button className="gift-card-button">Käytä lahjakortti</button>
        </div>
      </div>
      {showEdit && (
        <div className="overlay" onClick={() => setShowEdit(false)}>
          <div className="profile-overlay-content" onClick={(e) => e.stopPropagation()}>
            <h4>Muokkaa tietoja</h4>

            <form onSubmit={handleSubmit} className="edit-form">
              <input
                name="firstName"
                type="text"
                value={editInfo.firstName}
                onChange={handleInfoChange}
              />
              <input
                name="lastName"
                type="text"
                value={editInfo.lastName}
                onChange={handleInfoChange}
              />
              <input
                name="phone"
                type="tel"
                value={editInfo.phone}
                onChange={handleInfoChange}
              />

              <input
                name="email"
                type="email"
                value={editInfo.email}
                onChange={handleInfoChange}
              />
              <input
                name="address"
                type="text"
                value={editInfo.address}
                onChange={handleInfoChange}
              />
              <input
                name="postalCode"
                type="number"
                value={editInfo.postalCode}
                onChange={handleInfoChange}
              />
              <input
                name="city"
                type="text"
                value={editInfo.city}
                onChange={handleInfoChange}
              />

              <div className="overlay-buttons">
                <button type="submit">Tallenna</button>
                <button type="button" onClick={() => setShowEdit(false)}>
                  Peruuta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showChangePassword && (
        <div className="overlay" onClick={() => setShowChangePassword(false)}>
          <div
            className="profile-overlay-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>Vaihda salasana</h4>

            <form onSubmit={handlePasswordSubmit} className="edit-form">
              <input
                name="currentPassword"
                type="password"
                placeholder="Nykyinen salasana"
                value={passwordForm.currentPassword}
                onChange={handlePasswordFormChange}
                required
              />
              <input
                name="newPassword"
                type="password"
                placeholder="Uusi salasana"
                value={passwordForm.newPassword}
                onChange={handlePasswordFormChange}
                required
              />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Vahvista uusi salasana"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordFormChange}
                required
              />

              {passwordError && (
                <p style={{ color: "#b3261e", fontSize: "14px", margin: "0 0 10px" }}>
                  {passwordError}
                </p>
              )}
              {passwordSuccess && (
                <p style={{ color: "#2e7d32", fontSize: "14px", margin: "0 0 10px" }}>
                  {passwordSuccess}
                </p>
              )}

              <div className="overlay-buttons">
                <button type="submit">Tallenna</button>
                <button type="button" onClick={() => setShowChangePassword(false)}>
                  Peruuta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showCancel && (
        <div className="cancel-overlay" onClick={() => setShowCancel(false)}>
          <div
            className="profile-cancel-overlay-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cancel-message">
              <p>
                Haluatko varmasti peruuttaa varauksen <br />
                <strong>{selectedBooking?.service}</strong> <br />
                {selectedBooking && formatDateTime(selectedBooking.start_time)}
              </p>
            </div>
            <div className="cancel-buttons">
              <button onClick={() => setShowCancel(false)}>Poistu</button>
              <button onClick={handleCancelBooking}>Peruuta Varaus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profiili;
