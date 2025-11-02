import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Etusivu from "./pages/Home";
import Palvelut from "./pages/Palvelut";
import Ajanvaraus from "./pages/Ajanvaraus";
import Yhteystiedot from "./pages/Yhteystiedot";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children: [
            {index: true, element: <Etusivu/>},
            {path:"palvelut", element:<Palvelut/>},
            {path:"ajanvaraus", element:<Ajanvaraus/>},
            {path:"yhteystiedot", element:<Yhteystiedot/>},
        ],
    },
]);

