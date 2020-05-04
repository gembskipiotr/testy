const config = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.MONGODB_URI || 'mongodb://localhost/testy',
    JwtSecret: process.env.JWT_SECRET || 'secret'
};

module.exports = config;
