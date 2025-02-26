const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

const uri = "mongodb+srv://MariaEduarda:Extensao123@extensao3.nzem8.mongodb.net/?retryWrites=true&w=majority&appName=Extensao3";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

// Cache para armazenar os dados buscados
let cache = {
  latestRecord: null,
  horas: null,
  dias: null,
};

app.use(cors());

// Função para conectar ao MongoDB
async function connectToMongo() {
  try {
    await client.connect();
    db = client.db('Extensao');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Função para buscar os dados mais recentes
async function fetchLatestRecord() {
  try {
    const dados = db.collection('sensores');
    const latestRecord = await dados.find().sort({ data_hora: -1 }).limit(1).toArray();
    cache.latestRecord = latestRecord;
    console.log('Latest record updated:', latestRecord);
  } catch (error) {
    console.error('Error fetching latest record:', error);
  }
}

// Função para buscar os dados das últimas 6 horas
async function fetchHoras() {
  try {
    const hora = db.collection('sensores');
    const horas = await hora.find().sort({ data_hora: -1 }).limit(6).toArray();
    cache.horas = horas;
    console.log('Horas updated:', horas);
  } catch (error) {
    console.error('Error fetching horas:', error);
  }
}

// Função para buscar os dados dos últimos 3 dias
async function fetchDias() {
  try {
    const dia = db.collection('sensores');
    const dias = await dia.find().sort({ data_hora: -1 }).limit(72).toArray();
    cache.dias = dias;
    console.log('Dias updated:', dias);
  } catch (error) {
    console.error('Error fetching dias:', error);
  }
}

// Função para atualizar o cache a cada hora
async function updateCache() {
  await fetchLatestRecord();
  await fetchHoras();
  await fetchDias();
}

// Inicia a atualização do cache a cada hora
function startHourlyUpdate() {
  updateCache(); // Atualiza o cache imediatamente ao iniciar
  setInterval(updateCache, 60 * 60 * 1000); // Atualiza o cache a cada hora
}

// Rotas originais, mas usando o cache em vez de consultar o banco de dados diretamente
app.get('/latest-record', async (req, res) => {
  try {
    if (cache.latestRecord) {
      res.json(cache.latestRecord);
    } else {
      res.status(404).send('No data available');
    }
  } catch (error) {
    res.status(500).send('Error fetching latest record');
  }
});

app.get('/horas', async (req, res) => {
  try {
    if (cache.horas) {
      res.json(cache.horas);
    } else {
      res.status(404).send('No data available');
    }
  } catch (error) {
    res.status(500).send('Error fetching horas');
  }
});

app.get('/dias', async (req, res) => {
  try {
    if (cache.dias) {
      res.json(cache.dias);
    } else {
      res.status(404).send('No data available');
    }
  } catch (error) {
    res.status(500).send('Error fetching dias');
  }
});

// Inicia o servidor e a atualização horária
connectToMongo().then(() => {
  startHourlyUpdate(); // Inicia a atualização do cache a cada hora
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});