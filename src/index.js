const express = require('express');
const path = require('path');
const multer = require('multer');
const { v4 } = require('uuid');

// Initilizations
const app = express();

// settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Midleware
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, v4() + path.extname(file.originalname));
    }
});

app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/uploads'),
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        const fileType = /jpeg|jpg|png|gif/;
        const mimetype = fileType.test(file.mimetype);
        const extname = fileType.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: Archivo debe ser una imagen valida");
    }
}).single('image'));

// Routes
app.use(require('./routes/index.routes'));

// Static file
app.use(express.static(path.join(__dirname, 'public')));

// start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${3000}`);
});