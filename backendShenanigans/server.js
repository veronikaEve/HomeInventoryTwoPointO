const { username, password } = require("./creds");

const express = require("express");
const app = express();
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

const url = `mongodb+srv://${username}:${password}@cluster0.wqild.mongodb.net/inventory?retryWrites=true&w=majority`;
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
  await database.collection("items").insertOne(req.body);

  res.send({ statusCode: 200 });
});

app.post("/updateItem", async (req, res) => {
  const database = await getDB();
  console.log(req.body);

  await database
    .collection("items")
    .updateOne(
      { _id: ObjectId(req.body._id) },
      { $set: { ...req.body, _id: new ObjectId(req.body._id) } },
      function (err, res) {
        if (err) {
          throw err;
        }
        console.log("1 document updated");
      }
    );
  res.send({ statusCode: 200 });
});

app.post("/deleteItem", async (req, res) => {
  const database = await getDB();
  console.log(req.body);

  await database
    .collection("items")
    .remove({ _id: ObjectId(req.body._id) }, { justOne: true });
  res.send({ statusCode: 200 });
});

app.get("/searchItems", async (req, res) => {
  const database = await getDB();

  let result = await database
    .collection("items")
    .aggregate([
      {
        $search: {
          text: {
            query: `${req.query.searchTerm}`,
            path: "name",
            fuzzy: {
              maxEdits: 2,
            },
          },
        },
      },
    ])
    .toArray();

  res.send(result);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
