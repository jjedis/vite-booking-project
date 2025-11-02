import { useState } from "react";
import type {ChangeEvent, FormEvent} from "react";
import "..contact-info.css";

function BookingInfo(){

    const [isNewCustomer, setIsNewCustomer] = useState(true);

    const [customerInfo, setCustomerInfo] = useState({
        etunimi: "",
        sukunimi: "",
        puh:"",
        sahkoposti:"",
        osoite:"",
        postinumero:"",
        toimipaikka:"",
        lisatietoja:"",

    });

    const [loginInfo, setLoginInfo] = useState({
        sposti2:"",
        pwdLogin:"",
    });

    const handleCustomerChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setCustomerInfo(prev => ({ ...prev, [name]: value}));
    };

    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLoginInfo(prev => ({ ...prev, [name]: value}));
    };

    const handleCustomerSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Customer info:", customerInfo);
    };

    const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Login info:", loginInfo);    
    }


    return (
        <>
            <div className="main-container">
                <div className="page-container">
                    <div className="booking-info-container">
                        <div className="container-header">
                            <h2>Olet varaamassa</h2>
                        </div>
                        <div className="booking-info">
                            <div className="info-row">
                                <h4 className="info-row-left">Hieronta</h4>
                                <h4 className="info-row-right">60min</h4>
                            </div>
                            <div className="info-row">
                                <h4 className="info-row-left">Päivä</h4>
                                <h4 className="info-row-right">18.syyskuuta 2025</h4>
                            </div>
                            <div className="info-row">
                                <h4 className="info-row-left">Aika</h4>
                                <h4 className="info-row-right">9:00-10:00</h4>
                            </div>
                        </div>

                    </div>
                    <div className="group-container">
                        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                            <input 
                                type="radio" 
                                className="btn-check" 
                                name="btnradio" 
                                id="btnradio1" 
                                autoComplete="off" 
                                checked={isNewCustomer} 
                                onChange={() => setIsNewCustomer(true)}
                                />
                            <label className="btn btn-outline-custom" htmlFor="btnradio1">Uusi asiakas</label>

                            <input 
                                type="radio" 
                                className="btn-check" 
                                name="btnradio" 
                                id="btnradio2" 
                                autoComplete="off" 
                                checked={!isNewCustomer} 
                                onChange={() => setIsNewCustomer(false)}
                                />
                            <label className="btn btn-outline-custom" htmlFor="btnradio2">Kirjaudu</label>
                        </div>
                    </div>
                    {isNewCustomer ? (
                    <div className="info-container">
                        <div className="container-header">                
                            <h2>Asiakastiedot</h2>               
                        </div>
                        <div className="customer-info">
                            <form className="form-info" onSubmit={handleCustomerSubmit}>   
                                <div className="input-group">         
                                    <input 
                                        type="text" 
                                        id="etunimi" 
                                        name="etunimi" 
                                        required 
                                        placeholder=" "
                                        value={customerInfo.etunimi}
                                        onChange={handleCustomerChange}
                                    />
                                    <label className="labelline" htmlFor="etunimi">Etunimi</label>  
                                </div>
                                <div className="input-group">               
                                    <input 
                                        type="text"     
                                        id="sukunimi" 
                                        name="sukunimi" 
                                        required 
                                        placeholder=" "
                                        value={customerInfo.sukunimi}
                                        onChange={handleCustomerChange}
                                    />
                                    <label className="labelline" htmlFor="sukunimi">Sukunimi</label>
                                </div>  
                                <div className="input-group">               
                                    <input 
                                        type="tel" 
                                        id="puh" 
                                        name="puh" 
                                        required 
                                        placeholder=" "
                                        value={customerInfo.puh}
                                        onChange={handleCustomerChange}
                                    />
                                    <label className="labelline" htmlFor="puh">Puhelinnumero</label>
                                </div> 
                                <div className="input-group">       
                                    <input 
                                        type="email" 
                                        id="sahkoposti" 
                                        name="sahkoposti" 
                                        required 
                                        placeholder=" "
                                        value={customerInfo.sahkoposti}
                                        onChange={handleCustomerChange}
                                    />
                                    <label className="labelline" htmlFor="sahkoposti">Sähköposti</label>
                                </div> 
                                <div className="input-group" id="osoite-col"> 
                                    <input 
                                        type="text" 
                                        id="osoite" 
                                        name="osoite" 
                                        required 
                                        placeholder=" "
                                        value={customerInfo.osoite}
                                        onChange={handleCustomerChange}
                                    />
                                    <label className="labelline" htmlFor="osoite">Katuosoite</label>
                                </div> 
                                <div className="input-group">               
                                    <input 
                                        type="number" 
                                        id="postinumero" 
                                        name="postinumero" 
                                        required 
                                        placeholder=" "
                                        value={customerInfo.postinumero}
                                        onChange={handleCustomerChange}
                                    />
                                    <label className="labelline" htmlFor="postinumero">Postinumero</label>
                                </div> 
                                <div className="input-group">              
                                    <input 
                                        type="text" 
                                        id="toimipaikka" 
                                        name="toimipaikka" 
                                        required 
                                        placeholder=" "
                                        value={customerInfo.toimipaikka}
                                        onChange={handleCustomerChange}
                                    />
                                    <label className="labelline" htmlFor="toimipaikka">Toimipaikka</label>
                                </div> 
                                <div className="input-group" id="add-info-col">   
                                    <label className="label-textarea" htmlFor="lisatietoja">Lisätietoja</label>        
                                    <textarea 
                                        name="additional-info" 
                                        id="lisatietoja"
                                        value={customerInfo.lisatietoja}
                                        onChange={handleCustomerChange}
                                    />
                                            
                                </div>                  
                                <div className="submit-container">
                                    <button className="sub"  type="submit">Varaa aika</button>
                                </div>       
                            </form>
                        </div>
                    </div>
                    ) : (
                    <div className="login-container">
                        <div className="container-header">                
                            <h2>Kirjaudu</h2>               
                        </div>

                        <div className="login-form-container">
                            <form onSubmit={handleLoginSubmit}>
                                <div className="input-group">         
                                    <input 
                                        type="email" 
                                        id="sposti2" 
                                        name="sposti2" 
                                        required 
                                        placeholder=" "
                                        value={loginInfo.sposti2}
                                        onChange={handleLoginChange}
                                    />
                                    <label className="labelline" htmlFor="sposti2">Sähköposti</label>  
                                </div>
                                <div className="input-group">               
                                    <input 
                                        type="password" 
                                        id="pwd-login" 
                                        name="pwd-login" 
                                        required 
                                        placeholder=" "
                                        value={loginInfo.pwdLogin}
                                        onChange={handleLoginChange}
                                    />
                                    <label className="labelline" htmlFor="pwd-login">Salasana</label>
                                </div>  
                                <div className="submit-container">
                                    <button className="sub"  type="submit">Kirjaudu</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default BookingInfo;
