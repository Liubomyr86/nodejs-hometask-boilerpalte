const isEmpty = require("lodash.isempty");
const { UserRepository } = require("../repositories/userRepository");

class UserService {
  checkDbResponse(res, errorMessage) {
    if (!res) {
      throw Error(errorMessage);
    }
    return res;
  }

  getUsers() {
    const users = UserRepository.getAll();
    if (isEmpty(users)) {
      throw Error("Users not found");
    }
    return this.checkDbResponse(users, "Users not found");
  }

  getUser(id) {
    const user = this.search({ id });
    return this.checkDbResponse(user, "User not found");
  }

  createUser(data) {
    const { email, phoneNumber } = data;
    if (this.search({ email }) || this.search({ phoneNumber })) {
      throw Error("This email or phone number is already registered");
    }
    const user = UserRepository.create(data);
    return this.checkDbResponse(user, "Can not create user");
  }

  updateUser(id, dataToUpdate) {
    const { email, phoneNumber } = dataToUpdate;
    if (!this.search({ id })) throw Error("User not found");
    if (this.search({ email }) || this.search({ phoneNumber })) {
      throw Error("This email or phone number is already registered");
    }
    const user = UserRepository.update(id, dataToUpdate);
    return this.checkDbResponse(user, "Can not update user");
  }

  deleteUser(id) {
    const user = UserRepository.delete(id);
    return this.checkDbResponse(user, "User not found");
  }

  search(search) {
    const item = UserRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

module.exports = new UserService();
