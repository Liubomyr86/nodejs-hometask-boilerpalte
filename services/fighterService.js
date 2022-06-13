const { FighterRepository } = require("../repositories/fighterRepository");

class FighterService {
  // TODO: Implement methods to work with fighters

  checkDbRespounse(req) {
    if (!req) {
      return null;
    }
    return req;
  }

  getFighters() {
    const fighters = FighterRepository.getAll();
    return this.checkDbRespounse(fighters);
  }

  getFighter(id) {
    const fighter = this.search({ id });
    return this.checkDbRespounse(fighter);
  }

  createFighter(data) {
    const fighter = FighterRepository.create(data);
    return this.checkDbRespounse(fighter);
  }

  updateFighter(id, dataToUpdate) {
    const fighter = FighterRepository.update(id, dataToUpdate);
    return this.checkDbRespounse(fighter);
  }

  deleteFighter(id) {
    const fighter = FighterRepository.delete(id);
    return this.checkDbRespounse(fighter);
  }

  search(search) {
    const item = FighterRepository.getOne(search);
    return this.checkDbRespounse(item);
  }
}

module.exports = new FighterService();
