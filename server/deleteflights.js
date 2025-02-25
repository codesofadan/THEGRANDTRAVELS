const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb+srv://graphicology7:xAtihDzDCD4dywHl@thegrandtravel.rqm11.mongodb.net/thegrandtravel?retryWrites=true&w=majority&appName=thegrandtravel";
const client = new MongoClient(MONGO_URI);

async function deleteFlightsData() {
  try {
    await client.connect();
    const database = client.db("thegrandtravel"); // Your database name
    const flightsCollection = database.collection("flights"); // Collection name

    const result = await flightsCollection.deleteMany({}); // Delete all documents
    console.log(`${result.deletedCount} flights deleted successfully.`);
  } catch (error) {
    console.error("Error deleting flights:", error);
  } finally {
    await client.close();
  }
}

deleteFlightsData();
