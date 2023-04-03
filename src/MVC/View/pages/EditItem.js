/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
import "../../../css/EditItem.css";
import "../../../css/loader.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { useItemsContext } from "../../../context/context";

const EditItem = () => {
  const navigate = useNavigate();
  const {
    controller,
    items,
    setItems,
    isLoading,
    setIsLoading
  } = useItemsContext();
  const nameRef = useRef();
  const locationRef = useRef();

  const fetchItems = async () => {
    setIsLoading(true);
    const response = await controller.model.getAllItems();
    setItems(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const editHandler = e => {
    const id = e.target.getAttribute("id");
    const name = nameRef.current.value;
    const location = locationRef.current.value;
    controller.model.editItem({ name: name, location: location }, id);
    navigate("/");
  };

  return (
    <div className="edit">
      <h1>
        {isLoading &&
          <div className="loader">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>}
      </h1>
      {!isLoading &&
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 &&
            items.map(item =>
              <tr key={item.id}>
                <td>
                  <input ref={nameRef} type="text" placeholder={item.name} />
                </td>
                <td>
                  <input
                    ref={locationRef}
                    type="text"
                    placeholder={item.location}
                  />
                </td>
                <td className="action" id={item.id} onClick={editHandler}>
                  EDIT
                </td>
              </tr>
            )}
        </tbody>
      </table>}
    </div>
  );
};

export default EditItem;
