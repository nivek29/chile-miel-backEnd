const TOKEN_LIFETIME = 60 * 60 * 24;
module.exports = {
  mongo_url: process.env.MONGO_URI,
  jwt: {
    secret: process.env.JWT_SECRET,
    life: TOKEN_LIFETIME,
  },
  argon: {
    length: process.env.ARGON_LENGTH,
    time_cost: process.env.ARGON_TIME_COST,
    parallelism: process.env.ARGON_PARALLELISM,
  },
};
