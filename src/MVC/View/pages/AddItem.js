/* eslint-disable jsx-a11y/heading-has-content */
import "../../../css/AddItem.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useItemsContext } from "../../../context/context";

const AddItem = () => {
  const navigate = useNavigate();
  const {
    controller,
    name,
    location,
    setName,
    setLocation
  } = useItemsContext();

  const addHandler = e => {
    e.preventDefault();
    controller.model.addItem({
      name,
      location
    });
    navigate("/");
  };

  const nameHandler = e => {
    setName(e.target.value);
  };

  const locationHandler = e => {
    setLocation(e.target.value);
  };

  return (
    <div className="add-item">
      <h1 className="add-item"/>
      <div className="inputs-div">
        <input onChange={nameHandler} type="text" placeholder="Name" />
        <input onChange={locationHandler} type="text" placeholder="Location" />
        <button onClick={addHandler} className="add-btn">
          submit
        </button>
      </div>
    </div>
  );
};

export default AddItem;
