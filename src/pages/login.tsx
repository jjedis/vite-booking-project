import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChangeEvent, FormEvent } from "react";
import "../styles/login.css";
import Button from "../components/Button/Button";
import {FormInput, PasswordInput} from "../components/FormInput/FormInput";

function Login() {
  const [showReset, setShowReset] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [loginInfo, setLoginInfo] = useState({
    sposti: "",
    salasana: "",
  });

  const [resetInfo, setResetInfo] = useState({
    emailreset: "",
  });

  const [registrationInfo, setRegistrationInfo] = useState({
    etunimi: "",
    sukunimi: "",
    puh: "",
    sahkoposti: "",
    osoite: "",
    postinumero: "",
    postitoimipaikka: "",
    kayttajatunnus: "",
    pwd: "",
    pwd_confirm: "",
    tos: "",
  });

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login:", loginInfo);
  };

  const handleResetSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Reset:", resetInfo);
  };

  const handleregistrationSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Registration:", registrationInfo);
  };

  const fadeSlide = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="main-login-container">
      <AnimatePresence mode="wait">
        {!showRegister && (
          <motion.div
            key="login"
            {...fadeSlide}
            className="login-container absolute w-full"
          >
            <div className="header">
              <h1>Kirjaudu sisään</h1>
            </div>
            <div className="login-info">
              <form className="form-element" onSubmit={handleLoginSubmit}>
                <FormInput
                  type="email"
                  name="sahkoposti"
                  label="Sähköposti"
                  value={loginInfo.sposti}
                  onChange={handleLoginChange}
                  required
                />
                <PasswordInput
                  name="salasana"
                  label="Salasana"
                  value={loginInfo.salasana}
                  onChange={handleLoginChange}
                  required
                />
                <div className="submit-container-login">
                  <Button type="submit">Kirjaudu sisään</Button>
                </div>
              </form>
            </div>
            <div className="additional-options">
              <p>
                Eikö sinulla ole käyttäjää?{" "}
                <button
                  type="button"
                  className="link-button"
                  onClick={() => {
                    setShowRegister(true);
                    setShowReset(false);
                  }}
                >
                  Rekisteröidy
                </button>
              </p>
              <p>
                Unohditko{" "}
                <button
                  type="button"
                  className="link-button"
                  onClick={() => setShowReset((prev) => !prev)}
                >
                  Salasanasi?
                </button>
              </p>
            </div>
            <AnimatePresence>
              {showReset && (
                <motion.div
                  key="reset"
                  {...fadeSlide}
                  className="reset-pwd mt-4"
                >
                  <p>Syötä sähköpostiosoitteesi vaihtaaksesi salasanasi</p>
                  <form className="reset-form" onSubmit={handleResetSubmit}>
                    <FormInput
                      type="email"
                      name="emailreset"
                      label="Sähköposti"
                      value={resetInfo.emailreset}
                      onChange={handleResetChange}
                      required
                    />
                    <button className="sub" type="submit">
                      Lähetä
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
        {showRegister && (
          <motion.div
            key="register"
            {...fadeSlide}
            className="reg-container absolute w-full"
          >
            <div className="header">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                className="bi bi-arrow-left-square"
                viewBox="0 0 16 16"
                onClick={() => setShowRegister(false)}
              >
                <path
                  fill-rule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
                />
              </svg>

              <h1>Rekisteröidy</h1>
            </div>
            <div className="registration-info">
              <form
                className="registration-form"
                onSubmit={handleregistrationSubmit}
              >
                <FormInput
                  type="text"
                  name="etunimi"
                  label="Etunimi"
                  value={registrationInfo.etunimi}
                  onChange={handleRegChange}
                  required
                />
                <FormInput
                  type="text"
                  name="sukunimi"
                  label="Sukunimi"
                  value={registrationInfo.sukunimi}
                  onChange={handleRegChange}
                  required
                />
                <FormInput
                  type="tel"
                  name="puh"
                  label="Puhelinnumero"
                  value={registrationInfo.puh}
                  onChange={handleRegChange}
                  required
                />

                <FormInput
                  type="email"
                  name="sahkoposti"
                  label="Sähköposti"
                  value={registrationInfo.sahkoposti}
                  onChange={handleRegChange}
                  required
                />

                <FormInput
                  type="text"
                  name="osoite"
                  label="Osoite"
                  value={registrationInfo.osoite}
                  onChange={handleRegChange}
                  required
                />

                <FormInput
                  type="number"
                  name="postinumero"
                  label="Postinumero"
                  value={registrationInfo.postinumero}
                  onChange={handleRegChange}
                  required
                />

                <FormInput
                  type="text"
                  name="postitoimipaikka"
                  label="Postitoimipaikka"
                  value={registrationInfo.postitoimipaikka}
                  onChange={handleRegChange}
                  required
                />

                <FormInput
                  type="text"
                  name="kayttajatunnus"
                  label="Käyttäjätunnus"
                  value={registrationInfo.kayttajatunnus}
                  onChange={handleRegChange}
                  required
                />

                <FormInput
                  type="password"
                  name="pwd"
                  label="Salasana"
                  value={registrationInfo.pwd}
                  onChange={handleRegChange}
                  required
                />

                <FormInput
                  type="password"
                  name="pwd-confirm"
                  label="Vahvista Salasana"
                  value={registrationInfo.pwd_confirm}
                  onChange={handleRegChange}
                  required
                />

                <div className="tos">
                  <input
                    className="tos-check"
                    id="tos-check"
                    type="checkbox"
                    value={registrationInfo.tos}
                    onChange={handleRegChange}
                  />
                  <label htmlFor="tos-check">Hyväksyn ehdot</label>
                </div>
                <div className="submit-container">
                  <button className="sub" type="submit" value="Luo käyttäjä">
                    Luo Käyttäjä
                  </button>
                </div>
              </form>
            </div>
            <div className="additional-options"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Login;
