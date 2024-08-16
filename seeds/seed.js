const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedBook = require('./bookData');
const seedHolder = require('./holderData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedBook();

  await seedUser();

  await seedHolder();

  process.exit(0);
};

seedAll();