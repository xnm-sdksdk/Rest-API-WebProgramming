const config = {
    USER: process.env.DB_USER || 'Students Support',
    PASSWORD: process.env.DB_PASSWORD || "12345",
    DB: process.env.DB || "Cluster0"
};

config.URL = `mongodb+srv://${config.USER}:${config.PASSWORD}@cluster0.u9z6ifo.mongodb.net/${config.DB}?retryWrites=true&w=majority`

module.exports = config;


// mongodb+srv://40210260:<password>@cluster0.u9z6ifo.mongodb.net/?retryWrites=true&w=majority