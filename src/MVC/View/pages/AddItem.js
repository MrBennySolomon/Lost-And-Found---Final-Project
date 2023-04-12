/* eslint-disable jsx-a11y/heading-has-content */
import "../../../css/AddItem.css";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useItemsContext } from "../../../context/context";

const AddItem = () => {
  const [files, setFiles] = useState("");

  // const [percent, setPercent] = useState(0);
  const navigate = useNavigate();
  const {
    controller,
    name,
    location,
    setName,
    setLocation,
    setIsLoading,
    isLoading
  } = useItemsContext();

  const handleChange = (event) => {
    setFiles(event.target.files);
  }

  const nameHandler = e => {
    setName(e.target.value);
  };

  const locationHandler = e => {
    setLocation(e.target.value);
  };

  const handleUpload = (e) => {
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
    .then(data => {
      setIsLoading(false);
      controller.model.addItem({
        name,
        location
      });
      console.log(data);
      navigate('/');
    });
  }

  return (
    <div className="add-item">
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
