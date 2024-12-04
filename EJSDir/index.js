const exp = require("constants");
const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/public/css")));

app.set("view angle", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/rolldice", (req, res) => {
  let num = Math.floor(Math.random() * 6) + 1;
  res.render("rolldice.ejs", { diceVal: num });
});

app.get("/ig/:username", (req, res) => {
  //   const followers = ["you", "me", "who"];
  //   let { username } = req.params;
  //   console.log(username);
  // res.render("insta.ejs", { username,followers });
  let { username } = req.params;
  const instaData = require("./data.json");
  const data = instaData[username];
  //   console.log(data);
  if (data) {
    res.render("insta.ejs", { data });
  } else {
    res.render("error.ejs");
  }
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
