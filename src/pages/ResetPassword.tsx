import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/login.css";
import Button from "../components/Button/Button";
import { PasswordInput } from "../components/FormInput/FormInput";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Salasanat eivät täsmää");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword: passwords.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Salasanan vaihto epäonnistui");
        return;
      }

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      console.error(err);
      setError("Salasanan vaihto epäonnistui");
    }
  };

  if (!token) {
    return (
      <div className="main-login-container">
        <div className="login-container w-full">
          <div className="header">
            <h1>Virheellinen linkki</h1>
          </div>
          <p style={{ padding: "20px", textAlign: "center" }}>
            Salasanan nollauslinkki puuttuu tai on virheellinen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-login-container">
      <div className="login-container w-full">
        <div className="header">
          <h1>Aseta uusi salasana</h1>
        </div>
        {success ? (
          <p style={{ padding: "20px", textAlign: "center" }}>
            Salasana vaihdettu. Sinut ohjataan kirjautumissivulle.
          </p>
        ) : (
          <div className="login-info">
            <form className="form-element" onSubmit={handleSubmit}>
              <PasswordInput
                name="newPassword"
                label="Uusi salasana"
                value={passwords.newPassword}
                onChange={handleChange}
                required
              />
              <PasswordInput
                name="confirmPassword"
                label="Vahvista uusi salasana"
                value={passwords.confirmPassword}
                onChange={handleChange}
                required
              />
              {error && <p className="reset-status">{error}</p>}
              <div className="submit-container-login">
                <Button type="submit">Vaihda salasana</Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
