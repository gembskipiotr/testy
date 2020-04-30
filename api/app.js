const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const routes = require('./routes');
const config = require('./config');

const app = express();
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '2048kb'}));

app.use(cors());

mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.info('Connect with database established');
    }
});

process.on('SIGINT', () => {
    mongoose.connection.close(function () {
      console.error('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
});

routes(app);

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(config.port, function () {
  console.info(`Server is running at ${config.port}`)
});
