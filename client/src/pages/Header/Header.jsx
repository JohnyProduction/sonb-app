import React from "react";
import "../Header/header.css";

export default function Header() {
  const isUserLoggedIn = () => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === "isLogged" && cookie[1] === "true") {
        return true;
      }
    }
    return false;
  };
  const handleLogout = () => {
    document.cookie =
      "isLogged=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace("/");
  };

  return (
    <header className="header">
      <nav>
        
          

          <div>
            {isUserLoggedIn() ? (
              <ul>
              <li>
            <a href="/">Home</a>
          </li>
                <li>
                  <a href="/Service">Service</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
                <li>
                  <button className="signIn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
                </ul>
             
            ) : (
              <ul>
              <li>
                <a href="/login">
                  <button className="signIn">Sign in</button>
                </a>
              </li>
              </ul>
            )}
          </div>
      </nav>
    </header>
  );
}
