import express from "express";
import multer from "multer";
import cors from "cors";
import mongoose from "mongoose";


import generalRoutes from "./routes/generalRoutes.js";

//Server with cors
const app = express();
const port = process.env.SERVER_PORT;
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Gestion de archivos en upload folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg");
  },
});

// Configurar multer para manejar la subida de archivos
const upload = multer({ storage: storage });

// Rutas Generales
app.use("/", generalRoutes(upload));


// Database URI
const dbURI = process.env.DB_MONGO_URI;

const startServer = async () => {
  try {
    await mongoose.connect(dbURI);
    app.listen(port, () => {
      console.log(`Database connected & Server working  on port: ${port} !!!`);
    });
  } catch (err) {
    console.log(err);
  }
};
startServer()
