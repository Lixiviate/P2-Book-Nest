const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedBook = require('./bookData');
const seedHolder = require('./holderData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();
  await seedBook();
  await seedHolder();

  process.exit(0);
};

seedAll();
