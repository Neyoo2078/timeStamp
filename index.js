// index.js
// where your node app starts

// init project
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dateToUTCKey } from './utils/dateToUtc.js';
import path from 'path';
import pkg from 'app-root-path';
var app = express();

dotenv.config();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const { path: arp } = pkg;
const root = path.resolve(arp, '../'); // the parent of the root path
console.log({ root });
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(root + '/public/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// get date Api
app.get('/api/:date', function (req, res) {
  const { date } = req.params;

  if (!date || date === 'undefined') {
    const utc = dateToUTCKey(new Date());
    res.status(200).json({ utc: utc.utcKey, unix: utc.unixTimestamp });
    return;
  }
  const dateCheck = date.includes('-') ? date : parseInt(date);
  const dateValid = new Date(dateCheck);

  const isDateValid = !isNaN(dateValid);
  if (!isDateValid) {
    res.status(400).json('invalid date');
  } else {
    const utc = dateToUTCKey(dateValid);

    // res.json({ utc: utc.utcKey, unix: utc.unixTimestamp });
    res.status(200).json({ utc: utc.utcKey, unix: utc.unixTimestamp });
  }
});

console.log(process.env.PORT);
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
