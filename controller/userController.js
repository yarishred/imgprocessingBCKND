import ImagesManagement from "../Model/manageImages.js";
import { handlePythonScripts } from "../middlewares/pythonSpawn.js";

export const getImages = async (req, res) => {
  try {
    const images = await ImagesManagement.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};

export const postImage = (upload) => async (req, res) => {
  try {
    //handling uploaded file
    const file = await new Promise((resolve, reject) => {
      upload.single("image")(req, res, (err) => {
        if (err) reject(err);
        resolve(req.file);
      });
    });

    const result = await handlePythonScripts("app.py", file.path);

    console.log(result)
    const imagePath = new ImagesManagement({
      imageFile: file.path,
      resultImage: result.data
    });

    console.log(imagePath)
    ;

    await imagePath.save();

    //display upload file status
    res.status(201).json({
      ok: true,
      msg: "File uploaded successfully",
    });
  } catch (err) {
    //Handling errors
    return res.status(500).json({
      msg: err,
    });
  }
};
