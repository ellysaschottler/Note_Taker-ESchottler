const express = require('express');
const fs = require("fs")
//npm package to generate a unique ID
const shortid = require('shortid');
const app = express();

const PORT = process.env.PORT || 3001;

const notesData = require("./db/db.json")

//middleware for parsing application/json
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

// outputs the data in a json object
app.get("/api/notes", (req, res) => {
    res.json(notesData);
})

// app.get('/', (req, res) => {
//   res.send("yay");
// });

//serve up the homepage on the root)
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

//serve up the notes page on /notes)
app.get("/notes", (req, res) => {
    res.sendFile(__dirname + "/public/notes.html");
});

// post additional notes to the api
app.post("/api/notes", (req, res) => {
    notesData.push(req.body);
    res.send("Note Saved!");

const {title, text } = req.body;

if (title && text) {
    const newNote = {
        title,
        text,
        id : shortid.generate(),
    };

    const noteString = JSON.stringify(newNote);

    fs.writeFile(`./db/${newNote.title}.json`, noteString, (err) =>
        err
            ? console.error(err)
            : console.log(`New note has been written to JSON file`) 
    );
    console.log(success);

    } else {
        res.status(500).json('Error in adding note');
    }
});


// display error page if route not found
app.get("*", (req, res) => {
    res.status(404).send("404 error");
});

app.listen(PORT, () => {
  console.log("Listening on PORT 3001");
});
