/* Auteurs: PERSONNE 1 (matricule), PERSONNE 2 (matricule)
TODO : Remplacez ce commentaire par un commentaire expliquant
   l'utilité de ce programme
 */
function luminance(r, g, b) {
    return 0.2126*r + 0.7152*g + 0.0722*b;
}

function noirEtBlanc(imageOriginale) {
    var nouvelleImage = [];
    var luminancePixel = 0;

    for (i=0; i<imageOriginale.length; i++) {
        nouvelleImage[i] = [];
        for (j=0; j<imageOriginale[i].length; j++) {
            luminancePixel = luminance(imageOriginale[i][j].r, imageOriginale[i][j].g, imageOriginale[i][j].b);
            nouvelleImage[i][j] = {
                r : luminancePixel,
                g : luminancePixel,
                b : luminancePixel,
            }
        }
    } 
    return nouvelleImage; // Remplacer par la nouvelle image
}


function modifierClarte (v, quantite) {
    return Math.pow((v/255), quantite) * 255;
}
function correctionClarte(imageOriginale, quantite) {
    var nouvelleImage = [];

    for (i=0; i<imageOriginale.length; i++) {
        nouvelleImage[i] = [];
        for (j=0; j<imageOriginale[i].length; j++) {
            var pixelOriginal = imageOriginale[i][j];
            nouvelleImage[i][j] = {
                r : modifierClarte(pixelOriginal.r, quantite),
                g : modifierClarte(pixelOriginal.g, quantite),
                b : modifierClarte(pixelOriginal.b, quantite),
            }
        }
    }

    return nouvelleImage; // Remplacer par la nouvelle image
}



//rend flou un pixel
function modifierFlou (imageOriginale, i, j, taille) {
    // valeurs par defaut
    var nouveauPixel = { r: 0, g: 0, b: 0 }; // r g b

    if (taille % 2 == 0) {
       for (var x=i-(taille/2); x <= i+(taille/2) - 1; x++) {
            for (var y = j-(taille/2); y <= j+(taille/2) -1; y++) {
                // si negatif ignore
                // ignore si a l'exterieur de l'image
                if (y >= 0 && x >= 0
                    && x < imageOriginale.length && y < imageOriginale[0].length) {
                    nouveauPixel.r += imageOriginale[x][y].r / Math.pow(taille,2);
                    nouveauPixel.g += imageOriginale[x][y].g / Math.pow(taille,2);
                    nouveauPixel.b += imageOriginale[x][y].b / Math.pow(taille,2);
                }
                // si ca ne fait pas parti de l'image, rien n'est fait car c'est 0
            }
        }
    } else {
        for (var x=i - Math.floor(taille/2); x <= i+Math.floor(taille/2); x++) {
            for (var y = j-Math.floor(taille/2); y <= j+Math.floor(taille/2); y++) {
                if (y >= 0 && x >= 0
                    && x < imageOriginale.length && y < imageOriginale[0].length) {
                    nouveauPixel.r += imageOriginale[x][y].r / Math.pow(taille,2);
                    nouveauPixel.g += imageOriginale[x][y].g / Math.pow(taille,2);
                    nouveauPixel.b += imageOriginale[x][y].b / Math.pow(taille,2);
                }
            }
        }
    }
    return nouveauPixel;
}

//rend l'image floue
function flou(imageOriginale, taille) {
    var nouvelleImage = [];
    for (var i=0; i<imageOriginale.length; i++) {
        nouvelleImage[i] = [];
        for (var j=0; j<imageOriginale[i].length; j++) {
            nouvelleImage[i][j]  = modifierFlou(imageOriginale, i, j, taille);
        }
    }
    return nouvelleImage;
}
var creerMatrice = function (nbRangees, nbColonnes) {
    var resultat = Array(nbRangees);
    for (var i=0; i<nbRangees; i++) {
        resultat[i] = Array(nbColonnes);
    }
    return resultat;
};

//rend flou un pixel
function modifierContours(imageNoirEtBlanc, i, j) {
    var matrixV = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
    var matrixH = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
    var taille = 3;
    var xRef = 0;
    var yRef = 0;
    var hTotal = 0;
    var vTotal = 0;

    for (var x=i - Math.floor(taille/2); x <= i+Math.floor(taille/2); x++) {
        for (var y =j-Math.floor(taille/2); y <= j+Math.floor(taille/2); y++) {
            if (yRef > 2) {
                yRef = 0;
            }

            if (y >= 0 && x >= 0
                && x < imageNoirEtBlanc.length && y < imageNoirEtBlanc[0].length) {
                hTotal += imageNoirEtBlanc[x][y].r * matrixH[xRef][yRef];
                vTotal += imageNoirEtBlanc[x][y].r * matrixV[xRef][yRef];
            }
            yRef++
        }
        xRef++;
    }

    // fix
    var color = Math.max(Math.min(Math.max(hTotal, vTotal),  255), -255);
    return { r: color, g: color, b: color };
}


function detectionContours(imageOriginale) {
    // convert here or else it's slow converting all the time inside
    // modifiercontours
    var imageNoirEtBlanc = noirEtBlanc(imageOriginale);

    var nouvelleImage = [];
    for (var i=0; i<imageNoirEtBlanc.length; i++) {
        nouvelleImage[i] = [];
        for (var j=0; j<imageNoirEtBlanc[i].length; j++) {
            var newRGB = modifierContours(imageNoirEtBlanc, i, j);
            nouvelleImage[i][j] = newRGB;
        }
    }
    return nouvelleImage; // Remplacer par la nouvelle image
}

// ==> N'hésitez pas à ajouter vos propres fonctions pour vous aider <==
// function ...

function tests() {
    /* TODO : Ajoutez des tests unitaires pour les 4 fonctions
       demandées et pour vos propres fonctions */
}