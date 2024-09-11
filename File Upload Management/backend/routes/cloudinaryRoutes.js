const express = require("express");
const {
  upload,
  uploadImage,
  getImages,
  deleteImage,
  updateImage,
} = require("../controllers/cloudinaryController");

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);
router.get("/get-images", getImages);
router.delete("/delete-image", deleteImage);
router.put("/update-image", upload.single("image"), updateImage);

module.exports = router;
