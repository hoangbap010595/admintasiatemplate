var appConfig = {
    APP_VERSION: "1.0.0",
    APP_SECRET: "MjAyMC4wMy4wMyxBdXRoZW5pY2F0aW9uTm9kZUpT==",
    API_KEY: "MjAyMC4wMy4wMyxBUElLZXlOb2RlSlM=",
    APP_KEY_SESSION: "sid",
    APP_FOLDER_PUBLIC: "public",
    API_ResponseResult: (status, message, data) => {
        var dataReturn = {
            status: status,
            message: message,
            data: data,
        }
        return dataReturn;
    }
}

module.exports = appConfig;