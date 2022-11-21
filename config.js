module.exports = {
    port: process.env.PORT || 8081,
    db: {
        test: "mongodb+srv://admin:admin@cluster0.kkltqgs.mongodb.net/?retryWrites=true&w=majority",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: process.env.ACCESS_TOKEN_SECRET || "development_secret",
        refreshSecret: process.env.REFRESH_TOKEN_SECRET || "refresh_secret",
        expiry: "1d",
        refreshExpiry: "30d",
    },
    NODE_ENV: process.env.NODE_ENV || "development",
};
