const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const Jimp = require('jimp');
const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');
const serviceAccount = require('./firebase-key.json');

const app = express();
const PORT = process.env.PORT || 5000;

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'photo-opp.appspot.com'
});
const bucket = getStorage().bucket();

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple in-memory log for demo purposes
let logs = [];

app.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    const inputPath = req.file.path;
    const processedName = `processed-${req.file.filename}`;
    const processedPath = path.join(__dirname, 'uploads', processedName);

    const photo = await Jimp.read(inputPath);
    const frame = await Jimp.read('./frame.png');
    frame.resize(photo.bitmap.width, photo.bitmap.height);
    photo.composite(frame, 0, 0);
    await photo.writeAsync(processedPath);

    await bucket.upload(processedPath, {
      destination: processedName,
      public: true,
      metadata: { cacheControl: 'public, max-age=31536000' },
    });

    const url = `https://storage.googleapis.com/${bucket.name}/${processedName}`;
    logs.push({ date: new Date().toISOString(), url });

    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao processar imagem');
  }
});

app.get('/logs', (req, res) => {
  res.json(logs);
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
