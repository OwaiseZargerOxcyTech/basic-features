const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fileController = require("../controllers/fileController");

router.post("/add-data", fileController.addData);
router.post('/upload-data', upload.single('file'), fileController.fileUpload);
router.get("/get-data", fileController.getData);
router.get('/data/:id', fileController.getSingleData);
router.get('/download/:id', fileController.downloadFileById);
router.get('/download', fileController.downloadAllData);



module.exports = router;
