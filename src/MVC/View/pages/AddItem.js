/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/heading-has-content */
import                                   '../../../css/AddItem.css';
import                                   'react-toastify/dist/ReactToastify.css';
import React, {useEffect, useState} from 'react';
import { useItemsContext }          from '../../../context/context';
import { ToastContainer, toast }    from 'react-toastify';

import axios from 'axios';

const AddItem = () => {
  const [files, setFiles] = useState("");
  const {
    controller,
    name,
    location,
    setName,
    setLocation,
    setIsLoading,
    isLoading,
  } = useItemsContext();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleChange = (event) => {
    setFiles(event.target.files);
  }

  const handleToastMessage = () => {
    toast.success('Item added', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
      style: {
        backgroundColor: '#4CAF50',
        color: '#ffffff',
        fontSize: '2rem',
        textAlign: 'center',
      }
    });
  }
  
  const nameHandler = e => {
    setName(e.target.value);
  };

  const locationHandler = e => {
    setLocation(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    console.log(...formData);
    setIsLoading(true);
    fetch('https://lost-and-found-server-5v26.onrender.com/uploads', {
      method: 'POST' ,
      body: formData,
    })
    .then(res => res.json())
    .then(async data => {
      
      controller.model.addItem({
        name,
        location
      });

      try {
        // Create the request payload
        const payload = {
          name: name,
          location: location,
        };
  
        // Send the request to the server
        const response = await axios.post('localhost:5000/users', payload, {
          headers: {
            Authorization: `Bearer ${JSON.stringify(localStorage.getItem('token'))}}`,
          },
        });
  
        // Show a success message
        handleToastMessage();
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }

      
    });
    setIsLoading(false);
    handleToastMessage();
  }

  return (
    
    <div className="add-item">
      <ToastContainer/>
      <h1 className="add-item"/>
      {isLoading &&
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>}
      {!isLoading &&
      <div className="inputs-div">
        <form>
          <input name="name" id="name" onChange={nameHandler} type="text" placeholder="Name" />
          <input name="location" id="location" onChange={locationHandler} type="text" placeholder="Location" />
          <input name="file" id="files" onChange={handleChange} type="file" multiple/>
          <button onClick={handleUpload} className="add-btn">save</button>
        </form>
      </div>}
      
    </div>

  );
};

export default AddItem;
