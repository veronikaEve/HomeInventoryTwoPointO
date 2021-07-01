const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://homeInventory:QfwiSIFDgJeWMUNP@cluster0.wqild.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(url);

const dbName = "test";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    // Use the collection "people"
    const col = db.collection("people");

    // Insert a single document, wait for promise so we can read it back
    const p = await col.insertOne(personDocument);
    // Find one document
    const myDoc = await col.findOne();
    // Print to the console
    console.log(myDoc);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

function add() {
  db.collection("items")
    .insertOne({
      name: "canvas",
      qty: 100,
      tags: ["cotton"],
      size: { h: 28, w: 35.5, uom: "cm" },
    })
    .then(function (result) {
      // process result
    });
}

run().catch(console.dir);
