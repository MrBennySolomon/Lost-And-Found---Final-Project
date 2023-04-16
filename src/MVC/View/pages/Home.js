import            '../../../css/Home.css';
import React from 'react';

const Home = () => {
  if (!localStorage.getItem('items')) {
    localStorage.setItem('items', JSON.stringify([]));
  }
  if (!localStorage.getItem('token')) {
    localStorage.setItem('token', JSON.stringify(''));
  }
  if (!localStorage.getItem('user')) {
    localStorage.setItem('user', JSON.stringify({}));
  }
  if (!localStorage.getItem('allItems')) {
    localStorage.setItem('allItems', JSON.stringify([]));
  }
  return <div className="home">HOME</div>;
};

export default Home;
