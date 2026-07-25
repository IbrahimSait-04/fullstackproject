const router = require("express").Router();
const rentalController = require("../Controllers/rentalController");
const { authMiddleware , adminMiddleware } = require("../Middleware/authMiddleware");

router.post("/bookcar",authMiddleware,rentalController.bookCar);
router.get("/myrentals/:userId",authMiddleware,rentalController.getMyBooking);
router.post("/availablecars",authMiddleware,rentalController.availableCars);
router.get("/allbookings",adminMiddleware,rentalController.getAllBooking);

module.exports = router;
