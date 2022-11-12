module.exports = {
    port: process.env.PORT || 8081,
    db: {
        test: "mongodb://localhost:27017/test",
        // test: "mongodb://localhost:27017/test",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: process.env.ACCESS_TOKEN_SECRET || "development_secret",
        refreshSecret: process.env.REFRESH_TOKEN_SECRET || "refresh_secret",
        expiry: "1d",
        companyViewerLinkExpiry: "7d",
        refreshExpiry: "30d",
    },
    NODE_ENV: process.env.NODE_ENV || "development",
};
