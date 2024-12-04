const express = require("express");
const app = express();

const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
uuidv4(); // -- '1b9d6bcb-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let posts = [
  {
    id: uuidv4(),
    username: "abhinandan",
    content: "building APIs",
  },
  {
    id: uuidv4(),
    username: "abhishek",
    content: "building websites",
  },
  {
    id: uuidv4(),
    username: "anurag",
    content: "prompt engineer",
  },
];

// <------------for reading all posts--------------->

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// <------------for creating new  posts------------->
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

// <-----------get one post (using id)------------>
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let post = posts.find((p) => id == p.id);
  console.log(post);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id == p.id);
  post.content = newContent;
  console.log(post);
  res.redirect("/posts");
});

//<--------------- to update specific post (using id)-------------->

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  // console.log(id);
  let post = posts.find((p) => id == p.id);
  // console.log(post);
  res.render("edit.ejs", { post });
});

// <-------------to delete specific post-------------->

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

// <--------------checking port ,working well or not------------>
app.listen(port, () => {
  console.log(`listening to port${port}`);
});
