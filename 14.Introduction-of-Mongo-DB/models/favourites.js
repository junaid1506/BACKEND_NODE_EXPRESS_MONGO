const { getDb } = require("../utils/databaseUtils");

module.exports = class Favourites {
  constructor(homeId) {
    this.homeId = homeId;
  }

  save() {
    const db = getDb();

    return Favourites.fetchAll().then((favHomes) => {
      const exists = favHomes.some((fav) => fav.homeId === this.homeId);

      if (exists) {
        console.log("Home already in Favourites");
        return new Promise.resolve(); // ✅ promise continue
      } else {
        return db.collection("favourites").insertOne({
          homeId: this.homeId,
        });
      }
    });
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("favourites").find().toArray();
  }

  static removeById(homeID) {
    const db = getDb();
    return db.collection("favourites").deleteOne({ homeId: homeID });
  }
};
