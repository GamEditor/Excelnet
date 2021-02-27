const express = require('express');
const app = express();

app.use(express.static('./public'));

app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/views/index.html`);
});

app.listen(8080, function () {
    console.log('client is runing on 8080...');
});