# sequelizesample

A barebones Node.js app using [Restify 4.3.0](https://github.com/restify/node-restify).

## Running Locally

Make sure you have [Node.js 6.9.1+](http://nodejs.org/) and the Database Service installed & ready to connect.

```sh
git clone git@github.com:restify/node-restify.git
cd sequelizesample
npm install
npm start (or, node src/index.js)
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

## Deploying on a production server
Using [Browserify](https://github.com/substack/node-browserify#usage)

```
cd sequelizesample
browserify src/index.js > dist/deploy.js
```

## Pull Request
Feel free to fork and apply these samples in your work.
Pull requests are welcome if you think it might help others learn further.