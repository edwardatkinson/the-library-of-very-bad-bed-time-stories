// multi-step form
createSteps();
var currentTab = 0; 
showTab(currentTab); 

function createSteps() {
  // make a new step for every class "TAB" on the page, so that this is more extensible
  x = document.getElementsByClassName("tab");
  // for every TAB, create STEP within the step-by-step ID
  for (i = 0; i < x.length; i++) {
    var newStep = document.createElement("span");
    newStep.setAttribute('class', "step");
    var stepByStep = document.getElementById("step-by-step");
    stepByStep.appendChild(newStep);
  }
}

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").remove();
    document.getElementById("submitBtn").style.display = "block";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function listenForEnter() {
    const input = document.querySelectorAll("input");
    
    for (i = 0; i < input.length; i++) {
        if (i < input.length-1) {
                        input[i].addEventListener('keyup',function(e){
                if (e.keyCode === 13) {
                nextPrev(1);
              }
            });
          }
              else {
              input[i].addEventListener('keyup',function(e){
                if (e.keyCode === 13) {
                addToStoryorCharacter();
              }
            });
          }

        } 
        
  }



listenForEnter();

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  // if (currentTab >= x.length) {
  //   //...the form gets submitted:
  //   //...COMMENTING OUT LINES 51 through 55 temp
  //   document.getElementById("regForm").submit();
  //   return false;
  // }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}


function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

// arrays for story
const theStory = [];
const theCharacter = [];
const storyEntries = Array.from(document.getElementsByClassName("story-entry"));
const characterEntries = Array.from(document.getElementsByClassName("character-entry"));

let buttonAddsToStoryAndCharacter = document.getElementById("submitBtn");
const formInput = document.getElementsByClassName("tab");

function addToStoryorCharacter() {
  
	for (i = 0; i < formInput.length; i++) {
      var inputs = document.getElementsByTagName("input");
      var userInput = inputs[i].value;
      if (formInput[i].classList.contains("character-object")) {
        theCharacter.push(userInput);
          } else {
        theStory.push(userInput);
          }
     } 

	for (i = 0; i < storyEntries.length; i++) {
		storyEntries[i].appendChild(document.createTextNode(theStory[i]));
	}

	for (i = 0; i < characterEntries.length; i++) {
		characterEntries[i].appendChild(document.createTextNode(theCharacter[i]));
	}

    document.getElementById("regForm").remove();
    var addVisibilityClass = document.getElementsByClassName("hidden-story");
	addVisibilityClass[0].classList.add("reveal-the-final-story");

  }

buttonAddsToStoryAndCharacter = buttonAddsToStoryAndCharacter.addEventListener("click", addToStoryorCharacter);