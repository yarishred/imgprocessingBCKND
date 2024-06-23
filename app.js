import express from "express";
import multer from "multer";
import cors from "cors";
import { createServer } from "http";
import mongoose from "mongoose";

import generalRoutes from "./routes/generalRoutes.js";
import { socketManager } from "./middlewares/socketManager.js";

//Server with cors
const app = express();
const port = process.env.SERVER_PORT;
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Enable Socket
const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", // Reemplaza con la URL de tu aplicación React
//     methods: ["GET", "POST"],
//   },
// });

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

// Socket Middleware
app.use(socketManager(server))

// Database URI
const dbURI = process.env.DB_MONGO_URI;

// io.on("connection", (socket) => {
//   console.log("a user connected");

//   socket.on("updateAlpha", ({alpha, beta, idImage}) => {
//     console.log(`Alpha value received: ${alpha}`);
//     console.log(`Beta value received: ${beta}`);
//     console.log(`idImage received: ${idImage}`);


//   });
// });

const startServer = async () => {
  try {
    await mongoose.connect(dbURI);
    server.listen(port, () => {
      console.log(`Database connected & Server working  on port: ${port} !!!`);
    });
  } catch (err) {
    console.log(err);
  }
};
startServer();
