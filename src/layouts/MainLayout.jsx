import React from 'react';
import { Outlet } from 'react-router-dom';
import './mainLayout.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div >
      <header>
        <NavBar></NavBar>
        </header>
      <main className='container__main'>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default MainLayout;
