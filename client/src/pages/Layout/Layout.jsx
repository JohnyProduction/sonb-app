import React from 'react';
import Header from '../Header/Header';
import '../Layout/layout.css';

export default function Layout() {
    const handleButtonClick = () => {
        fetch('http://localhost:3333/users')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error fetching users:', error));
    };

    return (
        <>
            <Header />
            <button onClick={handleButtonClick}>Fetch Users</button>
        </>
    );
}
