const router = require("express").Router()
const authController = require("../Controllers/authController")
const authMiddleware = require("../Middleware/authMiddleware")

//user Route
router.post("/users/register",authController.userRegister)
router.post("/users/login", authController.userLogin)

//admin Route
router.get("/admin/getusers", authController.getUsers)
router.post("/admin/adminregister",authController.adminRegister)
router.post("/admin/adminlogin", authController.adminLogin)

module.exports = router