var express = require('express');
var router = express.Router();
const { v4: uuid } = require('uuid');

const jsonStringObject = `{
  "name" : "UBC",
  "description" : "One of the best universities in British Columbia and Canada",
  "price" : 32,
  "imageURL" : "https://pbs.twimg.com/profile_images/1174018931532550144/jRmFjhVX_400x400.png"
}`;

let items = [];

let initiated = 0;

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (initiated === 0) {
    const initItem = JSON.parse(jsonStringObject);
    const item = { 
      id: uuid(), 
      name: initItem.name,
      description : initItem.description,
      price : initItem.price,
      imageURL : initItem.imageURL
    };
    items.push(item);
    initiated = 1;
  }

  const sort = Number(req.query.sort);

  if (sort > 1) {
    items = items.sort((a,b) => {
      return a["price"] > b["price"] ? 1 : -1;
    });
  } else if (sort < 0) {
    items = items.sort((a,b) => {
      return a["price"] < b["price"] ? 1 : -1;
    });
  } 

  const newArray = items.map((item) => {
    return {id: item.id, name: item.name, imageURL : item.imageURL}
  });

  return res.send(newArray);
});

router.get('/:itemId', function (req, res, next) {
  const foundItem = items.find(item => item.id === req.params.itemId);
  
  if (!foundItem) return res.status(404).send({ message: 'Item not found' });

  return res.send(foundItem);
});

router.delete('/:itemId', function (req, res, next) {
  const foundItem = items.find(item => item.id === req.params.itemId);
  
  if (!foundItem) return res.status(404).send({ message: 'Item not found' });

  const index = items.indexOf(foundItem);
  items.splice(index, 1);
  res.send(req.params.itemId);
});

router.post('/', function (req, res, next) {
  if (
    !req.body.name 
    || !req.body.description 
    || !req.body.price
    || !req.body.imageURL
    ) {
    return res.status(400).send({ message: 'item missing params!' })
  }
  const item = { 
    id: uuid(), 
    name: req.body.name,
    description : req.body.description,
    price : req.body.price,
    imageURL : req.body.imageURL
  };
  items.push(item);
  return res.send(item);
});

router.patch('/:itemId', function (req, res, next) {
  const foundItem = items.find(item => item.id === req.params.itemId);
  
  if (!foundItem) return res.status(404).send({ message: 'User not found' });

  foundItem.name = req.body.name ? req.body.name : foundItem.name;
  foundItem.description = req.body.description ? req.body.description : foundItem.description;
  foundItem.price = req.body.price ? req.body.price : foundItem.price;
  foundItem.imageURL = req.body.imageURL ? req.body.imageURL : foundItem.imageURL;


  return res.send(foundItem);
});

module.exports = router;
