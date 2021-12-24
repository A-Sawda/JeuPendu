
function dicoTable() {
    let divOrigine= $("#idTableDico");
    let table = $("<table></table>")
    divOrigine.append(table);
    let tr1=$("<tr></tr>");
    table.append(tr1);
    let th1=$("<th></th>");
    tr1.append(th1);
    th1.text("Numéro");
    let th2=$("<th></th>");
    tr1.append(th2);
    th2.text("Nom");

    

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

  }

  //fonction pour choisir un entier aléatoire
function entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


let motSaisiMachine;
let tailleMotSaisiMachine;
let tableMotSaisiMachine;
let dicReduitMachine=[];
let dicReduit2Machine=[];
let randMachineMachine;
let motMachineMachine;
let tablemotMachineMachine;
let randMachine2Machine;
let lettreMachineMachine;
let positionMachine;
let penaliteMachine=0;
let comptPenaliteMachine=0;
$("#perteMachine").hide();
$("#gainMachine").hide();
imageMachine();
dicoTable();

//

//fonction pour changer l'image selon l'évolution du jeu
function imageMachine(){
$("#imgMachine").attr('src', 'image'+penaliteMachine+'.png');
}

$("#motSaisiHom").change (function (event) {
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


//fonction pour que la machine choisisse un mot aléatoirement
function choixHommeMachine(){
    for(let i in tableMotSaisiMachine){
        let spanTraitMachine = $("<span></span>");
        spanTraitMachine.attr('id', 'spanTraitMachine'+i);
        spanTraitMachine.text('-');
        $("#divMotMachine").append(spanTraitMachine);
    
        let spanLettreMachine = $("<span></span>");
        spanLettreMachine.attr('id', 'spanLettreMachine'+i);
        spanLettreMachine.text(tableMotSaisiMachine[i]);
        spanLettreMachine.hide();
        $("#divMotMachine").append(spanLettreMachine);
    }
}


$("#jouerMachine").click( function (event) {

randMachineMachine=entierAleatoire(0, dicReduitMachine.length-1);
motMachineMachine=dicReduitMachine[randMachineMachine];

if(motMachineMachine==motSaisiMachine){
    gainMachine();
} else {
    tablemotMachineMachine=motMachineMachine.split('');
randMachine2Machine=entierAleatoire(0, tablemotMachineMachine.length-1);
lettreMachineMachine=tablemotMachineMachine[randMachine2Machine];


    for(let i in tableMotSaisiMachine){
        if(tableMotSaisiMachine[i]==lettreMachineMachine){
            positionMachine=i;
            //cacher trait
            $("#spanTraitMachine"+i).hide();
            //afficher mot
            $("#spanLettreMachine"+i).show();
            for(let i in dicReduitMachine){
                let tableMachine=dicReduitMachine[i].split('');
                if(tableMachine[positionMachine]==lettreMachineMachine){
                    dicReduit2Machine.push(dicReduitMachine[i])
                }
            }
            dicReduitMachine=[]
            dicReduitMachine=dicReduit2Machine;
            dicReduit2Machine=[]
    
        } else {
            comptPenaliteMachine++;
        }
    }

    if(comptPenaliteMachine==tailleMotSaisiMachine && penaliteMachine<=6){
        penaliteMachine++;
        dicReduitMachine.splice(randMachineMachine,1);
        imageMachine();
    }

    if(penaliteMachine>6){
        perteMachine();
    }
}


}) ;

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
    $("#gainMachine").hide();
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
    $("#perteMachine").hide();
    $("#gainMachine").show();
}

