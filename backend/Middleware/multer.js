const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { Readable } = require("stream");

// Store image temporarily in RAM
const storage = multer.memoryStorage();

// Multer configuration
const multerInstance = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Only JPG, JPEG, PNG and WEBP images are allowed"),
        false
      );
    }
  },
});

// Middleware for single image upload
const upload = {
  single: (fieldName) => (req, res, next) => {
    multerInstance.single(fieldName)(req, res, (err) => {
      if (err) return next(err);
      next();
    });
  },
};

// Upload image to Cloudinary
const uploadToCloudinary = (req, res, next) => {
  if (!req.file) return next();

  const stream = cloudinary.uploader.upload_stream(
    {
      folder: "cars",
    },
    (error, result) => {
      if (error) return next(error);

      // Save Cloudinary data in req.file
      req.file.path = result.secure_url;
      req.file.filename = result.public_id;

      next();
    }
  );

  Readable.from(req.file.buffer).pipe(stream);
};

module.exports = {
  upload,
  uploadToCloudinary,
};