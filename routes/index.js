var express = require('express');
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
        // TODO: Logging
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
