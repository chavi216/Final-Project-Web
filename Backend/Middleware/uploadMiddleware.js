import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // השארתי את התמיכה בתמונות וגם בוידאו בתוך אותו פילטר
    const allowedTypes = [
        'video/mp4',
        'video/mov',
        'video/quicktime',
        'video/x-msvideo',
        'image/jpeg',
        'image/png',
        'image/jpg'
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only video and image files are allowed'));
    }
};

// החזרנו את השם המקורי כדי שהפרויקט יעבוד בלי לשנות את כל ה-Routes
export const uploadVideoFile = multer({
    storage,
    fileFilter
});