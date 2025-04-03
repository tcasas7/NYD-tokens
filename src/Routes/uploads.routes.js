const express = require("express")
const multer = require("multer")
const router = express.Router()


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname
    cb(null, uniqueName)
  }
})

const upload = multer({ storage })


router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" })

  const imageUrl = `/uploads/${req.file.filename}` 
  res.json({ imageUrl })
})

module.exports = router
