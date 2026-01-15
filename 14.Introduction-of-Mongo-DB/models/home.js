

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
    
  }

  static fetchAll() {
    
  }

  static findById(homeId) {
    
  }

  static deleteById(homeId) {
  }
};
