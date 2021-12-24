
//Lorsqu'on raffraichit la page
$('#refresh').on('click', function() {
    if(localStorage.getItem('nbJoueurs')!=null){
    if(motHomme>0){
        localStorage.setItem('nbJoueurs',(parseInt(localStorage.getItem('nbJoueurs'))+1) );
    }}
    location.reload();
});

//Ce qu'il lorsque la page se fraichie


let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
let tabJoueurs = []; //Déclaration du tableaux tabJoueurs qui stockera les 10 meilleurs joueurs avec leur nom, penalite et secondes écoulées
let tabLocal=[];
let nbJoueurs; //Variable pour compter le nombre de joueurs ayant participé à la partie
if(localStorage.getItem('nbJoueurs')>1 && localStorage.getItem('nbJoueurs')!=null){
    nbJoueurs=localStorage.getItem('nbJoueurs');
} else{
    localStorage.setItem('nbJoueurs',1);
    nbJoueurs = 1;
}
let rangJoueur; //Variable pour récupérer le rang du joueur
//let penalite; //Variable pour récupérer le penalite du joueur
let nom;
let penalite=0;
let rand=entierAleatoire(0, dictionnaire.length-1);
let motMachine=dictionnaire[rand];
let tailleMotMachine=motMachine.length;
let tableMotMachine=motMachine.split('');
let motHomme=0;
$("#perte").hide();
$("#gain").hide();
$("#nom").hide();
boutonAlphabet();
choixMachine();
image();
tableJoueurs();
dataStorage();

//Construction de l'objet joueurs composé du nom, penalite et secondes écoulées
function Joueurs(nom, penalite, nbJoueurs) {
    this.nom = nom;
    this.penalite = penalite;
    this.numJoueur = nbJoueurs+1; //Je construis un numéro de joueurs pour chaque joueurs pour pouvoir départagé les 
                                  //joueurs ayant meme penalite et meme secondes écoulées
}

//fonction qui va nous permettre de rajouter un joueur dans le tableau des 10 premiers
function ajoutJoueur(i){
    $("#nom").show();
    $("#nom").change (function (event) {
        nom = $(this).val();
        tabJoueurs[i] = (new Joueurs(nom, penalite, nbJoueurs));
        $(this).hide();
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

//fonction pour créer nos boutons avec les lettres de l'alphabet
function boutonAlphabet(){
    let divBouton = $("#divBouton");
    for(let i in alphabet) {
        let bouton = $("<button></button>");
        bouton.attr('id', 'bouton'+i);
        bouton.addClass('classBouton');
        bouton.html(alphabet[i]);
        divBouton.append(bouton);
    }
}

//fonction pour que la machine choisisse un mot aléatoirement
function choixMachine(){
    let divMot = $("#divMot");
    for(let i in tableMotMachine){
        let spanTrait = $("<span></span>");
        spanTrait.attr('id', 'spanTrait'+i);
        spanTrait.text('-');
        divMot.append(spanTrait);
    
        let spanLettre = $("<span></span>");
        spanLettre.attr('id', 'spanLettre'+i);
        spanLettre.text(tableMotMachine[i]);
        spanLettre.hide();
        divMot.append(spanLettre);
    }
}


//fonction à faire lorsque le joueur clique sur un des boutons de l'alphabet
function clickBoutonAlphabet(){

    for(let index in alphabet) {
        let leBouton = $("#bouton"+index);
        leBouton.click( 
            function (event) {
                let comptPenalite=0;
                if (motHomme!=tailleMotMachine && penalite<=6){
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
    for(let i in tableMotMachine){
        //cacher trait
        $("#spanTrait"+i).hide();
        //afficher mot
        $("#spanLettre"+i).show();
    }
    $("#gain").hide();
    $("#perte").show();
}

//fonction pour définir ce qui se passe lorsqu'un joueur gagne
function gain(){
    let img = $("#img");
    img.attr('src', 'imageGain.png');
    for(let i in tableMotMachine){
        //cacher trait
        $("#spanTrait"+i).hide();
        //afficher mot
        $("#spanLettre"+i).show();
    }
    $("#perte").hide();
    $("#gain").show();
    ajoutJoueurRangInf11();
}



//Fonction pour créer un tableau de 11 lignes et 4 colonnes
function tableJoueurs() {
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
        tdrang.css("backgroundColor","rgb(31, 235, 207)");
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


}

//Pour mettre à jour le tableau des 10 premiers jours
function list10Joueurs() {
    //Trier le tableau par ordre croissant 
    tabJoueurs.sort(
        function(a, b) {
          if (a.penalite != b.penalite)
            return a.penalite - b.penalite; //selon le penalite
          if (a.penalite == b.penalite)
            return a.numJoueur - b.numJoueur; //selon le numéro de joueur
        }
    );
    for(let i in tabJoueurs) {
        let rang = parseInt(i)+1;
        $("#tdnom" + (rang)).text(tabJoueurs[rang-1].nom.toUpperCase());
        $("#tdpenalite" + (rang)).text(tabJoueurs[rang-1].penalite);
        //$("#tdseconde" + (rang)).setAttribute("class",secondes_label(tabJoueurs[rang-1].secondesEcoulees));
        localStorage.setItem('nom'+i,tabJoueurs[rang-1].nom.toUpperCase());
        localStorage.setItem('penalite'+i,tabJoueurs[rang-1].penalite);
        localStorage.setItem('numJoueur'+i,tabJoueurs[rang-1].numJoueur);

    } 
}


//A l'dataStorage mettre dans le tableau les données dans le local storage
function dataStorage(){
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


















   