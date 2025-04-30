const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");
const serviceAccount = require("./firebase-key.json");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});
const bucket = getStorage().bucket();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

let logs = [];

app.post("/upload", upload.single("photo"), async (req, res) => {
  try {
    const inputPath = req.file.path;
    const fileName = `final-${req.file.filename}`;

    await bucket.upload(inputPath, {
      destination: fileName,
      public: true,
      metadata: { cacheControl: "public, max-age=31536000" },
    });

    const url = `${process.env.URL_STORAGE_GOOGLEAPIS}/${bucket.name}/${fileName}`;

    logs.push({ date: new Date().toISOString(), url });

    res.json({ url });
  } catch (err) {
    console.error("Erro no upload:", err);
    res.status(500).send("Erro ao fazer upload");
  }
});

app.get("/logs", (req, res) => {
  res.json(logs);
});

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
