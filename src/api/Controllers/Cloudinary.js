const cloudinary = require("cloudinary");

const config = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
};

cloudinary.config(config);

exports.upload = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.body.img, {
    public_id: `${Date.now()}`,
    resource_type: "auto",
  });
  res.json({
    status: "Success",
    public_id: result.public_id,
    url: result.secure_url,
  });
};

exports.remove = (req, res) => {
  const id = req.body.public_id;
  cloudinary.uploader.destroy(id, (result, err) => {
    if (err)
      return res.status(500).json({
        status: "Error",
        err,
      });
    return res.json({
      status: "Success",
    });
  });
};
