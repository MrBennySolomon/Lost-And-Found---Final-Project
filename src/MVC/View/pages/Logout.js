/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify([]));
    localStorage.setItem('token', JSON.stringify(''));
    localStorage.setItem('user', JSON.stringify({}));
    localStorage.setItem('allItems', JSON.stringify([]));
    navigate('/');
  }, []);
  
  return <div>Logout</div>;
};

export default Logout;
