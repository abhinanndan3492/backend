const mongoose = require("mongoose");
const Chat = require("./models/chat.model.js");

async function connectToDB() {
  try {
    await mongoose.connect("mongodb://127.0.01:27017/whatsapp");
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
}

connectToDB();

let allChats = [
  {
    from: "Kabir",
    to: "Anurag",
    message: "Hey nuu!!!",
    date: new Date(),
  },
  {
    from: "Ali",
    to: "Boby",
    message: "Hello Boby",
    date: new Date(),
  },
  {
    from: "Billi",
    to: "Bobsie",
    message: "Hello Bobsie king",
    date: new Date(),
  },
  {
    from: "Nathon",
    to: "Webster",
    message: "Namastey webbie",
    date: new Date(),
  },
  {
    from: "Abhi",
    to: "Bhai",
    message: "Hola Bob",
    date: new Date(),
  },
];

Chat.insertMany(allChats);
