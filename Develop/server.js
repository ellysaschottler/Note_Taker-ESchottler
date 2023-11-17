const express = require('express');

const app = express();

const PORT = 3001;

const notesData = require("./db/db.json")

// outputs the data in a json object
app.get('/api/notes', (req, res) => {
    res.json(notesData);
})

// app.get('/', (req, res) => {
//   res.send("yay");
// });

//serve up the homepage on the root)
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

//serve up the notes page on the root)
app.get("/notes", (req, res) => {
    res.sendFile(__dirname + "/public/notes.html");
});

// display error page if route not found
app.get("*", (req, res) => {
    res.status(404).send("404 error");
});

app.listen(PORT, () => {
  console.log("Listening on PORT 3001");
});

app.use(express.static("public"));