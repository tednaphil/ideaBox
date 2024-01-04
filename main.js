var titleField = document.querySelector('#submitted-title');
var bodyField = document.querySelector('#submitted-body');
var saveButton = document.querySelector('#save-button');
var ideaGrid = document.querySelector('#card-display');
var nextArrow = document.querySelector('#next-arrow');
var backArrow = document.querySelector('#back-arrow');

saveButton.addEventListener('click', storeIdea);
nextArrow.addEventListener('click', nextIdea);
backArrow.addEventListener('click', prevIdea);

var ideas = [];
var currentShift = 0;

function storeIdea(event) {
    var html = `<div class="card" id="${Date.now()}">
    <div class="delete-box">
        <button class="delete-button">X</button>
    </div>
    <h2 class="card-title">${titleField.value}</h2>
    <p class="card-body">${bodyField.value}</p>
  </div>`
    ideas.push(html);
    console.log(html);
    event.preventDefault();
    displayIdeas(0)
}
function displayIdeas (){
    ideaGrid.innerHTML = ""
    for(var i = 0; i <ideas.length ; i++){
        if(i<3){
        ideaGrid.innerHTML += ideas[i + currentShift]
        }
    }
    if(ideas.length > 3){
        nextArrow.classList.remove("hidden")
    }
    if (ideas.length - currentShift < 4){ // this just checks if you go to the next one that it wont be yk undefinte 
        nextArrow.classList.add("hidden")
    }
    if(currentShift > 0){
        backArrow.classList.remove("hidden")
    }else if (currentShift == 0){
        backArrow.classList.add("hidden")
    }
   
    console.log(currentShift)
    console.log(ideas.length)
}
function nextIdea(){
    currentShift ++
    displayIdeas ()
}
function prevIdea(){
    currentShift -- 
    displayIdeas ()
}   