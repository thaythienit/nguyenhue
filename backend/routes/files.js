const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cấu hình Cloudinary (nó sẽ tự động đọc các biến môi trường bạn đã thêm trên Render)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cấu hình nơi lưu trữ file trên Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'upload', // Tên thư mục trên Cloudinary
    allowed_formats: ['jpg', 'png', 'pdf', 'mp4', 'doc'] // Các định dạng cho phép
  }
});

// Khởi tạo multer để sử dụng bộ lưu trữ Cloudinary
const upload = multer({ storage: storage });

// --- BẠN KHÔNG CẦN fs.mkdirSync NỮA ---
// const fs = require('fs');
// const uploadDir = '/var/data/uploads';
// if (!fs.existsSync(uploadDir)) { ... } // XÓA TOÀN BỘ PHẦN NÀY

// Khi bạn dùng trong route (ví dụ)
// router.post('/upload', upload.single('file'), (req, res) => {
//   // File đã được tải lên Cloudinary
//   // Đường dẫn file nằm trong req.file.path
//   res.json({
//     message: "File uploaded successfully!",
//     url: req.file.path // Đây là URL của Cloudinary
//   });
// });

// Bạn cần export 'upload' để dùng trong file route chính
module.exports = upload;
