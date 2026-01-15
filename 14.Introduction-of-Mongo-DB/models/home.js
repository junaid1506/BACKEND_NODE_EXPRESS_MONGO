const db = require("../utils/databaseUtils");

module.exports = class Home {
  constructor(homeName, location, price, rating, description, imageUrl, id) {
    this.homeName = homeName;
    this.location = location;
    this.price = price;
    this.rating = rating;
    this.description = description;
    this.imageUrl = imageUrl;
    this.id = id;
  }

  save() {
    if (this.id) {
      return db.execute(
        "UPDATE homes SET homeName = ?, location = ?, price = ?, rating = ?, description = ?, imageUrl = ? WHERE id = ?",
        [
          this.homeName ?? null,
          this.location ?? null,
          this.price ?? null,
          this.rating ?? null,
          this.description ?? null,
          this.imageUrl ?? null,
          this.id,
        ]
      );
    } else {
      return db.execute(
        "INSERT INTO homes (homeName, location, price, rating, imageUrl, description) VALUES (?,?,?,?,?,?)",
        [
          this.homeName ?? null,
          this.location ?? null,
          this.price ?? null,
          this.rating ?? null,
          this.description ?? null,
          this.imageUrl ?? null,
        ]
      );
    }
  }

  static fetchAll() {
    return db.execute("SELECT * FROM homes");
  }

  static findById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id = ?", [homeId]);
  }

  static deleteById(homeId) {
    return db.execute("DELETE FROM homes WHERE id = ?", [homeId]);
  }
};
