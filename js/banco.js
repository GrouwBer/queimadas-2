const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

const uri = "mongodb+srv://MariaEduarda:Extensao123@extensao3.nzem8.mongodb.net/?retryWrites=true&w=majority&appName=Extensao3";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

app.use(cors());

async function connectToMongo() {
  try {
    await client.connect();
    db = client.db('Extensao');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongo();

app.get('/latest-record', async (req, res) => {
  try {
    const dados = db.collection('sensores');
    const latestRecord = await dados.find().sort({data_hora: -1 }).limit(1).toArray();
    res.json(latestRecord);
  } catch (error) {
    res.status(500).send('Error fetching latest record');
  }
});

app.get('/horas', async (req, res) => {
  try {
    const hora = db.collection('sensores');
    const horas = await hora.find().sort({data_hora: -1 }).limit(6).toArray();
    res.json(horas);
  } catch (error) {
    res.status(500).send('Error fetching latest record');
  }
});

app.get('/dias', async (req, res) => {
  try {
    const dia = db.collection('sensores');
    const dias = await dia.find().sort({data_hora: -1 }).limit(72).toArray();
    res.json(dias);
  } catch (error) {
    res.status(500).send('Error fetching latest record');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});