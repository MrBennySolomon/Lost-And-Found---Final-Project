/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/heading-has-content */
import "../../../css/Login.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useItemsContext } from "../../../context/context";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const {
    controller,
    setIsLoading,
    isLoading,
    email,
    setEmail,
    password,
    setPassword
  } = useItemsContext();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const emailInput = e => {
    setEmail(e.target.value);
  };

  const passwordInput = e => {
    setPassword(e.target.value);
  };

  const handleToastMessageSuccess = () => {
    toast.success('Login Success', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
      style: {
        backgroundColor: 'rgba(26,182,27, 0.5)',
        color: '#07BC0C',
        fontSize: '2rem',
        textAlign: 'center',
        fontWeight: "bold"
      }
    });
  };

  const handleToastMessage = () => {
    toast.error("Try Again", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
      style: {
        backgroundColor: 'rgba(225,35,31, 0.5)',
        color: "#E74C3C",
        fontSize: "2rem",
        textAlign: "center",
        fontWeight: "bold"
      }
    });
  };

  const formSubmit = async e => {
    e.preventDefault();
    const success = await controller.model.loginUser(email, password);
    if (success) {
      const allItems = await controller.model.getAllItems();
      localStorage.setItem("allItems", JSON.stringify(allItems.data));
      const items = JSON.parse(localStorage.getItem('allItems'));
      const user = JSON.parse(localStorage.getItem('user'));
      const filtered = items.filter(item => item.userId === user.id);
      localStorage.setItem('items', JSON.stringify(filtered));
      handleToastMessageSuccess();
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      handleToastMessage();
    }
  };

  return (
    <div className="login">
      <ToastContainer />
      <h1 className="login" />
      {isLoading &&
        <div className="loader">
          <span />
          <span />
          <span />
          <span />
        </div>}
      {!isLoading &&
        <div className="inputs-div">
          <form>
            <input onChange={emailInput} type="email" placeholder="Email" />
            <input
              onChange={passwordInput}
              type="password"
              placeholder="Password"
            />
            <button onClick={formSubmit} className="add-btn">
              Login
            </button>
          </form>
        </div>}
    </div>
  );
};

export default Login;
