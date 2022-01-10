
//section html à cacher
$("#pAjoutMotDic").hide();
$("#pSuppMotDic").hide();

//window.localStorage.clear();

//supprimer un mot du dictionnaire
$("#suppDic").click( function (event) { 
    $("#pSuppMotDic").show();
});
$("#suppMotDic").change (function (event) {
    dictionnaire.splice(parseInt($(this).val())-1,1);
    miseAJourDico();
    $("#pSuppMotDic").hide();
});

//ajouter un mot dans le dictionnaire
$("#ajoutDic").click( function (event) { 
    $("#pAjoutMotDic").show();
});
$("#ajoutMotDic").change (function (event) {
    dictionnaire.push(($(this).val()).toUpperCase());
    miseAJourDico(); 
    $("#pAjoutMotDic").hide();
});

//Fonction pour afficher la liste des mots dans le dictionnaire
(function dicoTable() {
    let divOrigine= $("#tableDico");
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
        tr.attr("id", "trMots" + index);
        table.append(tr);
        let td1=$("<td></td>");
        td1.attr("id", "tdNum" + index);
        tr.append(td1);
        td1.text(index+1);
        let td2=$("<td></td>");
        td2.attr("id", "tdMot" + index);
        tr.append(td2);
        td2.text(dictionnaire[index]);
    }
})();

//fonction pour mettre à jour la liste des mots du dictionnaire
function miseAJourDico(){
    dictionnaire.sort();
    for(let i in dictionnaire) {
        //mettre à jour le dictionnaire
        let num = parseInt(i)+1;
        $("#tdNum" + (num)).text(num);
        $("#tdMot" + (num)).text(dictionnaire[num-1]);
        //mettre à jour le localStorage
        localStorage.setItem('num'+i,num);
        localStorage.setItem('mot'+i,dictionnaire[num-1]);

    }
    if(typeof(localStorage.getItem('mot'+dictionnaire.length))!=="undefined"){
        i=dictionnaire.length;
        while(localStorage.getItem('mot'+i)!==null) {
            localStorage.removeItem('mot'+i);
            localStorage.removeItem('num'+i);
            i++;
        } 
    }
    location.reload(); 
}