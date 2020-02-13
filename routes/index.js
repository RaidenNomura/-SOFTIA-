const { Router } = require('express'), router = Router();

router.get('/', function(req, res, next) {
    var users;
    var conventions;
    var attestations;

    req.db.query('SELECT * FROM etudiant', function (error, results, fields) {
        if (error) throw error;

        users = results;
        req.db.query('SELECT * FROM convention', function (error2, results2, fields2) {
            if (error2) throw error2;

            conventions = results2;
            req.db.query('SELECT * FROM attestation', function (error3, results3, fields3) {
                if (error3) throw error3;
                attestations = results3;
                res.status(200).render('index', {
                    title: 'test',
                    users,
                    conventions,
                    attestations
                });
            }).on('error', function(err) {
                if (err) throw err;
            })
        }).on('error', function(err) {
            if (err) throw err;
        })
    }).on('error', function(err) {
        if (err) throw err;
    })
});

module.exports = router;