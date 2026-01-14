//core module
const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/pathUtils");
const Favourites = require("./favourites");
const filePath = path.join(rootDir, "data", "home.json");
const favFilePath = path.join(rootDir, "data", "favourites.json");

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
    Home.fetchAll((registerHomes) => {
      if (this.id) {
        // Edit the existing home
        registerHomes = registerHomes.map((home) =>
          home.id === this.id ? this : home
        );
      } else {
        // Add new home
        this.id = Math.random().toString();
        registerHomes.push(this);
      }

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

  static deleteById(homeId) {
    Home.fetchAll((homes) => {
      const updateHomes = homes.filter((h) => h.id !== homeId);

      fs.writeFile(filePath, JSON.stringify(updateHomes), (err) => {
        if (err) {
          console.log("Error in Deleting Home", err);
          return;
        } else {
          console.log("Home Deleted Successfully");
        }
      });
    });

    Favourites.fetchAll((favHomes) => {             
      const updatedFavs = favHomes.filter((id) => id !== homeId);
      Favourites.removeById(homeId, () => {
        fs.writeFile(favFilePath, JSON.stringify(updatedFavs), (err) => {
          if (err) {
            console.log("Error in Deleting Favourite Home", err);
          } else {
            console.log("Favourite Home Deleted Successfully");
          }
        });
      });
    });
  }
};
