
// global array for user data objects
var user_data_array = [];


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
	user_data_array = JSON.parse(localStorage["user_data_array"]);
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
		// get age
		var inputAge = (window.document.getElementById("slider")).value;
		
		// get gender		
		var inputGender = document.querySelector('input[name="radio-choice-1"]:checked').value;

		// create new user object with input data
		var user_object =  {
			'Name' : inputName , 
			'Age' : inputAge ,
			'Gender' : inputGender
		};

		// add object to user data array
		user_data_array.push(user_object);
		// save data to local storage
		localStorage["user_data_array"] = JSON.stringify(user_data_array);
		
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
	if(user_data_array.length >= 1){
		
		// delete data
		user_data_array = [];
		// write empty array to local storage
		localStorage["user_data_array"] = JSON.stringify(user_data_array);		
			
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
	if((user_data_array.length == 0) || (user_data_array == "")){
		// no entries
		$("#datalist").append("<li>" + "keine Einträge vorhanden!" + "</li>");
	}
	else {
		var i = 0
		// iterate over all user objects
		user_data_array.forEach(function(user_object){
			// add collapsible with user data
			$("#datalist").append("<div data-role='collapsible' data-collapsed-icon='arrow-r' and data-expanded-icon='arrow-d' data-collapsed='true' data-inset='true' data-theme='e' data-content-theme='e'><h1>" + user_object.Name + "</h1><p>Name: " + user_object.Name + "</br>Alter: " + user_object.Age + "</br>Geschlecht: " + user_object.Gender + "</p></div>");
			// call collapsible() - otherwise collapsible is not shown correctly (http://stackoverflow.com/questions/4214538/dynamically-adding-collapsible-elements)
			$('div[data-role=collapsible]').collapsible();
		});		
	}
}