import axios from "axios";

const ItemsDB = {
  items: axios.create({
    baseURL:
      "https://tame-gold-goat-belt.cyclic.app/items", 
  }),

  async removeItem(id) {
  this.items
      .delete(`/${id}`)
      .then((response) => {
        console.log(`Item id ${id} was deleted successfully`);
        return "Item Was Deleted!";
      })
      .catch((error) => {
        return "Error while deleting item";
      });
  },

  async getItem(id) {
    this.items
      .get(`/${id}`)
      .then((response) => {
        console.log(`Item id ${id} was fetch successfully`);
        return response.data;
      })
      .catch((error) => {
        return `Error while fetching item id: ${id}`;
      });
  },

  async getAllItems() {
    try {
      const response = await this.items.get("");
      if (response.status !== 200) {
        console.error("cant get items from the api");
        return;
      }
      return response.data;
    } catch (error) {
      console.error("Error getting items", error);
    }
  },

  async addItem(newItem) {
    this.items
      .post("", newItem)
      .then((response) => {
        console.log("Item was added successfully");
      })
      .catch((error) => {
        console.error("Error adding item", error);
      });
  },
  
  async editItem(updatedData, id) {
    this.items
      .put(`/${id}`, updatedData)
      .then((response) => {
        console.log("Item updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  },
};

  export default ItemsDB;