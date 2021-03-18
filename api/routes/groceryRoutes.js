const express = require('express');
const router = express.Router();
const Grocery = require('../DB/models/Grocery');

router.get('/', (req, res) => {
  Grocery.find({})
    .then((groceries) => {
      res.send(groceries);
    })
    .catch((err) => {
      console.log('Groceries Not Found', err);
    });
});

router.post('/', (req, res) => {
  const newItem = new Grocery(req.body);
  Grocery.create(newItem)
    .then((res) => {
      'Item Added To DB';
    })
    .catch((err) => {
      console.log('Error Adding Item to DB', err);
    });
});

router.put('/:id', (req, res) => {
  Grocery.findByIdAndUpdate(req.params.id, { checked: req.body.checked })
    .then(() => {
      console.log('Item Updated server Side');
    })
    .catch((err) => {
      console.log('Error Updating server Side'.err);
    });
});

router.delete('/:id', (req, res) => {
  Grocery.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log('Item Deleted');
    })
    .catch('Error Deleting Server Side', err);
});

module.exports = router;
