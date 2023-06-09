/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/heading-has-content */
import "../../../css/AddItem.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useItemsContext } from "../../../context/context";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";

const AddItem = () => {
  const navigate = useNavigate();
  const nameInputRef = useRef();
  const locationInputRef = useRef();
  const [files, setFiles] = useState("");
  const [uploaded, setUploaded] = useState(null);
  const {
    controller,
    name,
    location,
    setName,
    setLocation,
    setIsLoading,
    isLoading
  } = useItemsContext();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleChange = event => {
    setFiles(event.target.files);
  };

  const handleToastMessage = () => {
    toast.success('✅', {
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

  const handleToastMessageFail = () => {
    toast.error("Files Missing", {
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

  const nameHandler = e => {
    setName(e.target.value);
  };

  const locationHandler = e => {
    setLocation(e.target.value);
  };

  const handleUpload = async e => {
    e.preventDefault();
    if (localStorage.getItem("token").length < 10) {
      navigate("/login");
    }else if (files.length < 4) {
      handleToastMessageFail();
    }else{
      const formData = new FormData();

      formData.append("name", name);
      formData.append("location", location);

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      const user = JSON.parse(localStorage.getItem("user"));

      console.log(...formData);

      setIsLoading(true);

      axios.post('https://lost-and-found-server-5v26.onrender.com/uploads', formData, {
        onUploadProgress: (data) => {
          setUploaded(Math.round((data.loaded / data.total) * 100));
        },
      })
      .then((success) => {
        controller.model.addItem({
          name: name,
          location: location,
          userId: user.id
        });
        const items = JSON.parse(localStorage.getItem("items"));
        items.push({
          name: name,
          location: location,
          userId: user.id
        });
        localStorage.setItem("items", JSON.stringify(items));
        setIsLoading(false);
        handleToastMessage();
      })
      .catch((error) => {
        setIsLoading(false);
        handleToastMessageFail();
      });
    }
  };

  return (
    <div className="add-item">
      <ToastContainer />
      <h1 className="add-item" />
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
            <input
              ref={nameInputRef}
              name="name"
              id="name"
              onChange={nameHandler}
              type="text"
              placeholder="Name"
            />
            <input
              ref={locationInputRef}
              name="location"
              id="location"
              onChange={locationHandler}
              type="text"
              placeholder="Location"
            />
            <input
              name="file"
              id="files"
              onChange={handleChange}
              type="file"
              multiple
            />
            <button onClick={handleUpload} className="add-btn">
              save
            </button>
          </form>
        </div>}
        {
        uploaded && 
        <div className="progress mt-2"
        style={{textAlign: 'center',border: '3px solid #2991EA', width: '60%', height: '2.6rem'}}
        >
          <div className="progress-bar" 
          role='progressbar'
          aria-valuenow={uploaded}
          aria-valuemin='0'
          aria-valuemax='100'
          style={{height: '2rem', background: '#2991EA', color: 'white', width: `${uploaded}%`}}>
            {`${uploaded}%`}
          
          </div>

        </div>
        
        }
    </div>
  );
};

export default AddItem;
