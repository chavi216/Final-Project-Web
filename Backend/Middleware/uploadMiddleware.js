
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
    // השארתי את התמיכה בתמונות, וידאו, והוספתי קבצי טקסט
    const allowedTypes = [
        'video/mp4',
        'video/mov',
        'video/quicktime',
        'video/x-msvideo',
        'image/jpeg',
        'image/png',
        'image/jpg',
        'text/plain' // <-- הוספנו את זה בשביל הבלוגים
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        // עדכנו את הודעת השגיאה שתכלול גם טקסט
        cb(new Error('Only video, image, and text files are allowed'));
    }
};

// החזרנו את השם המקורי כדי שהפרויקט יעבוד בלי לשנות את כל ה-Routes
export const uploadVideoFile = multer({
    storage,
    fileFilter
});

