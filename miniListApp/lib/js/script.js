
// global arrays for data
var names = [];
var age = [];
var gender = [];


/*
 * Funktion wird nachdem die Seite geladen wurde aufgerufen
 * Listener werden registriert + context menu code
 */
function init(){
	// get buttons and add event listener
	var savebutton = document.getElementById("save_button")
	savebutton.addEventListener("click",clickedSpeichern,true);
	
	var deletebutton = document.getElementById("liste_loeschen_button")
	deletebutton.addEventListener("click",clickedLoeschen,true);

	var deleteLink = document.getElementById("link_delete")
	deleteLink.addEventListener("click",clickedLoeschen,true);
	
	// context menu
	// http://www.voidtricks.com/custom-right-click-context-menu/
	$(document).ready(function () {
		$("html").on("contextmenu",function(e){
			//prevent default context menu for right click
			e.preventDefault();

			var menu = $(".menu"); 

			//hide menu if already shown
			menu.hide(); 

			//get x and y values of the click event
			var pageX = e.pageX;
			var pageY = e.pageY;

			//position menu div near mouse cliked area
			menu.css({top: pageY , left: pageX});

			var mwidth = menu.width();
			var mheight = menu.height();
			var screenWidth = $(window).width();
			var screenHeight = $(window).height();

			//if window is scrolled
			var scrTop = $(window).scrollTop();

			//if the menu is close to right edge of the window
			if(pageX+mwidth > screenWidth){
				menu.css({left:pageX-mwidth});
			}

			//if the menu is close to bottom edge of the window
			if(pageY+mheight > screenHeight+scrTop){
				menu.css({top:pageY-mheight});
			}

			//finally show the menu
			menu.show();
		}); 
		
		$("html").on("click", function(){
			$(".menu").hide();
		});
	});
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
		$("#input_name").focus();
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
	if(names.length == 0){
		// no entries
		$("#datalist").append("<li>" + "keine Einträge vorhanden!" + "</li>");
	}
	else {
		var i = 0
		names.forEach(function(entry){
			// add collapsible with user data
			$("#datalist").append("<div data-role='collapsible' data-collapsed-icon='arrow-r' and data-expanded-icon='arrow-d' data-collapsed='true' data-inset='true' data-theme='e' data-content-theme='e'><h1>" + entry + "</h1><p>Name: " + entry + "</br>Alter: " + age[i] + "</br>Geschlecht: " + gender[i] + "</p></div>");
			// call collapsible() - otherwise collapsible is not shownn correctly (http://stackoverflow.com/questions/4214538/dynamically-adding-collapsible-elements)
			$('div[data-role=collapsible]').collapsible();
			i++;
		});
	}
}