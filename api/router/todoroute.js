const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = require('../model/TodoItem');
router.get('/', (req, res) => {
  Item.find()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        data: docs.map(doc => {
          return {
            _id: doc._id,
            title: doc.title
          };
        })
      });
    })
    .catch(error => {
      res.status(500).json({
        error: 'Error in fetching Todo Item'
      });
    });
});

router.get('/:id', (req, res) => {
  Item.find({ _id: req.params.id })
    .exec()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({
        error: 'Error in fetching Todo Item'
      });
    });
});

router.post('/', (req, res) => {
  const ItemTemp = new Item({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title
  });

  ItemTemp.save()
    .then(docs => {
      res.status(200).json({
        message: 'Item added Successfullly'
      });
    })
    .catch(error => {
      res.status(500).json({
        error: 'Error in adding Item'
      });
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Item.deleteOne({ _id: id })
    .exec()
    .then(docs => {
      res.status(200).json({
        message: 'Item removed Successfullly'
      });
    })
    .catch(error => {
      res.status(500).json({
        error: 'Error in adding Item'
      });
    });
});

router.delete('/', (req, res) => {
  Item.deleteMany({})
    .exec()
    .then(docs => {
      res.status(200).json({
        message: 'Deleted all data'
      });
    })
    .catch(error => {
      res.status(500).json({
        error: 'Error in Deleting Item'
      });
    });
});

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  Item.updateOne({ _id: id }, { $set: { title: req.body.title } })
    .exec()
    .then(docs => {
      res.status(200).json({
        message: 'Update Done',
        docs
      });
    })
    .catch(error => {
      res.status(500).json({
        error: 'Error while updating'
      });
    });
});

module.exports = router;
