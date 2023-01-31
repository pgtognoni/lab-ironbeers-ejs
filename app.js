const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try {
    const beerArr = await punkAPI.getBeers()
    res.render('beers', {beerArr});
  } catch (err) {
    console.log(err)
  }
});

app.get('/random-beer', async (req, res) => {
  try {
    const beerArr = await punkAPI.getRandom()
    res.render('randomBeer', {beerArr});
  } catch (err) {
    console.log(err)
  }
});

app.get('/beer-info/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)
  try {
    const beerArr = await punkAPI.getBeer(id)
    res.render('beerInfo', {beerArr});
  } catch (err) {
    console.log(err)
  }
});
app.listen(3000, () => console.log('Server on port 3000'));
