/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useItemsContext } from "../../../context/context";

const Logout = () => {
  const {setIsUserLoggedIn} = useItemsContext();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify([]));
    localStorage.setItem('token', JSON.stringify(''));
    localStorage.setItem('user', JSON.stringify({}));
    localStorage.setItem('allItems', JSON.stringify([]));
    setIsUserLoggedIn(false);
    navigate('/');
  }, []);
  
  return <div>Logout</div>;
};

export default Logout;
