/**
 * remplirFeuilleCalculs ("fill the Calculs sheet")
 *
 * Google Apps Script bound to the project's Google Sheet.
 * Reads the Eurostat consumer price indices in the "Données" sheet and writes,
 * into the "Calculs" sheet:
 *   - 51 month-on-month growth-rate formulas (3 countries x 17 periods)
 *   - 15 summary formulas (first index, last index, AVERAGE, MAX, MIN per country)
 *
 * Note: in the "Données" sheet, every value column is followed by an Eurostat
 * flag column (e.g. "e" = estimated), so values sit in every other column
 * (B, D, F, ..., AJ).
 *
 * Original code, unchanged except for formatting (indentation, this header)
 * and "Function" -> "function".
 */
function remplirFeuilleCalculs() {

  var classeur = SpreadsheetApp.getActiveSpreadsheet();

  var feuilleCalculs = classeur.getSheetByName("Calculs");

  var colonnesCalcul = ["C", "E", "G", "I", "K", "M", "O", "Q", "S", "U", "W", "Y", "AA", "AC", "AE", "AG", "AI"];

  var colonnesAujourdhui = ["D", "F", "H", "J", "L", "N", "P", "R", "T", "V", "X", "Z", "AB", "AD", "AF", "AH", "AJ"];

  var colonnesAvant = ["B", "D", "F", "H", "J", "L", "N", "P", "R", "T", "V", "X", "Z", "AB", "AD", "AF", "AH"];

  var paysPremierTableau = [
    { ligneCalcul: 3, ligneDonnees: 10 },
    { ligneCalcul: 4, ligneDonnees: 11 },
    { ligneCalcul: 5, ligneDonnees: 12 }
  ];

  for (var p = 0; p < paysPremierTableau.length; p++) {

    var ligneC = paysPremierTableau[p].ligneCalcul;
    var ligneD = paysPremierTableau[p].ligneDonnees;

    for (var c = 0; c < colonnesCalcul.length; c++) {

      var colC = colonnesCalcul[c];
      var colAuj = colonnesAujourdhui[c];
      var colAv = colonnesAvant[c];

      var formuleTaux = "=('Données'!" + colAuj + ligneD + " - 'Données'!" + colAv + ligneD + ") / 'Données'!" + colAv + ligneD;

      feuilleCalculs.getRange(colC + ligneC).setFormula(formuleTaux);
    }
  }

  var synthese = [
    { colonne: "C", ligneCalcul: 4, ligneDonnees: 11 },
    { colonne: "E", ligneCalcul: 3, ligneDonnees: 10 },
    { colonne: "G", ligneCalcul: 5, ligneDonnees: 12 }
  ];

  for (var s = 0; s < synthese.length; s++) {

    var col = synthese[s].colonne;
    var ligC = synthese[s].ligneCalcul;
    var ligD = synthese[s].ligneDonnees;

    feuilleCalculs.getRange(col + "10").setFormula("='Données'!B" + ligD);
    feuilleCalculs.getRange(col + "11").setFormula("='Données'!AJ" + ligD);
    feuilleCalculs.getRange(col + "12").setFormula("=AVERAGE(C" + ligC + ":AI" + ligC + ")");
    feuilleCalculs.getRange(col + "13").setFormula("=MAX(C" + ligC + ":AI" + ligC + ")");
    feuilleCalculs.getRange(col + "14").setFormula("=MIN(C" + ligC + ":AI" + ligC + ")");
  }

  SpreadsheetApp.getUi().alert("Les calculs ont été appliqués.");
}
