var Sequelize = require('sequelize');

/**
 * TODO: Add your DB Schema and User Credentials
 * For example purposes, I have used a mysql
 * db:name => demo with u/p (root/demo)
 *
 */
var db = new Sequelize('demo', 'root', 'demo', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        idle: 10000

    },
});

/**
 * Define your model entity here.
 * For example purposes, I have defined a user with first/last name.
 *
 * @returns {Model} Sequelize Entity Object
 */
function defineUser() {
    return db.define('user', {
        firstName: {
            type: Sequelize.STRING,
            field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
        },
        lastName: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });
}

module.exports.user = defineUser;
