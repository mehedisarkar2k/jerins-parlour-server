const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient } = require("mongodb");

require("dotenv").config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// connection uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gf34j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);

// new client
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// server connection
const server = async () => {
  try {
    await client.connect();
    const database = client.db("jerin_parlour");
    const userCollection = database.collection("users");

    console.log("Jerin's parlour database is connected");
  } finally {
    // await client.close();
  }
};
server().catch(console.dir);

// getting server
app.get("/", (req, res) => {
  console.log("Jerin Parlour's Server is running on", port);
  res.send("Welcome to Jerins Parlour!");
});

// running server on port
app.listen(port, () => {
  console.log(`Jerin's Parlour is running on http://localhost:${port}/`);
});
