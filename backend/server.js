const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const customerName = req.body.name.replace(/\s+/g, '_').toLowerCase();
    const uploadPath = path.join('uploads', customerName, 'uploaded_files');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'text/csv'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, XLSX, and CSV are allowed.'));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/kwanzatech', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  project: String,
  message: String,
  files: [{ filename: String, path: String }],
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Contact Endpoint
app.post('/api/contact', upload.array('files', 5), async (req, res) => {
  try {
    const { name, email, project, message } = req.body;
    const files = req.files.map(file => ({
      filename: file.filename,
      path: file.path
    }));

    const contact = new Contact({
      name,
      email,
      project,
      message,
      files
    });

    await contact.save();
    res.status(200).json({ message: 'Message and files saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving message and files' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));