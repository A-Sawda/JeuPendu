//Lorsqu'on raffraichit la page
$('#refresh').on('click', function() {
    location.reload();
});

//Section à cacher au chargement de la page
$("#perteMachine").hide();
$("#gainMachine").hide();
$("#lestirets").hide();
$("#imgMachine").hide();
$("#rejouer").hide();

//Fonction pour afficher la liste des mots dans un tableau
(function dicoTable() {
    let divOrigine= $("#idTableDico");
    let table = $("<table></table>")
    divOrigine.append(table);
    let tr1=$("<tr></tr>");
    table.append(tr1);
    let th1=$("<th></th>");
    tr1.append(th1);
    th1.text("Numéros");
    let th2=$("<th></th>");
    tr1.append(th2);
    th2.text("Mots");
    for(let index = 0; index < dictionnaire.length; index++) {
        let tr=$("<tr></tr>");
        table.append(tr);
        let td1=$("<td></td>");
        tr.append(td1);
        td1.text(index+1);
        let td2=$("<td></td>");
        tr.append(td2);
        td2.text(dictionnaire[index]);
    }
})();

//fonction pour choisir un entier aléatoire
function entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//fonction pour changer l'image selon l'évolution du jeu
function imageMachine(){
    $("#imgMachine").attr('src', 'image'+penaliteMachine+'.png');
}
    
function choixHommeMachine(){
    //fonction pour mettre les tirets
    for(let i in tableMotSaisiMachine){
        let spanTraitMachine = $("<span></span>");
        spanTraitMachine.attr('id', 'spanTraitMachine'+i);
        spanTraitMachine.text(' - ');
        $("#divMotMachine").append(spanTraitMachine);
    
        let spanLettreMachine = $("<span></span>");
        spanLettreMachine.attr('id', 'spanLettreMachine'+i);
        spanLettreMachine.text(tableMotSaisiMachine[i]);
        spanLettreMachine.hide();
        $("#divMotMachine").append(spanLettreMachine);
    }
}
    
//fonction pour définir ce qui se passe lorsqu'un joueur perd
function perteMachine(){
    let imgMachine = $("#imgMachine");
    imgMachine.attr('src', 'image7.png');
    for(let i in tableMotSaisiMachine){
        //cacher trait
        $("#spanTraitMachine"+i).hide();
        //afficher mot
        $("#spanLettreMachine"+i).show();
    }
    $("#perteMachine").show();
}

//fonction pour définir ce qui se passe lorsqu'un joueur gagne
function gainMachine(){
    let img = $("#imgMachine");
    img.attr('src', 'imageGain.png');
    for(let i in tableMotSaisiMachine){
        //cacher trait
        $("#spanTraitMachine"+i).hide();
        //afficher mot
        $("#spanLettreMachine"+i).show();
    }
    $("#gainMachine").show(); 
    $("#rejouer").show();
}

//Déclaration des variables
let motSaisiMachine; //mot choisi par l'humain
let tailleMotSaisiMachine; //taille du mot choisi par l'humain
let tableMotSaisiMachine; //table contenant les lettres du mot saisi par l'humain
let dicReduitMachine=[]; //dicReduitMachine contient tous les mots de dictionnaire qui ont la taille du mot choisi par l'humain
let dicReduit2Machine=[]; //sert au fur et à mesure pour mettre dans dicReduitMachine les mots qui correspondent aux critères
let randMachineMachine; //choix d'un entier aléatoire pour tirer un mot aléatoirement dans dicReduitMachine
let motMachineMachine; //mot tirer aléatoirement dans dicReduitMachine
let tablemotMachineMachine; //table contenant les lettres du mot choisi aléatoirement dans dicReduitMachine
let randMachine2Machine; //choix d'un entier aléatoire pour tirer un mot aléatoirement dans tablemotMachineMachine
let lettreMachineMachine; //lettre tirer aléatoirement dans tablemotMachineMachine
let penaliteMachine=0; //le nombre de pénalité
let comptPenaliteMachine=0;
let tabLettresMachine=[]; //Tabeau regroupant l'ensemble des lettres choisi lors d'une partie
let lettreDejaChoisiMachine; //Vaut vrai ou faux


//Lorsque l'utilisateur choisi un mot
$("#motSaisiHom").change (function (event) {
    $("#lestirets").show();
    $("#imgMachine").show();
    imageMachine();
    motSaisiMachine = $(this).val();
    motSaisiMachine = motSaisiMachine.toUpperCase();
    tableMotSaisiMachine=motSaisiMachine.split('');
    tailleMotSaisiMachine=motSaisiMachine.length;
    choixHommeMachine();
    for(let i in dictionnaire){
        if(dictionnaire[i].length==tailleMotSaisiMachine){
            dicReduitMachine.push(dictionnaire[i])
        }
    }
}) ;

//Lorsqu'on clique sur le bouton HTML jouerMachine
$("#jouerMachine").click( function (event) {
    comptPenaliteMachine=0;
    randMachineMachine=entierAleatoire(0, dicReduitMachine.length-1);
    motMachineMachine=dicReduitMachine[randMachineMachine];
    if(motMachineMachine==motSaisiMachine && penaliteMachine<=6){ //La machine gagne 
        gainMachine(); //lancer la fonction gainMachine
    }  
    if(motMachineMachine!=motSaisiMachine && penaliteMachine<=6){
        tablemotMachineMachine=motMachineMachine.split('');
        lettreDejaChoisiMachine=true;
        while(lettreDejaChoisiMachine!=false){
            lettreDejaChoisiMachine=false;
            randMachine2Machine=entierAleatoire(0, tablemotMachineMachine.length-1);
            lettreMachineMachine=tablemotMachineMachine[randMachine2Machine];
            for(let index in tabLettresMachine){
            if(lettreMachineMachine==tabLettresMachine[index]){
                lettreDejaChoisiMachine=true;
            }
            }
        }
        tabLettresMachine.push(lettreMachineMachine);
        
        for(let i in tableMotSaisiMachine){
            if(tableMotSaisiMachine[i]==lettreMachineMachine){
                let positionMachine=i;
                //cacher trait
                $("#spanTraitMachine"+i).hide();
                //afficher mot
                $("#spanLettreMachine"+i).show();
                for(let i in dicReduitMachine){
                    let tableMachine=dicReduitMachine[i].split(''); //table contenant les lettres du mot dicReduitMachine[i]
                    if(tableMachine[positionMachine]==lettreMachineMachine){
                        dicReduit2Machine.push(dicReduitMachine[i])
                    }
                }
                dicReduitMachine=[]
                dicReduitMachine=dicReduit2Machine; //mettre dicReduitMachine à jour
                dicReduit2Machine=[]
        
            } else { //le lettre choisie n'a aucune correspondance
                comptPenaliteMachine++;
            }
        }
    }
    if(comptPenaliteMachine==tailleMotSaisiMachine && penaliteMachine<=6){
        penaliteMachine++; //incrémenté la variable qui compte les pénalités
        $("#gainMachine").text("La machine a gagné! Elle a comptabilisé " +penaliteMachine+ " pénalité.s");
        dicReduitMachine.splice(randMachineMachine,1); //supprimer le mot choisi du tableau
        imageMachine(); //mettre à jour le pendu
    }
    if(penaliteMachine>6){
        perteMachine(); //lancer la fonction perteMachine
    }
}) ;



