const router = require("express").Router();
const carController = require("../Controllers/carController");
const { upload, uploadToCloudinary } = require("../Middleware/multer");

router.post(
  "/create",
  upload.single("img"),
  uploadToCloudinary,
  carController.createCar,
);
router.get("/getCars", carController.getCar);

router.put(
  "/update/:id",
  upload.single("img"),
  uploadToCloudinary,
  carController.updateCar,
);

module.exports = router;
