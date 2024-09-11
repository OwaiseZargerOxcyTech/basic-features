const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Set up multer to handle file uploads
const storage = multer.memoryStorage(); // Store file in memory temporarily
const upload = multer({ storage: storage });

const prisma = new PrismaClient();

const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    // Generate a slug for the filename
    const filenameParts = file.originalname.split(".");
    const fileExtension = filenameParts[filenameParts.length - 1];
    const slug = filenameParts[0]
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    // Upload the file to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: slug,
        folder: "blog_images", // Optional: Specify a folder in your Cloudinary account
      },
      async (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          return res.status(500).send("Internal Server Error");
        }

        try {
          // Insert the uploaded image information into the database
          await prisma.image.create({
            data: {
              title: slug,
              url: result.secure_url,
            },
          });

          // Respond with the URL of the uploaded image
          res.status(200).send({
            message: "File uploaded successfully",
            imageUrl: result.secure_url,
          });
        } catch (dbError) {
          console.error("Error saving to the database:", dbError);
          return res.status(500).send("Internal Server Error");
        }
      }
    );

    // Convert the buffer to a stream and pipe it to the Cloudinary uploader
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteImage = async (req, res) => {
  try {
    const { id, title } = req.body; // Extract the title from the request body

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    // Delete the image from Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.destroy(
      `blog_images/${slug}`, // Adjust based on how you are saving images in Cloudinary
      (error, result) => {
        if (error) {
          console.error("Error deleting from Cloudinary:", error);
          return res.status(500).send("Error deleting image from Cloudinary");
        }
        return result;
      }
    );

    // Check if deletion from Cloudinary was successful
    if (cloudinaryResponse.result !== "ok") {
      return res.status(500).send("Failed to delete image from Cloudinary");
    }

    // Delete the image record from the database
    await prisma.image.delete({
      where: { id },
    });

    res.status(200).send({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getImages = async (req, res) => {
  try {
    const images = await prisma.image.findMany();
    res.status(200).send({
      images,
    });
  } catch (error) {
    console.error("Error getting Image file:", error);
    res.status(500).send("Internal Server Error");
  }
};

const updateImage = async (req, res) => {
  try {
    const { id } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    // Fetch the existing image record to get the Cloudinary public_id
    const existingImage = await prisma.image.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existingImage) {
      return res.status(404).send("Image not found");
    }

    // Delete the existing image from Cloudinary
    const cloudinaryDeleteResponse = await cloudinary.uploader.destroy(
      `blog_images/${existingImage.title}`,
      (error, result) => {
        if (error) {
          console.error("Error deleting from Cloudinary:", error);
          return res
            .status(500)
            .send("Error deleting old image from Cloudinary");
        }
        return result;
      }
    );

    if (cloudinaryDeleteResponse.result !== "ok") {
      return res
        .status(500)
        .send("Failed to delete the old image from Cloudinary");
    }

    // Upload the new file to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: existingImage.title,
        folder: "blog_images",
      },
      async (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          return res
            .status(500)
            .send("Error uploading new image to Cloudinary");
        }

        try {
          // Update the image URL in the database
          await prisma.image.update({
            where: { id: parseInt(id, 10) },
            data: {
              url: result.secure_url,
            },
          });

          res.status(200).send({
            message: "Image updated successfully",
            imageUrl: result.secure_url,
          });
        } catch (dbError) {
          console.error("Error updating database:", dbError);
          return res.status(500).send("Error updating image in the database");
        }
      }
    );

    // Convert the buffer to a stream and pipe it to the Cloudinary uploader
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  upload,
  uploadImage,
  getImages,
  deleteImage,
  updateImage,
};
