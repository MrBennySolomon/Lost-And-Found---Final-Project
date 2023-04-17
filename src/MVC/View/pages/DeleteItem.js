/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
import "../../../css/DeleteItem.css";
import "../../../css/loader.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import { useItemsContext } from "../../../context/context";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeleteItem = () => {
  const navigate = useNavigate();
  const {
    controller,
    items,
    setItems,
    isLoading,
    setIsLoading
  } = useItemsContext();

  const fetchItems = async () => {
    setIsLoading(true);
    const totalItems = JSON.parse(localStorage.getItem("items"));
    setItems(totalItems);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleToastMessage = () => {
    toast.success("✅", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
      style: {
        backgroundColor: "rgba(26,182,27, 0.5)",
        color: "#07BC0C",
        fontSize: "2rem",
        textAlign: "center",
        fontWeight: "bold"
      }
    });
  };

  const deleteHandler = e => {
    e.preventDefault();

    if (localStorage.getItem("token").length < 10) {
      navigate("/login");
    } else {
      const name = e.target.getAttribute("name");
      const id = e.target.getAttribute("id");

      const formData = new FormData();
      formData.append("name", name);

      fetch("https://lost-and-found-server-5v26.onrender.com/uploads", {
        method: "DELETE",
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
      console.log('id', id);
      controller.model.deleteItem(id);
      // Remove the deleted item from the state
      const filtered = items.filter(item => item.name !== name);
      setItems(filtered);
      // const user = JSON.parse(localStorage.getItem('user'));
      // user.items = filtered;
      localStorage.setItem("items", JSON.stringify(filtered));
      // controller.model.editUser(user.items, user.id);
      setIsLoading(false);
      handleToastMessage();
    }
  };

  return (
    <div className="delete">
      <ToastContainer />
      <h1 className="delete-item" />
      {isLoading &&
        <div className="loader">
          <span />
          <span />
          <span />
          <span />
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
            {items &&
              items.map(item =>
                <tr key={item.name}>
                  <td>
                    {item.name}
                  </td>
                  <td
                    className="action"
                    name={item.name}
                    id={item.id}
                    onClick={deleteHandler}
                  >
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
