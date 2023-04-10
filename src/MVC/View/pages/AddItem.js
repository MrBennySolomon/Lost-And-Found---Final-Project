/* eslint-disable jsx-a11y/heading-has-content */
import "../../../css/AddItem.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useItemsContext } from "../../../context/context";
import { getStorage } from "firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import storage from "../../Model/firebaseConfig";
const AddItem = () => {
  const [file, setFile] = useState("");

  const [percent, setPercent] = useState(0);
  const navigate = useNavigate();
  const {
    controller,
    name,
    location,
    setName,
    setLocation
  } = useItemsContext();

  const handleChange = (event) => {
    setFile(event.target.files[0]);
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

  const handleUpload = () => {
    if (!file) {
      alert("Please choose a file first!")
    }

    // Initialize Firebase Storage service
    const storage = getStorage();
    
    const storageRef = ref(storage, `${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",(snapshot) => {
      const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      // update progress
      setPercent(percent);
      },
      (err) => console.log(err),() => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        localStorage.setItem(file.name, url)
        console.log(url);
      });

    }); 
  }

  return (
    <div className="add-item">
      <h1 className="add-item"/>
      <div className="inputs-div">
        <input onChange={nameHandler} type="text" placeholder="Name" />
        <input onChange={locationHandler} type="text" placeholder="Location" />
          <input type="file" onChange={handleChange} accept=".unityweb, .js" />
          <button onClick={handleUpload} className="add-btn">upload</button>
          <p>{percent}%</p>
        <button onClick={addHandler} className="add-btn">submit</button>
      </div>
    </div>
  );
};

export default AddItem;
