const { UserRepository } = require("../repositories/userRepository");

class UserService {
  // TODO: Implement methods to work with user

  checkDbRespounse(res) {
    if (!res) {
      return null;
    }
    return res;
  }

  getUsers() {
    const users = UserRepository.getAll();
    return this.checkDbRespounse(users);
  }

  getUser(id) {
    const user = this.search({ id });
    return this.checkDbRespounse(user);
  }

  createUser(data) {
    const user = UserRepository.create(data);
    return this.checkDbRespounse(user);
  }

  updateUser(id, dataToUpdate) {
    const user = UserRepository.update(id, dataToUpdate);
    return this.checkDbRespounse(user);
  }

  deleteUser(id) {
    const user = UserRepository.delete(id);
    return this.checkDbRespounse(user);
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
