import ItemsDB from "./ItemsDB";

class Model {
  constructor() {
    this.itemsDB = ItemsDB;
  }

  addItem = (item) => {
    this.itemsDB.addItem(item);
  }

  getAllItems = () => {
    return this.itemsDB.getAllItems();
  }

  deleteItem = (id) => {
    this.itemsDB.removeItem(id);
  }

  editItem = (newItem, id) => {
    this.itemsDB.editItem(newItem, id);
  }

}

export default Model;
