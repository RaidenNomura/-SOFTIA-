# -SOFTIA-

Une base SQL du nom de "data_stock" est nécessaire pour fonctionner

Voici un exemple pour la base SQL.

USE data_stock;

---

INSERT INTO convention 
VALUES ('1', 'Microsoft', '42');

---

INSERT INTO etudiant 
VALUES ('1', 'Bond', 'James', '007@gmail.com', (SELECT idConvention FROM convention WHERE idConvention = 1));

---

INSERT INTO attestation
VALUES ('1', 
'Bonjour #NOM_ETUDIANT# #PRENOM_ETUDIANT#,
Vous avez suivi #nbHeur# de formation chez FormationPlus.
Pouvez-vous nous retourner ce mail avec la pièce jointe signée.
Cordialement,
FormationPlus', 
(SELECT idEtudiant FROM etudiant WHERE idEtudiant = 1), (SELECT idConvention FROM convention WHERE idConvention = 1));