import            '../../../css/Home.css';
import React from 'react';

const Home = () => {
  if (!localStorage.getItem('items')) {
    localStorage.setItem('items', JSON.stringify([]));
  }
  return <div className="home">HOME</div>;
};

export default Home;
