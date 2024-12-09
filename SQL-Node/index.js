const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta",
  password: "",
});

let q = "INSERT INTO user (id,username,email,password) VALUES ? ";
let users = [
  ["1234", "123_newuser", "abcd@gmail.com", "abcd1234"],
  ["12345", "1234_newuser", "abcde@gmail.com", "abbcd1234"],
];

try {
  connection.query(q, [users], (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log(result.length);
  });
} catch (error) {
  console.log(err);
}

connection.end();

let getRandomUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

// console.log(getRandomUser());
