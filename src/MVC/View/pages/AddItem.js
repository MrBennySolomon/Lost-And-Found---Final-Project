/* eslint-disable jsx-a11y/heading-has-content */
import "../../../css/AddItem.css";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useItemsContext } from "../../../context/context";
// import { getStorage } from "firebase/storage";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import axios from 'axios';
// import storage from "../../Model/firebaseConfig";
const AddItem = () => {
  const [files, setFiles] = useState("");

  // const [percent, setPercent] = useState(0);
  const navigate = useNavigate();
  const {
    controller,
    name,
    location,
    setName,
    setLocation
  } = useItemsContext();

  const handleChange = (event) => {
    setFiles(event.target.files);
  }

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

  const handleUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    console.log(...formData);

    fetch('http://127.0.0.1:5000/uploads', {
      method: 'POST' ,
      body: formData,
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }

  return (
    <div className="add-item">
      <h1 className="add-item"/>
      <div className="inputs-div">
        <form onSubmit={addHandler}>
          <input name="name" id="name" onChange={nameHandler} type="text" placeholder="Name" />
          <input name="location" id="location" onChange={locationHandler} type="text" placeholder="Location" />
          <input name="file" id="files" onChange={handleChange} type="file" multiple/>
          <button onClick={handleUpload} className="add-btn">upload</button>
            {/* <p>{percent}%</p> */}
          <button type="submit" className="add-btn">submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
