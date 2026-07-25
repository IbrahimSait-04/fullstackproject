const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../Models/userSchema");
const bcrypt = require("bcryptjs");
const Admin = require("../Models/adminModel");


const JWT_SECRET = "Knight*58410";

const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailExist = await Admin.findOne({ email });
    if (emailExist) {
      return res.status(409).send("Email Already Exists");
    }
    const salt = await bcrypt.genSalt();
    const hashedpass = await bcrypt.hash(password, salt);
    const admin = new Admin({ name, email, password: hashedpass });
    await admin.save();
    res.status(200).send("admin Registered Succesfully");
  } catch (error) {
    console.log(error);
  }
};

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).send("Email Already Exists");
    }
    const salt = await bcrypt.genSalt();
    const hashedpass = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashedpass });
    await user.save();
    res.status(200).send("User Registered Succesfully");
  } catch (error) {
    console.log(error);
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).send("Admin Not Found");
    }
    const isPassMatch = await bcrypt.compare(password, admin.password);
    if (!isPassMatch) {
      return res.status(401).send("Password Doesnt Match");
    }
    const adminToken = await jwt.sign({ adminId: admin._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log(adminToken);
    res.status(200).json({
      message: "Login Success",
      success: true,
      adminToken,
      admin,
    });
  } catch (error) {
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    if(user.ban){
      return res.status(403).json({
        success:false,
        message:"Your Account Has Been Banned By Admin"
      })
    }
    const isPwdMatch = await bcrypt.compare(password, user.password);
    console.log(isPwdMatch);
    if (!isPwdMatch) {
      return res.status(401).send("Password Does'nt Match");
    }
    const authToken = await jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log(authToken);
    res
      .status(200)
      .json({ message: "Login success", success: true, authToken, user });
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userRegister,
  userLogin,
  getUsers,
  adminRegister,
  adminLogin,
};
