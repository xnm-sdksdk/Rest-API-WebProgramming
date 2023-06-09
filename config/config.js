const config = {
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB,
  SECRET: process.env.SECRET,
};

config.URL = `mongodb+srv://${config.USER}:${config.PASSWORD}@cluster0.u9z6ifo.mongodb.net/${config.DB}?retryWrites=true&w=majority`;

module.exports = config;
