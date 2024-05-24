import { Router } from "express";
import { postImage, getImages } from "../controller/userController.js";

const router = Router();

const generalRoutes = (upload) => {
  router.post("/", postImage(upload));
  router.get("/", getImages);
  return router
};

export default generalRoutes;
