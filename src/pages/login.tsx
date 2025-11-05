import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChangeEvent, FormEvent } from "react";
import "../styles/login.css"
import arrowLeft from "bootstrap-icons/icons/arrow-left-square.svg";


function Login() {

    const [showReset, setShowReset] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const [loginInfo, setLoginInfo] = useState({
        sposti:"",
        salasana:"",
    });

    const [resetInfo, setResetInfo] = useState({
        emailreset:"",
    });

    const [registrationInfo, setRegistrationInfo] = useState({
        etunimi:"",
        sukunimi:"",
        puh:"",
        sahkoposti:"",
        osoite:"",
        postinumero:"",
        postitoimipaikka:"",
        kayttajatunnus:"",
        pwd:"",
        pwd_confirm:"",
        tos:"",
    });

    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setLoginInfo(prev => ({...prev, [name]: value}));
    };

    const handleRegChange = (e: ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setRegistrationInfo(prev => ({...prev, [name]: value}));
    };

    const handleResetChange = (e: ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setResetInfo(prev => ({...prev, [name]: value}));
    };

    const handleLoginSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Login:", loginInfo);
    };

    const handleResetSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Reset:", resetInfo);
    };

    const handleregistrationSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Registration:", registrationInfo);
    };

    const fadeSlide = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };


    return (
        <div className="main-container">
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
                            <form onSubmit={handleLoginSubmit}>   
                                <div className="input-group">               
                                    <input 
                                        type="email" 
                                        id="login-sposti" 
                                        name="sposti" 
                                        required 
                                        placeholder=" "
                                        value={loginInfo.sposti}
                                        onChange={handleLoginChange}
                                    />
                                    <label className="labelline" htmlFor="sposti">Sähköposti</label>
                                </div>
                                <div className="input-group">               
                                    <input 
                                        type="password" 
                                        id="login-salasana" 
                                        name="salasana" 
                                        required 
                                        placeholder=" "
                                        value={loginInfo.salasana}
                                        onChange={handleLoginChange}
                                    />
                                    <label className="labelline" htmlFor="salasana">Salasana</label>
                                </div>                   
                                <div className="submit-container">
                                    <button aria-label="Kirjaudu sisään" className="sub"  type="submit" value="Kirjaudu Sisään">Kirjaudu sisään</button>
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
                                        <div className="input-group">
                                            <input 
                                                type="email" 
                                                name="emailreset" 
                                                required 
                                                placeholder=" "
                                                value={resetInfo.emailreset}
                                                onChange={handleResetChange}
                                            />
                                            <label className="labelline" htmlFor="emailreset">Sähköposti</label>
                                        </div>
                                        <button className="sub" type="submit">Lähetä</button>
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
                                onClick={()=> setShowRegister(false)}
                                >
                                <path 
                                fill-rule="evenodd" 
                                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                            </svg>
                          
                            <h1>Rekisteröidy</h1>               
                        </div>
                        <div className="login-info">
                            <form className="login-form" onSubmit={handleregistrationSubmit}>   
                                <div className="input-group-reg">               
                                    <input 
                                        type="text" 
                                        id="reg-etunimi" 
                                        name="etunimi" 
                                        required 
                                        placeholder=" "
                                        value={registrationInfo.etunimi}
                                        onChange={handleRegChange}
                                    />
                                    <label className="labelline" htmlFor="reg-etunimi">Etunimi</label>
                                </div> 
                                <div className="input-group-reg">   
                                    <input 
                                        type="text" 
                                        id="reg-sukunimi" 
                                        name="sukunimi" 
                                        required 
                                        placeholder=" "
                                        value={registrationInfo.sukunimi}
                                        onChange={handleRegChange}
                                    />
                                    <label className="labelline" htmlFor="reg-sukunimi">Sukunimi</label>
                                </div> 
                                <div className="input-group-reg">
                                    <input 
                                        type="tel" 
                                        id="reg-puh" 
                                        name="puh" 
                                        required 
                                        placeholder=" "
                                        value={registrationInfo.puh}
                                        onChange={handleRegChange}
                                    />
                                    <label className="labelline" htmlFor="reg-puh">Puhelinnumero</label>
                                </div> 
                                <div className="input-group-reg">
                                    <input 
                                        type="email" 
                                        id="reg-sahkoposti"  
                                        name="sahkoposti" 
                                        required 
                                        placeholder=" "
                                        value={registrationInfo.sahkoposti}
                                        onChange={handleRegChange}
                                    />
                                    <label className="labelline" htmlFor="reg-sahkoposti">Sähköposti</label>
                                </div> 
                                <div className="input-group-reg">
                                    <input 
                                        type="text" 
                                        id="reg-osoite" 
                                        name="osoite" 
                                        required 
                                        placeholder=" "
                                        value={registrationInfo.osoite}
                                        onChange={handleRegChange}
                                    />
                                    <label className="labelline" htmlFor="reg-osoite">Osoite</label>
                                </div> 
                                <div className="input-group-reg">
                                    <input 
                                        type="number" 
                                        id="reg-postinumero" 
                                        name="postinumero" 
                                        required 
                                        placeholder=" "
                                        value={registrationInfo.postinumero}
                                        onChange={handleRegChange}
                                    />
                                    <label className="labelline" htmlFor="reg-postinumero">Postinumero</label>
                                </div> 
                                <div className="input-group-reg">
                                    <input 
                                        type="text" 
                                        id="reg-postitoimipaikka" 
                                        name="postitoimipaikka" 
                                        required placeholder=" "
                                        value={registrationInfo.postitoimipaikka}
                                        onChange={handleRegChange}
                                    />
                                    <label className="labelline" htmlFor="reg-postitoimipaikka">Postitoimipaikka</label>
                                </div> 
                                <div className="input-group-reg">
                                    <input 
                                        type="text" 
                                        id="reg-kayttajatunnus" 
                                        name="kayttajatunnus" 
                                        required 
                                        placeholder=" "
                                        value={registrationInfo.kayttajatunnus}
                                        onChange={handleRegChange}
                                    />
                                    <label className="labelline" htmlFor="reg-kayttajatunnus">Käyttäjätunnus</label>
                                </div> 
                                <div className="input-group-reg">
                                    <input 
                                        type="password" 
                                        id="reg-pwd" 
                                        name="pwd" 
                                        required 
                                        placeholder=" "
                                        value={registrationInfo.pwd}
                                        onChange={handleRegChange}
                                    />
                                    <label className="labelline" htmlFor="reg-pwd">Salasana</label>
                                </div> 
                                <div className="input-group-reg">
                                    <input  
                                        type="password" 
                                        id="reg-pwd_confirm" 
                                        name="pwd_confirm" 
                                        required 
                                        placeholder=" "
                                        value={registrationInfo.pwd_confirm}
                                        onChange={handleRegChange}
                                    />
                                    <label className="labelline" htmlFor="reg-pwd_confirm">Vahvista Salasana</label>
                                </div> 
                                <div className="tos">
                                    <input 
                                        className="tos-check" 
                                        id="tos-check" 
                                        type="checkbox" 
                                        value={registrationInfo.tos}
                                        onChange={handleRegChange}
                                    />  
                                    <label htmlFor="tos-check" >Hyväksyn ehdot</label>
                                </div>
                                <div className="submit-container">
                                    <button className="sub"  type="submit" value="Luo käyttäjä">Luo Käyttäjä</button>
                                </div>  
                            </form>
                        </div>
                        <div className="additional-options">
                      
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>     
    );
}

export default Login;