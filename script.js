
//Les sections HTML à cacher lorsque la page se charge
$("#perte").hide();
$("#gain").hide();
$("#nom").hide();
$("#textNom").hide();
$("#refresh").hide();
$("#motADevinerNonTrouver").hide();
$("#motADevinerTrouver").hide();

//Déclaration des variables
let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", //Tableau contenant les lettres de l'alphabet
                "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
let tabJoueurs = []; //Déclaration du tableaux tabJoueurs qui stockera les 10 meilleurs joueurs avec leur nom
let nbJoueurs; //Variable pour compter le nombre de joueurs ayant joué
let rangJoueur; //Variable pour récupérer le rang du joueur
let nom; //Variable pour récupérer le nom du joueur s'il fait parti des 10 premiers
let penalite=0; //Variable pour récupérer le nombre de penalité du joueur
let rand=entierAleatoire(0, dictionnaire.length-1); //choix d'un entier aléatoire pour tirer un mot aléatoirement dans dictionnaire
let motMachine=dictionnaire[rand]; //mot tirer aléatoirement dans dictionnaire
let tailleMotMachine=motMachine.length; // taille mot tirer aléatoirement dans dictionnaire
let tableMotMachine=motMachine.split(''); //table contenant les lettres du mot choisi aléatoirement dans dictionnaire
let motHomme=0; //Variable permettant de compter le nombre de lettres vraies que le joueur a eu
let tabLettres=[]; //Tabeau regroupant l'ensemble des lettres choisi lors d'une partie
let lettreDejaChoisi; //Vaut vrai ou faux

if(localStorage.getItem('nbJoueurs')>1 && localStorage.getItem('nbJoueurs')!=null){ //s'il y a des joueurs dans localStorage
    nbJoueurs=localStorage.getItem('nbJoueurs'); //remettre dans nbJoueurs le nombre de joueurs dans localStorage
} else{ //sinon
    localStorage.setItem('nbJoueurs',1); //considérer que c'est le premier joueur
    nbJoueurs = 1; //considérer que c'est le premier joueur
}

//Construction de l'objet joueurs composé du nom, penalite et secondes écoulées
function Joueurs(nom, penalite, nbJoueurs) {
    this.nom = nom;
    this.penalite = penalite;
    this.numJoueur = nbJoueurs+1; //Je construis un numéro de joueurs pour chaque joueurs pour pouvoir départagé les 
                                  //joueurs ayant meme penalite
}

//fonction qui va nous permettre de rajouter un joueur dans le tableau des 10 premiers
function ajoutJoueur(i){
    $("#gain").hide();
    $("#nom").show();
    $("#textNom").show();
    $("#nom").change (function (event) {
        nom = $(this).val();
        tabJoueurs[i] = (new Joueurs(nom, penalite, nbJoueurs));
        $(this).hide();
        $("#textNom").hide();
        //Pour mettre à jour le tableau des 10 premiers jours
        list10Joueurs();
    }) ;
}

//fonction pour choisir un entier aléatoire
function entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//fonction pour changer l'image selon l'évolution du jeu
function image(){
    let img = $("#img");
    img.attr('src', 'image'+penalite+'.png');
}
image();

//fonction pour créer nos boutons avec les lettres de l'alphabet
(function boutonAlphabet(){
    let divBouton = $("#divBouton");
    for(let i in alphabet) {
        let bouton = $("<button></button>");
        bouton.attr('id', 'bouton'+i);
        bouton.addClass('classBouton');
        bouton.html(alphabet[i]);
        divBouton.append(bouton);
    }
})();

//fonction pour mettre les tirets
(function choixMachine(){
    let divMot = $("#divMot");
    for(let i in tableMotMachine){
        let spanTrait = $("<span></span>");
        spanTrait.attr('id', 'spanTrait'+i);
        spanTrait.text('-');
        divMot.append(spanTrait);
        //récupérer les lettres du mot choisi par la machine
        let spanLettre = $("<span></span>");
        spanLettre.attr('id', 'spanLettre'+i);
        spanLettre.text(tableMotMachine[i]);
        spanLettre.hide();
        divMot.append(spanLettre);
    }
})();

