import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ error: 'Unauthorized' });

    const jwtSecret = process.env.JWT_SECRET;

    jwt.verify(token, jwtSecret, (err, data) => {
        if (err) return res.status(403).json({ error: 'Forbidden' });
        req.userId = data.user_id;
        next();
    });
};

export default authenticateToken;