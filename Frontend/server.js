const express = require('express');
const axios = require("axios");
const dotenv = require("dotenv")


// const favicon = require('express-favicon');
const path = require('path');

dotenv.config({
  path:  '.env'
})
const port = process.env.REACT_APP_PORT || 3333;
const app = express();
// app.use(favicon(__dirname + '/build/favicon.ico'));

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;


app.listen(port);
process.stdout.write('Mithun Tech Blog serving at '+port)