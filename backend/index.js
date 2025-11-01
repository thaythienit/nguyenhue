
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fileRoutes = require('./routes/files.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// Using a more permissive CORS for development. 
// For production, you should restrict the origin to your Vercel frontend URL.
app.use(cors()); 
app.use(express.json());

// Serve uploaded files statically
// Render mounts disks at /var/data/uploads, for local dev we use a root 'uploads' folder
const uploadsDir = process.env.UPLOADS_DIR || 'uploads';
app.use('/uploads', express.static(path.resolve(uploadsDir)));


// API Routes
app.use('/api/articles', require('./routes/articles'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/pages', require('./routes/pages'));
app.use('/api/files', require('./routes/files'));
app.use('/api/settings', require('./routes/settings'));

app.get('/', (req, res) => {
  res.send('School News Portal API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
