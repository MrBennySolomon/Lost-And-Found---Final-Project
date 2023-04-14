import axios from 'axios';

const UsersDB = {
  items: axios.create({
    // baseURL: "https://lost-and-found-server-5v26.onrender.com"
    baseURL: "localhost:5000"
  }),

  async removeUser(id) {
    this.users
      .delete(`/users/${id}`)
      .then(response => {
        console.log(`User id ${id} was deleted successfully`);
        return "User Was Deleted!";
      })
      .catch(error => {
        return "Error while deleting user";
      });
  },

  async getUser(id) {
    this.users
      .get(`/users/${id}`)
      .then(response => {
        console.log(`User id ${id} was fetch successfully`);
        return response.data;
      })
      .catch(error => {
        return `Error while fetching user id: ${id}`;
      });
  },

  async getAllUsers() {
    try {
      const response = await this.users.get("/users");
      if (response.status !== 200) {
        console.error("cant get users from the api");
        return;
      }
      return response.data;
    } catch (error) {
      console.error("Error getting users", error);
    }
  },

  async addUser(newUser) {
    this.users
      .post("/users", newUser)
      .then(response => {
        console.log("User was added successfully");
      })
      .catch(error => {
        console.error("Error adding user", error);
      });
  },

  async editUser(updatedData, id) {
    this.users
      .put(`/users/${id}`, updatedData)
      .then(response => {
        console.log("User updated successfully:", response.data);
      })
      .catch(error => {
        console.error("Error updating user:", error);
      });
  },
  async loginUser(email, password) {
    try {
      const res = await axios.post("http://127.0.0.1:5000/auth/login",{
        email: email,
        password: password
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }catch (error) {
      console.error("cannot login:", error);
    }
  },
  async registerUser(email, password) {
    try {
      const res = await axios.post("http://127.0.0.1:5000/auth/register",{
        email: email,
        password: password
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }catch (error) {
      console.error("cannot register:", error);
    }
  }
};

export default UsersDB;
