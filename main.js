var titleField = document.querySelector('#submitted-title');
var bodyField = document.querySelector('#submitted-body');
var saveButton = document.querySelector('#save-button');
var ideaGrid = document.querySelector('#card-display');
var nextArrow = document.querySelector('#next-arrow');
var backArrow = document.querySelector('#back-arrow');

saveButton.addEventListener('click', storeIdea);
nextArrow.addEventListener('click', nextIdea);
backArrow.addEventListener('click', prevIdea);
ideaGrid.addEventListener('click', function(event) {
    if (event.target.className.includes('delete-button')) {
        var cardId = event.target.parentElement.id;
        deleteCard(cardId);
    }
});

var ideas = [];
var currentShift = 0;

function storeIdea(event) {
    var html = `<div class="card">
    <div class="delete-box" id="${Date.now()}">
        <img class="delete-button" src="assets/delete.svg" alt="delete button">
    </div>
    <h2 class="card-title">${titleField.value}</h2>
    <p class="card-body">${bodyField.value}</p>
    </div>`
    ideas.push(html);
    console.log(html);
    event.preventDefault();
    displayIdeas(0);
    //what is this line above?
    titleField.value = '';
    bodyField.value = '';
}

function displayIdeas (){
    ideaGrid.innerHTML = ""
    for (var i = 0; i <ideas.length ; i++) {
        if(i<3){
        ideaGrid.innerHTML += ideas[i + currentShift]
        }
    }
    if (ideas.length > 3){
        nextArrow.classList.remove("hidden")
        nextArrow.classList.add("fade")
    }
    if (ideas.length - currentShift < 4){ // this just checks if you go to the next one that it wont be yk undefinte 
        nextArrow.classList.add("hidden")
        nextArrow.classList.remove("fade")
    }
    if (currentShift > 0){
        backArrow.classList.remove("hidden")
        backArrow.classList.add("fade")
    } else if (currentShift == 0){
        //can we get rid of loosely equals?
        backArrow.classList.add("hidden")
        backArrow.classList.remove("fade")
    }
   
    console.log(currentShift)
    console.log(ideas.length)
};

function nextIdea() {
    currentShift ++;
    displayIdeas();
};

function prevIdea() {
    currentShift --;
    displayIdeas();
};

function deleteCard (iD) {
    for (i = 0; i < ideas.length; i++) {
        console.log(`we made it here ${i} times`)
        if (ideas[i].includes(iD)) {
            ideas.splice(i, 1);
            displayIdeas();
        }
    }
}