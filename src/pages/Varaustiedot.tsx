import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "../styles/contact-info.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FormInput, PasswordInput } from "../components/FormInput/FormInput";
import Button from "../components/Button/Button";

function BookingInfo() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as {
    selectedService: {
      id: string;
      name: string;
      duration_minutes: number;
    };
    selectedDate: Date | string;
    selectedTime: string;
  } | null;

  const selectedService = state?.selectedService;
  const selectedDate = state?.selectedDate
    ? new Date(state.selectedDate)
    : null;
  const selectedTime = state?.selectedTime;

  const [isNewCustomer, setIsNewCustomer] = useState(true);

  const [customerInfo, setCustomerInfo] = useState({
    etunimi: "",
    sukunimi: "",
    puh: "",
    sahkoposti: "",
    osoite: "",
    postinumero: "",
    toimipaikka: "",
    lisatietoja: "",
  });

  const [loginInfo, setLoginInfo] = useState({
    sposti2: "",
    pwdLogin: "",
  });

  const handleCustomerChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedService || !selectedDate || !selectedTime) return;

    const [hours, minutes] = selectedTime.split(":").map(Number);

    const start = new Date(selectedDate);
    start.setHours(hours, minutes, 0, 0);

    const end = new Date(start);
    end.setMinutes(end.getMinutes() + Number(selectedService.duration_minutes));
   
    const bookingData = {
      ...customerInfo,
      service_id: selectedService.id,
      start_time: start.toISOString(),
      end_time: end.toISOString(),
    };

    try {
      const response = await fetch("http://localhost:4000/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Booking failed");
      }

      navigate("/", { state: { bookingId: data.bookingId } });
    } catch (err) {
      console.error(err);
      alert("Varauksen tekeminen epäonnistui");
    }
  };

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login info:", loginInfo);
  };

  const isFilled = (value: string) => value.trim().length > 0;

  const isCustomerFormValid = Object.entries({
    etunimi: customerInfo.etunimi,
    sukunimi: customerInfo.sukunimi,
    puh: customerInfo.puh,
    sahkoposti: customerInfo.sahkoposti,
    osoite: customerInfo.osoite,
    postinumero: customerInfo.postinumero,
    toimipaikka: customerInfo.toimipaikka,
  }).every(([, value]) => isFilled(value));

  const isLoginValid = Object.entries({
    email: loginInfo.sposti2,
    password: loginInfo.pwdLogin,
  }).every(([, value]) => isFilled(value));

  const formatTimeRange = (startTime: string, duration: number) => {
    const [hours, minutes] = startTime.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);

    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + duration);

    const format = (date: Date) =>
      `${String(date.getHours()).padStart(2, "0")}.${String(
        date.getMinutes(),
      ).padStart(2, "0")}`;

    return `${format(startDate)}-${format(endDate)}`;
  };

  if (!selectedService || !selectedDate || !selectedTime) {
    return (
      <div>
        <p>Varaustiedot puuttuvat</p>
        <button onClick={() => navigate("/")}>Takaisin</button>
      </div>
    );
  }

  return (
    <div className="customer-info-page">
      <div className="confirm-container">
        <div className="booking-info-container">
          <div className="container-header">
            <h2>Olet varaamassa</h2>
          </div>
          <div className="booking-info">
            <p className="info-row-left">Palvelu</p>
            <p className="info-row-right">{selectedService.name}</p>
            <p className="info-row-left">Päivä</p>
            <p className="info-row-right">
              {new Date(selectedDate).toLocaleDateString("fi-FI")}
            </p>
            <p className="info-row-left">Aika</p>
            <p className="info-row-right">
              {formatTimeRange(selectedTime, selectedService.duration_minutes)}
            </p>
          </div>
        </div>
        <div className="group-container">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio1"
              autoComplete="off"
              checked={isNewCustomer}
              onChange={() => setIsNewCustomer(true)}
            />
            <label className="btn btn-outline-custom" htmlFor="btnradio1">
              Uusi asiakas
            </label>

            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio2"
              autoComplete="off"
              checked={!isNewCustomer}
              onChange={() => setIsNewCustomer(false)}
            />
            <label className="btn btn-outline-custom" htmlFor="btnradio2">
              Kirjaudu
            </label>
          </div>
        </div>
        <div className="form-switcher">
          <div
            className={`info-container ${
              isNewCustomer ? "is-active" : "is-hidden"
            }`}
          >
            <div className="container-header">
              <h2>Asiakastiedot</h2>
            </div>
            <div className="customer-info">
              <form className="form-info" onSubmit={handleCustomerSubmit}>
                <FormInput
                  type="text"
                  name="etunimi"
                  label="Etunimi"
                  value={customerInfo.etunimi}
                  onChange={handleCustomerChange}
                  required
                />

                <FormInput
                  type="text"
                  name="sukunimi"
                  label="Sukunimi"
                  value={customerInfo.sukunimi}
                  onChange={handleCustomerChange}
                  required
                />

                <FormInput
                  type="tel"
                  name="puh"
                  label="Puhelinnumero"
                  value={customerInfo.puh}
                  onChange={handleCustomerChange}
                  required
                />

                <FormInput
                  type="email"
                  name="sahkoposti"
                  label="Sähköposti"
                  value={customerInfo.sahkoposti}
                  onChange={handleCustomerChange}
                  required
                />

                <FormInput
                  type="text"
                  name="osoite"
                  label="Osoite"
                  wrapperClassName="osoite-col"
                  value={customerInfo.osoite}
                  onChange={handleCustomerChange}
                  required
                />

                <FormInput
                  type="number"
                  name="postinumero"
                  label="Postinumero"
                  value={customerInfo.postinumero}
                  onChange={handleCustomerChange}
                  required
                />

                <FormInput
                  type="text"
                  name="toimipaikka"
                  label="Toimipaikka"
                  value={customerInfo.toimipaikka}
                  onChange={handleCustomerChange}
                  required
                />
                <div className="input-group" id="add-info-col">
                  <label className="label-textarea" htmlFor="lisatietoja">
                    Lisätietoja
                  </label>
                  <textarea
                    name="lisatietoja"
                    id="lisatietoja"
                    value={customerInfo.lisatietoja}
                    onChange={handleCustomerChange}
                  />
                </div>
                <div className="submit-container">
                  <Button
                    variant="compact"
                    type="submit"
                    disabled={!isCustomerFormValid}
                  >
                    Varaa Aika
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div
            className={`login-container-customer-info ${
              !isNewCustomer ? "is-active" : "is-hidden"
            }`}
          >
            <div className="container-header">
              <h2>Kirjaudu</h2>
            </div>

            <div className="login-form-container">
              <form onSubmit={handleLoginSubmit}>
                <FormInput
                  type="email"
                  name="sposti2"
                  label="Sähköposti"
                  required
                  value={loginInfo.sposti2}
                  onChange={handleLoginChange}
                />
                <PasswordInput
                  name="pwdLogin"
                  required
                  label="Salasana"
                  value={loginInfo.pwdLogin}
                  onChange={handleLoginChange}
                />
                <div className="submit-container-login">
                  <Button type="submit" disabled={!isLoginValid}>
                    Seuraava
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingInfo;
