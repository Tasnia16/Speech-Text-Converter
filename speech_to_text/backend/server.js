const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");


const port = 3000; // Choose your desired port

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/saveText", (req, res) => {
  const textData = req.body.text; // Assuming you send the text data as a JSON object with a "text" property
  // Here you can save or process the received text data as needed
  console.log("Received text data:", textData);
  res.sendStatus(200); // Send a response back to the client
});

app.listen(port, () => {
  console.log(`Node.js server is running on port ${port}`);
});
