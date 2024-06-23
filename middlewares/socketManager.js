import { Server } from "socket.io";
import sharp from "sharp";
import { handlePythonScripts } from "../middlewares/pythonSpawn.js";

import ImagesManagement from "../Model/manageImages.js";

export const socketManager = (server) => {
  let io;

  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Reemplaza con la URL de tu aplicación React
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("updateOptions", async (...options) => {
      const { alpha, beta, idImage } = options[0];

      if (idImage) {
        try {
          const imagePath = await ImagesManagement.findById(idImage);
          if (!imagePath) {
            throw new Error("Imagen no encontrada");
          }
          handlePythonScripts("app.py", {
            alpha: alpha,
            beta: beta,
            imagePath: imagePath.imageFile,
          })
            .then((res) => {
              socket.emit("updatedImage", res.imageOptions);
            })
            .catch((err) => console.log(err));
        } catch (err) {
          console.log(err);
        }
      }
    });
  });

  return (req, res, next) => {
    req.io = io;

    next();
  };
};
