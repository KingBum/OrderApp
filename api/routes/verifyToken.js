const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    const token = authHeader.split(' ')[1]
    if (!token) res.status(401).json("You are not authenticated!")

    jwt.verify(token, process.env.KEY_SECRET_TOKEN, (err, data) => {
        if (err) res.status(403).json("Token is not valid!");
        req.user = data
        next()
    })
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

module.exports = { verifyToken, verifyTokenAndAdmin }