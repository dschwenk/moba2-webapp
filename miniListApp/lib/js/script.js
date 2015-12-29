
// input field name
var inputName;

// arrays for localstorae
var names = [];
var age = [];
var gender = [];


/*
 * Funktion wird nachdem die Seite geladen wurde aufgerufen
 * Listener werden registriert und die gespeicherten Daten ausgelesen
 */
function init(){
	var savebutton = document.getElementById("save_button")
	savebutton.addEventListener("click",clickedSpeichern,true);
	
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

	inputName = window.document.getElementById("input_name");
	var name = inputName.value;
    // verify user input
	if (name === ""){
		alert("Es wurde kein Name eingegeben!");
	} else {
		// save data

		// save name
		names.push(name);
		localStorage["names"] = JSON.stringify(names);

		// save age
		inputAge = window.document.getElementById("slider");
		var inputAge = slider.value;
		age.push(inputAge);
		localStorage["age"] = JSON.stringify(age);		
		
		// save gender		
		inputGender = document.querySelector('input[name="radio-choice-1"]:checked').value;
		gender.push(inputGender);
		localStorage["gender"] = JSON.stringify(gender);	

		// notify user via alert
		alert("Daten gespeichert!");
		
		// reset value of input field
		inputName.value = "";
		
		// update list
		showData();		
	}	
	event.stopPropagation();
}


/*
 * Funktion liest Daten aus localStorage und
 * zeigt diese in einer Liste an
 */
function showData(){
	
	// get names
	var storedNames = JSON.parse(localStorage["names"]);
	
	// loesche derzeitige Liset
	$( "#datalist" ).empty();
	
	// get ages
	var ages = [];
	var storedAges = JSON.parse(localStorage["age"]);
	storedAges.forEach(function(entry){
		ages.push(entry);		
	});	

	// get genders
	var genders = [];
	var storedGenders = JSON.parse(localStorage["gender"]);
	storedGenders.forEach(function(entry){
		genders.push(entry);		
	});	
	
	// build list
	var i = 0
	storedNames.forEach(function(entry){
		$( "#datalist" ).append( "<li>" + entry + ", " + ages[i] + ", " + genders[i] + "</li>" );
		i++;
	});
	
}