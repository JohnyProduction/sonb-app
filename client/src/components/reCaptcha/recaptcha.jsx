import React, { useState } from 'react';
import './recaptcha.css'
export default function ReCaptcha({value,setValue}){
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
        setInputValue(event.target.value);
        setIsVerified(event.target.value === verificationCode);
        setValue(isVerified);
    };
/*
    const handleRefresh = () => {
        setVerificationCode(generateRandomCode());
        setInputValue('');
        setIsVerified(false);
        setValue(false);
    };*/
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
            {/*<button onClick={handleRefresh}>Refresh</button>*/}
            <br />
            {isVerified && <p>Verification successful!</p>}
        </div>
    );
}