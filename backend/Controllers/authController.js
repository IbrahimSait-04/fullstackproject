const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../Models/userSchema");
const bcrypt = require("bcryptjs");
const Admin = require("../Models/adminModel");
const transporter = require("../config/nodeMailer");

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
    if (user.ban) {
      return res.status(403).json({
        success: false,
        message: "Your Account Has Been Banned By Admin",
      });
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

const updateLicense = async (req, res) => {
  try {
    const { license } = req.body;

    if (!license) {
      return res.status(400).send("License is required");
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).send("User Not Found");
    }

    user.license = license;
    user.licenseStatus = "Pending";

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Driving License Submitted For Verification",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
};

const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const forgotPass = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User Not Found");
    }

    const token = await jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    const resetLink = `http://localhost:3000/reset-password/${user._id}/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Password",
      html: `
    <h2>Reset Password</h2>

    <p>Click the link below to reset your password:</p>

    <a href="${resetLink}">
      Reset Password
    </a>
  `,
    };
    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      success: true,
      message: "Password reset email sent.",
    });
  } catch (error) {
    console.log(error);
  }
};

const resetPass = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;
    await jwt.verify(token, JWT_SECRET);

    const salt = await bcrypt.genSalt();
    const hashedpass = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate(id, {
      password: hashedpass,
    });

    return res.status(200).json({
      success: true,
      message: "Password Updated Succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};
module.exports = {
  userRegister,
  userLogin,
  getUsers,
  adminRegister,
  adminLogin,
  getMyProfile,
  forgotPass,
  resetPass,
  updateLicense,
};
