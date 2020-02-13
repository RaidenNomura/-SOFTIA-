const { Router } = require('express'), router = Router();

router.post('/', function(req, res, next) {
    if (!req.body.student || !req.body.message) return res.status(400).redirect('/');

    req.db.query('SELECT * FROM etudiant', function (error, results, fields) {
        if (error) throw error;

        user = results.find((u) => u.idEtudiant == req.body.student);
        if (!user) res.status(404).redirect('/');
        req.db.query('SELECT * FROM attestation', function (error2, results2, fields2) {
            if (error2) throw error2;
            req.db.query('INSERT INTO attestation VALUES (\'' + (results2.length + 1) + '\', \'' + req.body.message + '\', (SELECT idEtudiant FROM etudiant WHERE idEtudiant = ' + user.idEtudiant + '), (SELECT idConvention FROM convention WHERE idConvention = ' + user.Convention + '));', function (error3, results3, fields3) {
                if (error3) throw error3;
                res.redirect('/show/' + (results2.length + 1));
            }).on('error', function(err) {
                if (err) throw err;
            });
        }).on('error', function(err) {
            if (err) throw err;
        });
    }).on('error', function(err) {
        if (err) throw err;
    });
});

router.get('/:id', function(req, res, next) {
    var user;
    var convention;
    var attestation;

    if (!req.params.id) return res.status(400).redirect('/');
    req.db.query('SELECT * FROM attestation WHERE idAttestation = ' + req.params.id, function (error, results, fields) {
        if (error) throw error;
        attestation = results[0];
        req.db.query('SELECT * FROM etudiant WHERE idEtudiant = ' + attestation.Etudiant, function (error2, results2, fields2) {
            if (error2) throw error2;
            user = results2[0];
            req.db.query('SELECT * FROM convention', function (error3, results3, fields3) {
                if (error3) throw error3;
                convention = results3[0];
                res.status(200).render('show', {
                    title: 'test',
                    user,
                    convention,
                    attestation
                });
            }).on('error', function(err) {
                if (err) throw err;
            });
        }).on('error', function(err) {
            if (err) throw err;
        });
    }).on('error', function(err) {
        if (err) throw err;
    })
});

module.exports = router;