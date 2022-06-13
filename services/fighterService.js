const { FighterRepository } = require("../repositories/fighterRepository");

class FighterService {
  checkDbResponse(res, errorMessage) {
    if (!res) {
      throw Error(errorMessage);
    }
    return res;
  }

  getFighters() {
    const fighters = FighterRepository.getAll();
    return this.checkDbResponse(fighters, "Fighters not found");
  }

  getFighter(id) {
    const fighter = this.search({ id });
    return this.checkDbResponse(fighter, "Fighter not found");
  }

  createFighter(data) {
    const fighter = FighterRepository.create(data);
    return this.checkDbResponse(fighter, "Can not create fighter");
  }

  updateFighter(id, dataToUpdate) {
    const fighter = FighterRepository.update(id, dataToUpdate);
    return this.checkDbResponse(fighter, "Can not update fighter");
  }

  deleteFighter(id) {
    const fighter = FighterRepository.delete(id);
    return this.checkDbResponse(fighter, "Fighter not found");
  }

  search(search) {
    const item = FighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

module.exports = new FighterService();
