module.exports.getEnv = function() {
  let currentEnv = "local";
  let allEnv = require('../env_variables/env.js');
  return allEnv[currentEnv];
};
