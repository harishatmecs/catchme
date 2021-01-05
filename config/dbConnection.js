const Sequelize = require('sequelize');
const Environment = require('./env');
const TicketModel = require('../model/ticket');
const AccountModel = require('../model/account');

let Env = Environment.getEnv();

const sequelize = new Sequelize(Env.dbName, Env.dbUname, Env.dbPwd, {
  dialect: Env.dbDialect,
  port: Env.dbPort,
  host: Env.dbHost,
  pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
});
const Ticket = TicketModel(sequelize, Sequelize);
const Account = AccountModel(sequelize, Sequelize);
const Op = Sequelize.Op;

sequelize.sync({force: false}).then(() => {
  console.log('Database & tables created!');
});

module.exports = {
  Ticket,
  Account
};
