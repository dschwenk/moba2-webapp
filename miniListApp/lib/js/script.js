
// global arrays for data
var names = [];
var age = [];
var gender = [];


/*
 * Funktion wird nachdem die Seite geladen wurde aufgerufen
 * Listener werden registriert
 */
function init(){
	// get buttons and add event listener
	var savebutton = document.getElementById("save_button")
	savebutton.addEventListener("click",clickedSpeichern,true);
	
	var deletebutton = document.getElementById("liste_loeschen_button")
	deletebutton.addEventListener("click",clickedLoeschen,true);
}

/*
 * Funktion liest die Daten aus dem LocalStorage
 */
function getLocalStorageData(){
	// get saved data
	names = JSON.parse(localStorage["names"]);
	age = JSON.parse(localStorage["age"]);
	gender = JSON.parse(localStorage["gender"]);
}


/*
 * Funnktion reagiert auf den Klick auf den
 * Speichern Button. Eingabe des Benutzers wird
 * ausgwertet, gespeichert und die Liste wird aktualisiert
 */
function clickedSpeichern(event){

	var inputNameField = window.document.getElementById("input_name");
	var inputName = inputNameField.value;
    // verify user input
	if (inputName === ""){
		$("#popup_no_name").popup("open");		
	} else {
		// save data

		// save name
		names.push(inputName);
		localStorage["names"] = JSON.stringify(names);

		// save age
		var inputAge = (window.document.getElementById("slider")).value;
		age.push(inputAge);
		localStorage["age"] = JSON.stringify(age);
		
		// save gender		
		var inputGender = document.querySelector('input[name="radio-choice-1"]:checked').value;
		gender.push(inputGender);
		localStorage["gender"] = JSON.stringify(gender);

		// notify user via popup
		$("#popup_data_saved").popup("open");

		// reset value of input field
		inputNameField.value = "";

		// update list
		showData();
	}
	event.stopPropagation();
}


/*
 * Funnktion reagiert auf den Klick auf den
 * Löschen Button. Gespeicherte Daten werden gelöscht
 */
function clickedLoeschen(event){
	
	// verify if there is any data
	if((names.length >= 1) && (age.length >= 1) && (gender.length >= 1)){
		// delete names
		names = [];
		localStorage["names"] = JSON.stringify(names);
		// delete ages		
		age = [];
		localStorage["age"] = JSON.stringify(age);
		// delete gender		
		gender = [];	
		localStorage["gender"] = JSON.stringify(gender);
			
		// notify user via popup
		$("#popup_data_deleted").popup("open");

		// update list
		showData();
	}
	// there are no entries
	else {
		// notify user via popup
		$("#popup_no_stored_data").popup("open");
	}
}


/*
 * Funktion zeigt Daten in einer Liste an
 */
function showData(){

	// loesche derzeitige Liset
	$( "#datalist" ).empty();

	// build list
	var i = 0
	names.forEach(function(entry){
		$("#datalist").append("<li>" + entry + ", " + age[i] + ", " + gender[i] + "</li>");
		i++;
	});
}