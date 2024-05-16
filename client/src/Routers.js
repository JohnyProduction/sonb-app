import React from "react";
import {Route,Routes} from "react-router-dom";

import Login from "./pages/Login/Login";
import Contact from "./pages/Contact/Contact";
import Service from "./pages/Service/Service"
export default function Routers(){
    return(
        <Routes>
            <Route exact path="/Login" Component={Login}/>
            <Route exact path="/Contact" Component={Contact} />
            <Route exact path="/Service" Component={Service} />
        </Routes>
    );
}