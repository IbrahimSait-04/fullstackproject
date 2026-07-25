const router = require("express").Router();
const banUser = require("../Controllers/adminController");
const authController = require("../Controllers/authController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../Middleware/authMiddleware");

//user Route
router.post("/users/register", authController.userRegister);
router.post("/users/login", authController.userLogin);

//admin Route
router.get("/admin/getusers", adminMiddleware, authController.getUsers);
router.post("/admin/adminregister", authController.adminRegister);
router.post("/admin/adminlogin", authController.adminLogin);

//ban Route
router.put("/toggleBan/:id", adminMiddleware, banUser);

module.exports = router;