//fonction à faire lorsque le joueur clique sur un des boutons de l'alphabet
function clickBoutonAlphabet(){
    for(let index in alphabet) {
        let leBouton = $("#bouton"+index);
        leBouton.on({
            mouseenter: function(){
              $(this).css("background-color", "rgb(24, 197, 82)");
              $(this).css("color", "black");
            },
            mouseleave: function(){
              $(this).css("background-color", "rgb(100, 8, 65)");
              $(this).css("color", "white");
            },
            click: function(){
              $(this).css("background-color", "yellow");
              $(this).css("color", "black");
            }
          });
        leBouton.click( 
            function (event) {
                lettreDejaChoisi=false;
                for(let index in tabLettres){
                    if(leBouton.html()==tabLettres[index]){
                        lettreDejaChoisi=true;
                    }
                }
                let comptPenalite=0;
                if (motHomme!=tailleMotMachine && penalite<=6 && lettreDejaChoisi==false){
                    tabLettres.push(leBouton.html());
                    for(let i in tableMotMachine) {
                        if(leBouton.html()==tableMotMachine[i]){
                            //cacher trait
                            $("#spanTrait"+i).hide();
                            //afficher mot
                            $("#spanLettre"+i).show();
                            motHomme++;
                        } else {
                            comptPenalite++;
                        }
                    }
                    if(comptPenalite==tailleMotMachine && penalite<=6){
                        penalite++;
                        $("#gain").text("Vous avez gagné! Vous avez comptabilisé " +penalite+ " pénalité.s");
                        image();
                    }
                }

                if(motHomme==tailleMotMachine){
                    gain();
                }

                if(penalite>6){
                    perte();
                } 
            }
        )
    }  
}

//fonction pour définir ce qui se passe lorsqu'un joueur perd
function perte(){
    let img = $("#img");
    img.attr('src', 'image7.png');
    $("#motADeviner").hide();
    $("#motADevinerNonTrouver").show();
    for(let i in tableMotMachine){
        //cacher trait
        $("#spanTrait"+i).hide();
        //afficher mot
        $("#spanLettre"+i).show();
    }
    $("#perte").show();
    $("#refresh").show();
}

//fonction pour définir ce qui se passe lorsqu'un joueur gagne
function gain(){
    let img = $("#img");
    img.attr('src', 'imageGain.png');
    $("#motADeviner").hide();
    $("#motADevinerTrouver").show();
    for(let i in tableMotMachine){
        //cacher trait
        $("#spanTrait"+i).hide();
        //afficher mot
        $("#spanLettre"+i).show();
    }
    $("#gain").show();
    $("#refresh").show();
    ajoutJoueurRangInf11();
}

//Fonction pour créer un tableau de 11 lignes et 4 colonnes
(function tableJoueurs() {
    let divTable = $("#joueurTable");
    let table = $("<table></table>");
    divTable.append(table);
    let tr1 = $("<tr></tr>");
    table.append(tr1);
    let th0 = $("<th></th>");
    tr1.append(th0);
    th0.text("Rangs Joueurs");
    let th1 = $("<th></th>");
    tr1.append(th1);
    th1.text("Noms Joueurs");
    let th2 = $("<th></th>");
    tr1.append(th2);
    th2.text("Penalite Joueurs");
    for(let index = 1; index < 11; index++) {
        let trJoueurs = $("<tr></tr>");
        trJoueurs.attr("id", "trJoueurs" + index);
        table.append(trJoueurs);
        let tdrang = $("<td></td>");
        tdrang.attr("id", "tdrang" + index);
        trJoueurs.append(tdrang);
        tdrang.text(index);
        tdrang.css("backgroundColor","rgb(212, 67, 147)");
        tdrang.css("color","black");
        tdrang.css("fontWeight","bold");
        let tdnom = $("<td></td>");
        tdnom.attr("id", "tdnom" + index);
        trJoueurs.append(tdnom);
        tdnom.text(".........");
        let tdpenalite = $("<td></td>");
        tdpenalite.attr("id", "tdpenalite" + index);
        trJoueurs.append(tdpenalite);
        tdpenalite.text(".........");
    }
})();

