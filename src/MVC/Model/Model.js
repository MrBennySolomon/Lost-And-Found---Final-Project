import ItemsDB from "./ItemsDB";
import UsersDB from "./UsersDB";

class Model {
  constructor() {
    this.itemsDB = ItemsDB;
    this.usersDB = UsersDB;
  }

  addItem = item => {
    this.itemsDB.addItem(item);
  };

  getAllItems = () => {
    return this.itemsDB.getAllItems();
  };

  deleteItem = id => {
    this.itemsDB.removeItem(id);
  };

  editItem = (newItem, id) => {
    this.itemsDB.editItem(newItem, id);
  };

  addUser = (user) => {
    this.usersDB.addUser(user);
  };

  getAllUsers = () => {
    return this.usersDB.getAllUsers();
  };

  deleteUser = (id) => {
    this.usersDB.removeUser(id);
  };

  editUser = (items, id) => {
    this.usersDB.editUser(items, id);
  };

  loginUser = (email, password) => {
    return this.usersDB.loginUser(email, password);
  };

  registerUser = (email, password) => {
    return this.usersDB.registerUser(email, password);
  };
}

export default Model;
