import React          from 'react';
import { Outlet }     from 'react-router-dom';
import MainNavigation from './MainNavigation';
import Footer         from './Footer';

const Root = () => {
  return (
    <div>
      <MainNavigation/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Root;