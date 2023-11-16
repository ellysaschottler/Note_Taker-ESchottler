const express = require('express');

const app = express();

const PORT = 3001;

app.get('/', (req, res) => {
  res.send("yay");

})

app.listener(PORT, () => {
  console.log("Listening on PORT 3001");
});

app.use(express.static("public"));