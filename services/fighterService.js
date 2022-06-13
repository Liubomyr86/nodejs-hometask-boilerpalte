const { FighterRepository } = require("../repositories/fighterRepository");

class FighterService {
  // TODO: Implement methods to work with fighters

  checkDbRespounse(req) {
    if (!req) {
      return null;
    }
    return req;
  }
}

module.exports = new FighterService();