//Pour mettre à jour le tableau des 10 premiers joueurs
function list10Joueurs() {
    //Trier le tableau tabJoueurs 
    tabJoueurs.sort(
        function(a, b) {
          if (a.penalite != b.penalite)
            return a.penalite - b.penalite; //par ordre croissant selon le penalite
          if (a.penalite == b.penalite)
            return a.numJoueur - b.numJoueur; //par ordre croissant selon le numéro de joueur
        }
    );
    for(let i in tabJoueurs) {
        //mettre à jour le tableau des 10 premiers joueurs
        let rang = parseInt(i)+1;
        $("#tdnom" + (rang)).text(tabJoueurs[rang-1].nom.toUpperCase());
        $("#tdpenalite" + (rang)).text(tabJoueurs[rang-1].penalite);
        //mettre à jour le localStorage
        localStorage.setItem('nom'+i,tabJoueurs[rang-1].nom.toUpperCase());
        localStorage.setItem('penalite'+i,tabJoueurs[rang-1].penalite);
        localStorage.setItem('numJoueur'+i,tabJoueurs[rang-1].numJoueur);

    } 
}


//Fonction permettant de déterminer si le joueur est dans les 10 premiers et l'ajouter au tableau tabJoueurs
function ajoutJoueurRangInf11() {
    
    let rang;

    if (tabJoueurs.length==0) { //S'il n'y a encore aucune valeur dans tabJoueurs
        rang = 1;
        ajoutJoueur(0);
        return rang;
    } 
    
    else { //S'il y a déjà une ou plusieurs valeurs dans tabJoueurs

        //Trier le tableau par ordre croissant 
        tabJoueurs.sort(
            function(a, b) {
              if (a.penalite != b.penalite)
                return a.penalite - b.penalite; //selon le penalite
              if (a.penalite == b.penalite)
                return a.numJoueur - b.numJoueur; //selon le numéro de joueur
            }
        );

        //Récupérer le dernier indice du tableau
        let dernierIndice = tabJoueurs.length-1;

        //Les différents cas possible s'il y a déjà une ou plusieurs valeurs dans tabJoueurs

        if (penalite >= tabJoueurs[dernierIndice].penalite && dernierIndice<=8) {
            rang = dernierIndice+2;
            ajoutJoueur(dernierIndice+1);
            return rang; 
        }

        else if (penalite >= tabJoueurs[dernierIndice].penalite && dernierIndice==9) {
            return 11;
        }
    
        else {
            for (let index = 0; index < tabJoueurs.length; index++) {
                if (penalite < tabJoueurs[index].penalite && dernierIndice==9) {
                    tabJoueurs[dernierIndice] = tabJoueurs[index];
                    rang = index+1;
                    ajoutJoueur(index);
                    return rang;
                }
                else if (penalite < tabJoueurs[index].penalite && dernierIndice<=8) {
                    
                    tabJoueurs[dernierIndice+1] = tabJoueurs[index];
                    rang = index+1;
                    ajoutJoueur(index);
                    return rang;   
                }
            }
        }   
    }  
}

//Lorsqu'on raffraichit la page
$('#refresh').on('click', function() {
    //Avant de rafraichir la page vérifier
    if(localStorage.getItem('nbJoueurs')!=null){ //s'il y a des joueurs dans localStorage
    if(motHomme>0 || penalite>0){ //puis si un utilisateur a tenté de jouer
        localStorage.setItem('nbJoueurs',localStorage.getItem('nbJoueurs')+1 ); //incrémenter le nombre de joueur à 1
    }}
    //Puis Recharger la page
    location.reload(); 
});

//mettre dans le tableau les données dans le local storage
(function dataStorage(){
    i=0;
    while(localStorage.getItem('nom'+i)!=null) {
        let rang = parseInt(i)+1;
        $("#tdnom" + (rang)).text(localStorage.getItem('nom'+i));
        //tabJoueurs[i].nom=localStorage.getItem('nom'+i);
        $("#tdpenalite" + (rang)).text(localStorage.getItem('penalite'+i));
        tabJoueurs[i] = (new Joueurs(localStorage.getItem('nom'+i), 
        parseInt(localStorage.getItem('penalite'+i)), 
        parseInt(localStorage.getItem('numJoueur'+i))-1));
        i++;
    } 
})();


















   