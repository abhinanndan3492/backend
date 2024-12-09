const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta",
  password: "",
});

let q = "INSERT INTO user (id,username,email,password) VALUES ? ";
// let users = [
//   ["1234", "123_newuser", "abcd@gmail.com", "abcd1234"],
//   ["12345", "1234_newuser", "abcde@gmail.com", "abbcd1234"],
// ];

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ];
};

let data = [];
for (let index = 1; index <= 100; index++) {
  data.push(getRandomUser());
}

// console.log(getRandomUser());

try {
  connection.query(q, [data], (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log(result.length);
  });
} catch (error) {
  console.log(err);
}

connection.end();
