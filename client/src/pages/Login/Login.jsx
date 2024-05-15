import React, { useState } from "react";
import ReCaptcha from "../../components/reCaptcha/recaptcha";
import "./Login.css";

export default function Login() {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [recaptchaVerify,setRecaptchaVerify] = useState();
  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };


  const handleSubmitSignUp = async (event) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);

    // Convert form data to JSON
    const signUpData = {};
    formData.forEach((value, key) => {
      signUpData[key] = value;
    });

    // Add ReCaptcha value to the signUpData
    signUpData.recaptchaVerify = recaptchaVerify;

    try {
      // Send sign-up data to API
      const response = await fetch("http://localhost:3333/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      if (response.ok) {
        console.log("User registered successfully");
      } else {
        console.error("Failed to register user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmitSignIn = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const signInData = {};
    formData.forEach((value, key) => {
      signInData[key] = value;
    });

    try {
      const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
      });
      if (response.ok) {
        console.log("Login successful");
        
      } else {
        console.error("Failed to login");
        // Handle error
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };








  return (
    <>
      {recaptchaVerify ? <div>asdasd</div> : <></>}
      <div
        className={`container ${isSignUpActive ? "right-panel-active" : ""}`}
      >
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmitSignUp}>
            <h1>Create Account</h1>
            <input type="text" name="name" placeholder="Name"  required/>
            <input type="email" name="email" placeholder="Email" required/>
            <input type="password" name="password" placeholder="Password" required />
            <ReCaptcha value={recaptchaVerify} setValue={setRecaptchaVerify} />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmitSignIn}>
            <h1>Sign in</h1>
            <input type="email" name="email" placeholder="Email" required/>
            <input type="password" name="password" placeholder="Password" required/>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}