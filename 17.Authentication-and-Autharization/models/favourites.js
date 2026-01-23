const mongoose = require("mongoose");

const favouritesScheme = mongoose.Schema({
  homeId: {
    type: String,
    require: true,
    unique: true,
  },
});

module.exports = mongoose.model("Favourites", favouritesScheme);

// static find() {
//   const db = getDb();
//   return db.collection("favourites").find().toArray();
// }

// static removeById(homeID) {
//   const db = getDb();
//   return db.collection("favourites").deleteOne({ homeId: homeID });
// }

//  this.homeId = homeId;
