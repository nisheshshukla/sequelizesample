var restify = require('restify');
var server = restify.createServer();
var model = require('./model');

/* For simplicity, I use the random-name npm package to provision the db */
var random = require('random-name');

/**
 * Initialize the server: Give port and a message indicating its working.
 */
function init() {
    server.listen(3000, function () {
        console.log('%s listening at %s', server.name, server.url);
    });

    server.use(restify.bodyParser());
}

//

/**
 * This method adds all CRUD operations we support via our restify service.
 * For example purposes, I have provided samples of GET and POST.
 *
 */
function addRoutes() {
    //client says: add one sepcific user to the database
    server.post('/user', function (req, res, next) {
        model.user().sync({force: true}).then(function () {
            model.user().create({
                firstName: req.body['first'],
                lastName: req.body['last']
            });
        });
        res.send(200, "User Added!");

        return next();
    });
    //client says: return a specific user
    server.get('/user/:name', function (req, res, next) {

        var result = new Promise(function (resolve) {
            resolve(model.user().findOne({
                where: {
                    first_name: req.params['name']
                }
            }));
        });

        result.then(function (result) {
            res.send(200, result);
            return next();
        });
    });
    //client says: create random users based on the count and return them
    server.get('/createRandom/:count', function (req, res, next) {
        model.user().create({force: true}).then(function () {
            var i = 0;
            while (i < req.params.count) {
                model.user().create({
                    firstName: random.first(),
                    lastName: random.last()
                });
                i++;
            }

        });
        res.send(202, "Adding Users...");

        return next();
    });

    //client says: get all the users info and return them
    server.get('/alluser', function (req, res, next) {
        new Promise(function (resolve) {
            resolve(model.user().findAll())
        }).then(function (result) {
            res.send(200, result);
            return next();
        })
    });
    //client says: update a specific name, change from Alex -> Brian
    server.put('/user/:name', function (req, res, next) {
        model.user().update({
            firstName: req.body['first'],
            lastName: req.body['last']
        }, {
            where: {
                firstName: req.params['name']
            }
        })

        res.send(202, "User Updating!");

        return next();
    })
}


module.exports.init = init;
module.exports.addRoutes = addRoutes;