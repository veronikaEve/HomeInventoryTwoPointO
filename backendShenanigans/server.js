const { databasePassword } = require("./creds");

const express = require("express");
const app = express();
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

const url = `mongodb+srv://homeInventory:${databasePassword}@cluster0.wqild.mongodb.net/inventory?retryWrites=true&w=majority`;
const client = new MongoClient(url);

const dbName = "inventory";

let dbConnection;

async function getDB() {
  if (!dbConnection) {
    try {
      await client.connect();
      dbConnection = client.db(dbName);
      return dbConnection;
    } catch (err) {
      console.log(err.stack);
      return;
    }
  }

  return dbConnection;
}

app.post("/addItem", async (req, res) => {
  const database = await getDB();
  console.log(req.body);
  await database.collection("items").insertOne(req.body);

  res.send({ statusCode: 200 });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
