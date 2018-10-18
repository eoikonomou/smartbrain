const redisClient = require('../server').redisClient;

const setToken = (token, id) => {
    return new Promise((resolve, reject) => {
        return redisClient.set(token, id, (err, reply) => {
            console.log({ token, id, err, reply });
            if (err || !reply) {
                return reject(err || 'A problem occurred generating the token');
            }
            return resolve(redisClient.set(token, id));
        });
    });

}

const getAuthTokenId = (req, res) => {
    const { authorization } = req.headers;
    redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            res.status(400).json('Unauthorized');
        } else {
            res.json({ id: reply });
        }
    });
}

module.exports = {
    setToken,
    getAuthTokenId
}
