// routes/files.js

const express = require('express');
const router = express.Router(); // <-- Quan trọng: Tạo một router

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cấu hình Cloudinary (nó sẽ tự động đọc các biến môi trường)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cấu hình nơi lưu trữ file trên Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'nguyenhue-uploads', // Tên thư mục trên Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'mp4']
  }
});

// Khởi tạo multer để sử dụng bộ lưu trữ Cloudinary
const upload = multer({ storage: storage });

// --- TẠO MỘT ROUTE ĐỂ UPLOAD FILE ---
// Khi bạn gọi POST /api/files/upload (giả sử file index.js dùng /api/files)
// 'file' là tên của trường (field) trong form-data
router.post('/upload', upload.single('file'), (req, res) => {

  // Nếu không có file
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  // Nếu có file, Cloudinary đã xử lý xong
  // Đường dẫn file nằm trong req.file.path
  res.status(200).json({
    message: 'File uploaded successfully!',
    url: req.file.path // <-- Đây là URL bạn sẽ lưu vào database
  });
});

// --- QUAN TRỌNG ---
// Export router (bộ định tuyến) thay vì export đối tượng 'upload'
module.exports = router;
