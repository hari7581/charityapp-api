const { UserDAO } = require("./user-dao");
const userDAO = new UserDAO();

class UserService {
  async getAllUsers() {
    return userDAO.getAllUsers();
  }
  async login(email, password){
    let user = await userDAO.login(email,password);
    if(user == null){
        throw new Error("Invalid Login Credentials");
    }
    return user;
}

  async searchUsers(role) {
    return userDAO.searchByRole(role);
  }

  async findOne(userId) {
    try {
      let user = await userDAO.findOne(userId);
      return user;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  }

  async save(user) {
    console.log(user);

    try {
      let exists = false; //await userDAO.findOne();

      if (exists) {
        throw new Error("Email Already Registered");
      }

      let result = await userDAO.save(user);
      return result;
    } catch (err) {
      console.error(err.message);
      throw new Error(err.message);
    }
  }

  async delete(userId) {
    try {
      let user = await userDAO.findOne(userId);
      if (!user) {
        throw new Error("User Id not found");
      }
      let result = await userDAO.delete(user);
      return result.data;
    } catch (err) {
      console.log(err.message);
      console.error("Error", err.message);
      throw new Error(err.message);
    }
  }

  async update(user) {
    try {
      let actualRecord = await userDAO.findOne(user._id);
      if (!actualRecord) {
        throw new Error("User Id not found");
      }

      //update - name,email,password
      actualRecord.name = user.name;
      actualRecord.email = user.email;
      actualRecord.password = user.password;

      let result = await userDAO.update(actualRecord);
      return result.data;
    } catch (err) {
      console.log(err.message);
      console.error("Error", err.message);
      throw new Error(err.message);
    }
  }

  async changePassword(userId, password) {
    try {
      let actualRecord = await userDAO.findOne(userId);
      if (!actualRecord) {
        throw new Error("User Id not found");
      }

      //update - password
      actualRecord.password = password;

      let result = await userDAO.update(actualRecord);
      return result.data;
    } catch (err) {
      console.log(err.message);
      console.error("Error", err.message);
      throw new Error(err.message);
    }
  }
}
exports.UserService = UserService;