import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Etusivu from "./pages/Kotisivu";
import Palvelut from "./pages/Palvelut";
import Yhteystiedot from "./pages/Yhteystiedot";
import Login from "./pages/Login";
import Ajanvaraus  from "./pages/Varaus";
import BookingInfo from "./pages/Varaustiedot";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children: [
            {index: true, element: <Etusivu/>},
            {path:"palvelut", element:<Palvelut/>},
            {path:"ajanvaraus", element:<Ajanvaraus/>},
            {path:"yhteystiedot", element:<Yhteystiedot/>},
            {path:"login", element:<Login/>},
            {path:"varaustiedot", element:<BookingInfo/>}
        ],
    },
]);

