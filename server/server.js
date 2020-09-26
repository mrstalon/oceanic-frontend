const express = require('express');
const path = require('path');
const ejs = require('ejs');

const PORT = process.env.PORT || 5000;
const STATIC_PATH = path.join(__dirname, '../client-dist/static');
const VIEWS_PATH = path.join(__dirname, '../client-dist');

const app = express();

app.use('/static', express.static(STATIC_PATH));
app.engine('html', ejs.renderFile);

app.set('views', VIEWS_PATH);
app.set('view engine', 'html');

app.get('*', (req, res) => res.render('index'));

app.listen(PORT, () => console.log('Server is listening'))
  .on('error', (err) => console.log(err));
