const jwt = require("jsonwebtoken");

const config = process.env;
/*
Authenticate the access token sent in the request header by the user.
If no access tokens are sent, an error message will appear stating that an access token is required.
If the access token is invalid, this function will also return an error.
 */
const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({"error" : "A token is required for authentication"});
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send({"error" : "Invalid Token"});
    }
    return next();
};

module.exports = verifyToken;