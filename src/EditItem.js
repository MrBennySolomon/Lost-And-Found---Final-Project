import React, { useEffect, useState, useRef } from "react";
import "./EditItem.css";

const EditItem = ({ controller }) => {
  const [items, setItems] = useState([]);
  const nameRef = useRef();
  const locationRef= useRef();

  const fetchItems = async () => {
    const response = await controller.model.getAllItems();
    setItems(response.data);
  };

  useEffect(() => {
    fetchItems(); 
  }, []);

  const editHandler = (e) => {
    const id = e.target.getAttribute("id");
    const name = nameRef.current.value;
    const location = locationRef.current.value;

    controller.model.editItem({
      name,
      location
    }, id);
    fetchItems();
  };

  return (
    <div className="edit">
      <h1>EditItem</h1>
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
                  <input ref={nameRef} type="text" placeholder={item.name}/>
                </td>
                <td>
                  <input ref={locationRef} type="text"  placeholder={item.location}/>
                </td>
                <td className="action" id={item.id} onClick={editHandler}>
                  EDIT
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
};

export default EditItem;
