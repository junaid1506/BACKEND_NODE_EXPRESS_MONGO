//core module
const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/pathUtils");
const filePath = path.join(rootDir, "data", "favourites.json");

module.exports = class Favourites {
  constructor(homeId) {
    this.homeId = homeId;
  }

  // save() {
  //   Favourites.fetchAll((favHomes) => {
  //     favHomes.push(this.homeId);
  //     fs.writeFile(filePath, JSON.stringify(favHomes), (err) => {
  //       console.log("File Write Successfull");
  //       console.log(`Error is ${err}`);
  //     });
  //   });
  // }

  // static fetchAll(callback) {
  //   fs.readFile(filePath, "utf8", (err, data) => {
  //     if (err || !data) {
  //       callback([]);
  //     } else {
  //       callback(JSON.parse(data));
  //     }
  //   });
  // }

  save() {
    Favourites.fetchAll((favhome) => {
      favhome.push(this.homeId);
      fs.writeFile(filePath, JSON.stringify(favhome), (err) => {
        console.log("File Write Succesfully");
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (!data || err) {
        callback([]);
      } else {
        callback(JSON.parse(data));
      }
    });
  }
};
