import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1E9);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'video/mp4',
        'video/mov',
        'video/quicktime',
        'video/x-msvideo'
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only video files are allowed'));
    }
};

export const uploadVideoFile = multer({
    storage,
    fileFilter
});