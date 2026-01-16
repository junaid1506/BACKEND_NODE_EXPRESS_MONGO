const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/databaseUtils");

module.exports = class Home {
  constructor(homeName, location, price, rating, description, imageUrl, _id) {
    this.homeName = homeName;
    this.location = location;
    this.price = price;
    this.rating = rating;
    this.description = description;
    this.imageUrl = imageUrl;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    const db = getDb();
    if (this._id) {
      // update
      const updateFields = {
        homeName: this.homeName,
        price: this.price,
        location: this.location,
        rating: this.rating,
        imageUrl: this.imageUrl,
        description: this.description,
      };

      return db
        .collection("homes")
        .updateOne(
          { _id: new ObjectId(String(this._id)) },
          { $set: updateFields }
        );
    } else {
      // insert
      return db.collection("homes").insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("homes").find().toArray();
  }

  static findById(homeId) {
    const db = getDb();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeId)) })
      .next();
  }

  static deleteById(homeId) {
    const db = getDb();
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeId)) });
  }
};
