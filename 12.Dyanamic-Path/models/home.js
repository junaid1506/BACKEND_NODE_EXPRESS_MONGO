//core module
const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/pathUtils");

module.exports = class Home {
  constructor(houseName, localion, price, rating, photoUrl) {
    this.houseName = houseName;
    this.localion = localion;
    this.price = price;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    Home.fetchAll((registerHomes) => {
      registerHomes.push(this);
      const filePath = path.join(rootDir, "data", "home.json");
      fs.writeFile(filePath, JSON.stringify(registerHomes), (err) => {
        console.log("File Write Successfull");
        console.log(`Error is ${err}`);
      });
    });
  }

  static fetchAll(callback) {
    const filePath = path.join(rootDir, "data", "home.json");

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err || !data) {
        callback([]);
      } else {
        callback(JSON.parse(data));
      }
    });
  }
};
