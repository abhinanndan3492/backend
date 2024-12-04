const express = require("express");
const app = express();

let port = 3000;

// app.set("view angle", "ejs");
// app.get("/",(req,res)=>{
//   res.render
// })

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
// app.use((req, res) => {
//   console.log("new incoming request");
//   //   res.send("This is a basic response"); //we can send a js obj -->json obj, or a html text-->html page
//   res.send({
//     name: "abhi",
//     age: "21",
//   });
// });

app.get("/login", (req, res) => {
  res.send("you contacted login page...");
});
app.get("/home", (req, res) => {
  res.send("you contacted home page...");
});
app.get("/signup", (req, res) => {
  res.send("you contacted signup page...");
});
// app.get("*", (req, res) => {
//   res.send("404,page not found");
// });
app.post("/login", (req, res) => {
  res.send("you contacted login post page...");
});
app.get("/:username/:id", (req, res) => {
  // console.log(req.params);
  let { username, id } = req.params;
  let htmlStr = `<h1>
      hello i'm @${username} and my id is #${id}
    </h1>`;
  // res.send(`hello i'm ${username} and my id is ${id}`);
  res.send(htmlStr);
});
app.get("/search", (req, res) => {
  // console.log(req.query);
  // res.send("no result");
  let { q } = req.query;
  if (!q) {
    res.send("<h1>Nothing searched</h1>");
  }
  res.send(`search result for query: ${q}`);
});
