import React from "react";
import "../Header/header.css";

export default function Header() {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/services">Services</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <div>
          <a href="/signin"><button className="signIn">Sign in</button></a>
          </div>
        </ul>
        
      </nav>
    </header>
  );
}
