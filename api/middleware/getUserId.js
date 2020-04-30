const getUserId = (req, res, next) => {
    res.currentUserId = req.headers['x-user-id'];
    next();
};

module.exports = getUserId;
