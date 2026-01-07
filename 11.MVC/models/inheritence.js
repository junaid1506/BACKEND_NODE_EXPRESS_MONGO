class User {
  constructor(userName) {
    this.userName;
  }
  logMe() {
    console.log(`Username is ${this.userName}`);
  }
}

class Teacher extends User {
  constructor(userName, email, password) {
    super(userName);
    this.email = email;
    this.password = password;
  }

  addCourse() {
    console.log(`New Couser was added by ${this.userName}`);
  }
}

const chai = new Teacher('chai','chai@teacher.com','123')
chai.addCourse()