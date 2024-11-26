import { NextApiRequest, NextApiResponse } from "next";

import { v2 as cloudinary } from "cloudinary";
import { db } from "./dpConfig";
import { Book } from "./schema";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { title, author, genre, description, file } = req.body;

      // Upload image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(file, {
        folder: "Book",
      });

      // Save book data to the database
      await db.insert(Book).values({
        title,
        author,
        genre,
        description,
        imagePublicId: uploadResult.public_id,
        imageUrl: uploadResult.secure_url,
      });

      res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).json({ error: "Failed to add book" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
