INSERT INTO convention ()

 INSERT INTO etudiant (nom, prenom, mail, Convention)
 VALUES ('Doe', 'John4', 'ZZZ@YYY',
    (SELECT idConvention FROM convention WHERE idConvention = 1));