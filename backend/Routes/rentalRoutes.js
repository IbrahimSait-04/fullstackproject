const router = require("express").Router();
const rentalController = require("../Controllers/rentalController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../Middleware/authMiddleware");

router.post("/bookcar", authMiddleware, rentalController.bookCar);
router.get("/myrentals/:userId", authMiddleware, rentalController.getMyBooking);
router.post("/availablecars", authMiddleware, rentalController.availableCars);
router.get("/allbookings", adminMiddleware, rentalController.getAllBooking);
router.put(
  "/confirm-return/:id",
  adminMiddleware,
  rentalController.confirmReturn,
);
router.put(
  "/cancel-booking/:id",
  adminMiddleware,
  rentalController.cancelBooking,
);
router.put(
  "/cancel-booking/:id",
  authMiddleware,
  rentalController.cancelBooking,
);

router.put(
  "/update-refund/:id",
  adminMiddleware,
  rentalController.updateRefundStatus,
);

module.exports = router;
