import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "../styles/contact-info.css";
import { useLocation, useNavigate } from "react-router-dom";
import {FormInput, PasswordInput} from "../components/FormInput/FormInput";
import Button from "../components/Button/Button";

function BookingInfo() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const selectedService =
    state?.selectedService ?? sessionStorage.getItem("selectedService");
  const selectedDate =
    state?.selectedDate ?? sessionStorage.getItem("selectedDate");
  const selectedTime =
    state?.selectedTime ?? sessionStorage.getItem("selectedTime");

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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Customer info:", customerInfo);
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
  }).every(([, value]) => isFilled(value))

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
              <h4 className="info-row-left">Hieronta</h4>
              <h4 className="info-row-right">60min</h4>
              <h4 className="info-row-left">Päivä</h4>
              <h4 className="info-row-right">18.syyskuuta 2025</h4>
              <h4 className="info-row-left">Aika</h4>
              <h4 className="info-row-right">9:00-10:00</h4>
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
                    name="additional-info"
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
                  <Button 
                    type="submit"
                    disabled={!isLoginValid}
                  >
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
