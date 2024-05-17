import React from 'react';
import Header from '../Header/Header';
import ToastDisplay from '../../components/ToastDisplay/ToastDisplay';
import '../Layout/layout.css';

export default function Layout (){
    return (
        <>
          <Header />
          <ToastDisplay/>
          </>
      );
}
