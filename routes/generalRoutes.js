import { Router } from "express";
import {
  postImage,
  getImages,
  postGrayScale,
} from "../controller/userController.js";
import { socketManager } from "../middlewares/socketManager.js";

const router = Router();

const generalRoutes = (upload, server) => {
  router.post("/", postImage(upload));
  router.get("/", getImages);
  router.post("/grayscale", socketManager(server), postGrayScale);
  return router;
};

export default generalRoutes;
