import React from "react";
import {Route,Routes,useLocation} from "react-router-dom";

import Login from "./pages/Login/Login";
import Contact from "./pages/Contact/Contact";
export default function Routers(){
    return(
        <Routes>
            <Route exact path="/Login" Component={Login}/>
            <Route exact path="/Contact" Component={Contact} />
        </Routes>
    );
}