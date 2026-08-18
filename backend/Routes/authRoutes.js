const router = require("express").Router();
const {banUser , updateLicenseStatus} = require("../Controllers/adminController");
const authController = require("../Controllers/authController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../Middleware/authMiddleware");

//user Route
router.post("/users/register", authController.userRegister);
router.post("/users/login", authController.userLogin);
router.post("/forgot-password", authController.forgotPass);
router.post("/reset-password/:id/:token", authController.resetPass);
router.put("/users/license", authMiddleware, authController.updateLicense);
router.get("/user/profile", authMiddleware, authController.getMyProfile)

//admin Route
router.get("/admin/getusers", adminMiddleware, authController.getUsers);
router.post("/admin/adminregister", authController.adminRegister);
router.post("/admin/adminlogin", authController.adminLogin);
router.put("/admin/license-status/:id", adminMiddleware, updateLicenseStatus );

//ban Route
router.put("/toggleBan/:id", adminMiddleware, banUser);

module.exports = router;
