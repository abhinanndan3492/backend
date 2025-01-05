const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.model.js");
const methodOverride = require("method-override");

const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

async function connectToDB() {
  try {
    await mongoose.connect("mongodb://127.0.01:27017/whatsapp");
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
}
connectToDB();

// let chat1 = new Chat({
//   from: "Alice",
//   to: "Bob",
//   message: "Hello Bob",
//   date: new Date(),
// });

// chat1
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Index route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  console.log(chats);
  // res.send("workings");
  res.render("index.ejs", { chats: chats });
});

// New chats route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// create route
app.post("/chats", async (req, res) => {
  let newChat = new Chat({
    from: req.body.from,
    to: req.body.to,
    message: req.body.message,
    date: new Date(),
  });

  newChat
    .save()
    .then((res) => {
      console.log("Chat saved");
    })
    .catch((err) => {
      console.log(err);
    });

  res.redirect("/chats");
});

// edit route
app.get("/chats/:id/edit", async (req, res) => {
  let chat = await Chat.findById(req.params.id);
  res.render("edit.ejs", { chat: chat });
});

// update route
app.put("/chats/:id", async (req, res) => {
  let chat = await Chat.findByIdAndUpdate(
    req.params.id,
    { message: req.body.message },
    { runValidators: true, new: true }
  );

  res.redirect("/chats");
});

// delete route
app.delete("/chats/:id", async (req, res) => {
  let deletedChat = await Chat.findByIdAndDelete(req.params.id);
  console.log("Chat deleted");
  console.log(deletedChat);
  res.redirect("/chats");
});

app.get("/", (req, res) => {
  res.send("Root is working");
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`);
});
