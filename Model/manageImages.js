import mongoose from "mongoose";

// Create mongoose schema
const Schema = mongoose.Schema;
const manageImagesSchema = new Schema({
  imageFile: {
    type: String,
    required: true,
  },
  resultImage: {
    type: String,
  },
  histogramImage: {
    type: String,
  },
});

export default mongoose.model("ImagesManagement", manageImagesSchema);
