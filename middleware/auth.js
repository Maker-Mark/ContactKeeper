const jwt = require('jsonwebtoken');
const config = require("config");

//Middleware is a function that has access to the req/response cycle/object.
module.exports = function (req, res, next) {
    //Get the token from the header
    const token = req.header('x-auth-token');
    //Check if there is a token
    if (!token) {
        return res.status(401).json(({
            msg: "No token, authorization failed."
        }));
    }
    //If there is a token..
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded.user;
        next(); // move on
    } catch (err) {
        res.status(401).json({
            msg: "Token is invalid!"
        });
    }
}