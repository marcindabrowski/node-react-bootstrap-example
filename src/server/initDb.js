const Loki = require('lokijs');

const initDb = (app) => {
  const databaseInitialize = () => {
    /* eslint-disable no-use-before-define */
    let registeredClaims = db.getCollection('registeredClaims');
    if (registeredClaims === null) {
      registeredClaims = db.addCollection('registeredClaims');
    }
    /* eslint-enable no-use-before-define */
    app.set('registeredClaims', registeredClaims);
  };

  const db = new Loki('loki.json', {
    autoload: true,
    autoloadCallback: databaseInitialize,
    autosave: true,
    autosaveInterval: 4000,
  });
};

module.exports = initDb;
