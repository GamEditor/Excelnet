const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

const serverPort = 8000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// body parser
app.use(bodyParser.urlencoded({ extended: true }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.text()); // parse text/plain
app.use(bodyParser.json()); // parse application/json

// static folders
app.use(express.static('./downloads'));
app.use(express.static('./public'));

// creating files storage
if (!fs.existsSync('./downloads')) {
    fs.mkdirSync('./downloads');
}

app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/views/index.html`)
});

app.post('/getFile', function (req, res) {
    const date = new Date().valueOf();

    try {
        // if user wants a file with desired name.extension
        var userData = JSON.parse(req.body);

        const downloadPath = `./downloads/${date}`;
        const downloadLink = `/${date}`;    // downloads is used as static path. so i must remove it from download link in response

        fs.mkdir(downloadPath, function (err) {
            if (err) {
                console.log(err);
            } else {
                fs.writeFile(`${downloadPath}/${userData.file}`, userData.data, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(`${downloadLink}/${userData.file}`);
                        return;
                    }
                });
            }
        });

    } catch (err) {
        // if user wants a file without name.extension
        const downloadPath = `./downloads/${date}`;
        const downloadLink = `/${date}/${date}.txt`;

        fs.mkdir(downloadPath, function (err) {
            if (err) {
                console.log(err);
            } else {
                fs.writeFile(`${downloadPath}/${date}.txt`, req.body, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(downloadLink);
                        return;
                    }
                });
            }
        });
    }

    // res.send(req.body);
});

app.listen(serverPort, function () {
    console.log(`ExcelentServer is running on port ${serverPort}`);
});