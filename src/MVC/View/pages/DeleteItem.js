/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
import "../../../css/DeleteItem.css";
import "../../../css/loader.css";
import React, { useEffect } from "react";
import { useItemsContext } from "../../../context/context";

const DeleteItem = () => {
  const {
    controller,
    items,
    setItems,
    isLoading,
    setIsLoading
  } = useItemsContext();

  const fetchItems = async () => {
    setIsLoading(true);
    const response = await controller.model.getAllItems();
    console.log('response.data', response.data);
    setItems(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteHandler = e => {
    const id = e.target.getAttribute("id");
    controller.model.deleteItem(id);
    fetchItems();
  };

  return (
    <div className="delete">
      <h1 className="delete-item"/>
      {isLoading &&
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>}
      {!isLoading &&
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 &&
              items.map(item =>
                <tr key={item.id}>
                  <td>
                    {item.name}
                  </td>
                  <td className="action" id={item.id} onClick={deleteHandler}>
                    X
                  </td>
                </tr>
              )}
          </tbody>
        </table>}
    </div>
  );
};

export default DeleteItem;
