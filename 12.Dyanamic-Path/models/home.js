//core module
const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/pathUtils");
const filePath = path.join(rootDir, "data", "home.json");

module.exports = class Home {
  constructor(houseName, localion, price, rating, photoUrl) {
    this.houseName = houseName;
    this.localion = localion;
    this.price = price;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  // async save() {
  //   this.id = Math.random().toString();
  //   const homes = await Home.fetchAll();
  //   homes.push(this);
  //   await fs.promises.writeFile(filePath, JSON.stringify(homes));
  // }

  save() {
    this.id = Math.random().toString();
    Home.fetchAll((registerHomes) => {
      registerHomes.push(this);
      fs.writeFile(filePath, JSON.stringify(registerHomes), (err) => {
        console.log("File Write Successfull");
        console.log(`Error is ${err}`);
      });
    });
  }

  // static async fetchAll() {
  //   const data = await fs.promises.readFile(filePath, "utf8");
  //   return data ? JSON.parse(data) : [];
  // }

  static fetchAll(callback) {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err || !data) {
        callback([]);
      } else {
        callback(JSON.parse(data));
      }
    });
  }

  static findById(homeId, callback) {
    Home.fetchAll((homes) => {
      const home = homes.find((h) => h.id === homeId);
      callback(home);
    });
  }
};
