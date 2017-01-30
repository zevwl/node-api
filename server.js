require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const util = require('util');

const app = express();
const router = express.Router();
const port = process.env.PORT || 8080;

const Bear = require('./app/models/bear');

mongoose.connect(process.env.DB_URL);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware to use for all requests
router.use((req, res, next) => {
    util.log('Something is happening.');
    next();
});

router.get('/', (req, res) => res.json({ message: 'Welcome to our api!' }));

router.route('/bears')

    // Create a bear
    .post((req, res) => {

        let bear = new Bear();
        bear.name = req.body.name;

        bear.save((err, data) => {
            if (err) res.send(err);

            res.json({
                message: 'Bear created!',
                bear: data
            });
        });
    })

    // Get all bears
    .get((req, res) => {
        Bear.find((err, bears) => {
            if (err) res.send(err);

            res.json(bears);
        });
    })

router.route('/bears/:bear_id')

    // Get a specific bear
    .get((req, res) => {
        Bear.findById(req.params.bear_id, (err, bear) => {
            if (err) res.send(err);

            res.json(bear);
        });
    })

    // Update a specific bear
    .put((req, res) => {
        Bear.findById(req.params.bear_id, (err, bear) => {
            if (err) res.send(err);

            bear.name = req.body.name;

            bear.save((err, data) => {
                if (err) res.send(err);

                res.json({
                    message: 'Bear updated!',
                    bear: data
                });
            });
        });
    })

    // Delete a specific bear
    .delete((req, res) => {
        Bear.remove({ _id: req.params.bear_id }, (err, data) => {
            if (err) res.send(err);

            res.json({
                message: 'Successfully deleted!'
            });
        });
    })

app.use('/api', router);

app.listen(port, () => util.log(`Server is listening on port ${port}`));