import React from 'react';
import Header from '../Header/Header';
import '../Layout/layout.css';

export default function Layout ({children}){
    return (
        <>
          <Header />
          {children}
         
        </>
      );
}
