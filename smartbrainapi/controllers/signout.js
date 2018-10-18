const redisUtils = require('../utils/redisUtils');

const handleSignOut = (req, res) => {
    const { authorization } = req.headers;
    redisUtils.removeToken(authorization)
        .then(res.json('OK'))
        .catch((err) => { console.log(err); res.status(400).json(err); });
}

module.exports = {
    handleSignOut
}
