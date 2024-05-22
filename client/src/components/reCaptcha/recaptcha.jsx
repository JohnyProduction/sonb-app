import React, { useState, forwardRef, useImperativeHandle } from 'react';
import './recaptcha.css';

const ReCaptcha = forwardRef(({ value, setValue }, ref) => {
  const [inputValue, setInputValue] = useState('');
  const [verificationCode, setVerificationCode] = useState(generateRandomCode());
  const [isVerified, setIsVerified] = useState(false);

  function generateRandomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    const verified = value === verificationCode;
    setIsVerified(verified);
    setValue(verified);
  };

  const refreshCaptcha = () => {
    setVerificationCode(generateRandomCode());
    setInputValue('');
    setIsVerified(false);
    setValue(false);
  };

  useImperativeHandle(ref, () => ({
    refreshCaptcha,
  }));

  return (
    <div>
      <label>
        Please enter the characters you see below:
        <br />
        <span className='recaptcha-code'>{verificationCode}</span>
        <br />
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
        />
      </label>
      <br />
      {isVerified && <p>Verification successful!</p>}
    </div>
  );
});

export default ReCaptcha;
