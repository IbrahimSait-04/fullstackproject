const User = require("../Models/userSchema");

const banUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User Not Found");
    }

    user.ban = !user.ban;

    await user.save();

    res.status(200).json({
      success: true,
      message: user.ban
        ? "User Banned Succesfully"
        : "User UnBanned Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const updateLicenseStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Status",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (!user.license) {
      return res.status(400).json({
        success: false,
        message: "User Has Not Submited A License",
      });
    }

    user.licenseStatus = status;

    await user.save();
    return res.status(200).json({
      success: true,
      message: `License ${status} Successfully`,
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

module.exports = {banUser , 
  updateLicenseStatus};
