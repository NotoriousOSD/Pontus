const express = require('express');
const entryRoute = express.Router();

// Entry model
let Entry = require('../models/Entry');

// Add Entry
entryRoute.route('/entries').post((req, res, next) => {
    console.log("/entries POST received");
    console.log(req.body);
    Entry.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// Get All Entries
entryRoute.route('/entries').get((req, res, next) => {
    console.log('/entries GET received:');
    Entry.find({}).sort('date').exec(function(error, data)  {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// Get single entry
entryRoute.route('/entries/:id').get((req, res, next) => {
    console.log('/entries/:id GET received');
    Entry.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});


// Update entry
entryRoute.route('/entries/:id').put((req, res, next) => {
    console.log('/entries/:id PUT received');
    Entry.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error);
            return next(error);
        } else {
            res.json(data);
            console.log('Data updated successfully');
        }
    })
});

// Delete entry
entryRoute.route('/entries/:id').delete((req, res, next) => {
    console.log('/entries/:id DELETE received');
    Entry.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            });
        }
    });
});

module.exports = entryRoute;
