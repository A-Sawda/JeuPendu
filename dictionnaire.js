let dictionnaire = [];

//mettre dans le tableau les données dans le local storage
(function dicoStorage(){
    if(localStorage.getItem('num0')!==null){
        i=0;
        while(localStorage.getItem('num'+i)!==null) {
            let num = parseInt(i)+1;
            $("#tdNum" + (num)).text(localStorage.getItem('num'+i));
            $("#tdMot" + (num)).text(localStorage.getItem('mot'+i));
            dictionnaire[i]=localStorage.getItem('mot'+i);
            i++;
        } 
    } else {
        dictionnaire = [
            "RESPECTUEUX",
            "TOUCHER",
            "ASEPTISER", 
            "RELEVER",
            "MARIAGE",
            "SENTIER",
            "CHEMIN",
            "HEMORROIDE", 
            "GRAILLER", 
            "TRIBU",
            "ABREGER",
            "ADEPTE",
            "REFROTTER",
            "AEROBIQUE",
            "FRANGLAISE",
            "FRIGORIFUGER",
            "RAVACHIR",
            "AMPHIDELPHE",
            "AFFAIBLIR",
            "REVEILLER",
            "IMPORTANT",
            "GOMME",
            "ASSEMBLAGE",
            "MEUBLE",
            "ECOQUETER",
            "GODRONNER",
            "CONVENTION",
            "AUTOCENSURE",
            "FREQUENTER",
            "MAGNANIMISER",
            "CORRECTIONNALISER",
            "VACCINAL",
            "ENERGIE"
        ];
    }
    dictionnaire = dictionnaire.sort(); 
})();


