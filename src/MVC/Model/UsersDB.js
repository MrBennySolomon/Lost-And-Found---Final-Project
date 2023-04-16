import axios from 'axios';

const UsersDB = {
  users: axios.create({
    baseURL: "https://localhost:5000/users"
  }),

  async removeUser(id) {
    this.users
      .delete(`/${id}`)
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
      .get(`/${id}`)
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
      const response = await this.users.get("");
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
      .post("", newUser)
      .then(response => {
        console.log("User was added successfully");
      })
      .catch(error => {
        console.error("Error adding user", error);
      });
  },

  async editUser(items, id) {
    try {
      const response = await axios.put(`/${id}`, items);
      if (response.status !== 200) {
        console.error("cant update user");
        return;
      }
      return response.data;
    } catch (error) {
      console.error("Error edit user", error);
    }
  },

  async loginUser(email, password) {
    try {
      const res = await axios.post("https://localhost:5000/auth/login",{
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
      const res = await axios.post("https://localhost:5000/auth/register",{
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
