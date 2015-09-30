var express = require('express');
var exec = require('child_process').exec;
var log = require('util').log;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res/*, next*/) {
    res.render('index', { title: 'Døråpner' });
});

router.post('/', function (req, res/*, next*/) {
    var errors = {};
    if (!req.body.phone) {
        errors.phone = 'Må fylles ut';
    }
    if (!req.body.code) {
        errors.code = 'Må fylles ut';
    }

    if (req.body.code === '3146') {
        log('OPEN: ' + req.body.phone + ' ' + req.body.code);

        exec('/usr/local/bin/unlock', function (/*error, stdout, stderr*/) {
            // TODO: Error logging
        });

        res.redirect('/confirmation');
        return;
    }
    else if (!errors.code) {
        errors.code = 'Ikke gyldig';
    }

    res.render('index', {
        title: 'Døråpner',
        data: req.body,
        errors: errors
    });
});

router.get('/confirmation', function (req, res/*, next*/) {
    res.render('confirmation', {
        title: 'Velkommen inn'
    });
});

module.exports = router;
