const router = require("express").Router();
const carController = require("../Controllers/carController");
const { upload, uploadToCloudinary } = require("../Middleware/multer");
const {
  authMiddleware,
  adminMiddleware,
} = require("../Middleware/authMiddleware");

router.post(
  "/create",
  adminMiddleware,
  upload.single("img"),
  uploadToCloudinary,
  carController.createCar,
);
router.get("/getCars", carController.getCar);

router.put(
  "/update/:id",
  adminMiddleware,
  upload.single("img"),
  uploadToCloudinary,
  carController.updateCar,
);

router.delete("/delete/:id", adminMiddleware, carController.deleteCar);

module.exports = router;
