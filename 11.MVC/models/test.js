// class User {
//   constructor(userName, email, pass) {
//     this.userName = userName;
//     this.email = email;
//     this.pass = pass;
//   }
//   encryptPassword() {
//     return `${this.pass}abc`;
//   }
//   changeUserName() {
//     return `${this.userName.toUpperCase()}`;
//   }
// }

// behinde the scence

function User(userName, email, pass) {
  this.userName = userName;
  this.email = email;
  this.pass = pass;
}
User.prototype.encryptPassword = function () {
  return `${this.pass}abc`;
};
User.prototype.changeUserName = function () {
  return `${this.userName.toUpperCase()}`;
};

const chai = new User("chai", "chai@gmail.com", "12343214");
const chai2 = new User("junaid", "junaid@gmail.com", "junaid123");

console.log(chai.encryptPassword());
console.log(chai2.encryptPassword());
console.log(chai.changeUserName());
console.log(chai2.changeUserName());
