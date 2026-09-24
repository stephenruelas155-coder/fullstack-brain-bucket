// require('dotenv').config()
import 'dotenv/config';
// const { MongoClient, ServerApiVersion } = require('mongodb');
import { MongoClient, ServerApiVersion } from 'mongodb';
// const uri = "mongodb+srv://fullstack-brainbucket:lasagna@cluster0.a8iv2z8.mongodb.net/?appName=Cluster0";
import express from 'express'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uri = process.env.MONGO_URI;  
const app = express();
const client = new MongoClient(uri, {

});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../public', 'hotel.html'));
})
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.use(express.static(join(__dirname, '../public')));
app.use( express.json());

// app.get('/', (req, res) => {
//   res.send('Hello World')
// })

app.post(
  '/api/students',
  function(req, res) {

    console.log(
      req.body
    );

    res.json({

      received:
        req.body

    });

  }
);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
