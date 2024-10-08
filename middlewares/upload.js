import User from '../models/userModel.js';
import multer from 'multer';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname.split(' ').pop());
    },
});

const upload = multer({ storage: storage });

export default upload;