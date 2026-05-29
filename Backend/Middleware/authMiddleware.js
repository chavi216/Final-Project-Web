import jwt from 'jsonwebtoken';

// פונקציה 1: בודקת שיש טוקן בתוקף ומחלצת ממנו את המשתמש
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    // בודקים אם נשלח ההדר של ההרשאה
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // חותכים את המילה Bearer ומקבלים רק את הטוקן

    try {
        // פענוח הטוקן בעזרת המפתח הסודי שלנו
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // שומרים את פרטי המשתמש (ID ו-role) לבקשה
        next(); // מעבירים הלאה לפונקציה הבאה (או לקונטרולר)
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

// פונקציה 2: מוודאת שהמשתמש (שכבר פוענח) הוא אדמין
export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};

// פונקציה 3: מוודאת שהמשתמש הוא תזונאי (או אדמין)
export const isNutritionist = (req, res, next) => {
    if (req.user.role !== 'nutritionist' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Nutritionists only.' });
    }
    next();
};

// פונקציה 4: מוודאת שהמשתמש הוא מאמן (או אדמין)
export const isTrainer = (req, res, next) => {
    if (req.user.role !== 'trainer' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Trainers only.' });
    }
    next();
};

// פונקציה 5: מוודאת שהמשתמש הוא לקוח (או אדמין)
export const isClient = (req, res, next) => {
    if (req.user.role !== 'client' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Clients only.' });
    }
    next();
};