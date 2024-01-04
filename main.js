var titleField = document.querySelector('#submitted-title');
var bodyField = document.querySelector('#submitted-body');
var saveButton = document.querySelector('.save-button');
var ideaGrid = document.querySelector('#card-display');
var nextArrow = document.querySelector('#next-arrow');
var backArrow = document.querySelector('#back-arrow');

saveButton.addEventListener('click', function (event) {
    event.preventDefault();
    handleSave();
});
nextArrow.addEventListener('click', nextIdea);
backArrow.addEventListener('click', prevIdea);
ideaGrid.addEventListener('click', function(event) {
    if (event.target.className.includes('delete-button')) {
        var cardId = event.target.parentElement.id;
        deleteCard(cardId);
    }
});
titleField.addEventListener('input', checkFields);
bodyField.addEventListener('input', checkFields);

saveButton.disabled = true;
var ideas = [];
var currentShift = 0;

function checkFields() {
    if (titleField.value && bodyField.value) {
        saveButton.disabled = false;
        saveButton.classList.remove(`grey-out`);
    } else {
        saveButton.classList.add('grey-out');
        saveButton.disabled = true;
    }
};

function storeIdea() {
    console.log(`prepush array: `, ideas)
    var newIdea = {
        title: titleField.value,
        body: bodyField.value,
        id: Date.now()
    }
    ideas.push(newIdea);
    // console.log(html);
    //what is this line above?
    console.log('postpush array: ', ideas)
   
};

function displayIdeas() {
    ideaGrid.innerHTML = ""
    for (var i = 0; i <ideas.length ; i++) {
        if (i < 3) {
            ideaGrid.innerHTML +=
            `<div class="card">
                <div class="delete-box" id="${ideas[i + currentShift].id}">
                    <img class="delete-button clickables" src="assets/delete.svg" alt="delete button">
                </div>
                <h2 class="card-title">${ideas[i + currentShift].title}</h2>
                <p class="card-body">${ideas[i + currentShift].body}</p>
            </div>`
        }
    }
    if (ideas.length > 3){
        // currentShift++
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
//    event.preventDefault();
    // console.log(currentShift)
    // console.log(ideas.length)
};

function clearInput() {
    titleField.value = '';
    bodyField.value = '';
    // event.preventDefault();
};

function handleSave() {
    console.log(`handleSave`);
    storeIdea();
    displayIdeas();
    clearInput();
}

function nextIdea() {
    currentShift ++;
    displayIdeas();
};

function prevIdea() {
    currentShift --;
    displayIdeas();
};

function deleteCard (iD) {
    iD = Number(iD)
    console.log(`transformed argment: `, iD)
    for (i = 0; i < ideas.length; i++) {
        console.log(`we made it here ${i} times`)
        console.log(ideas[i].id)
        console.log('id argument:', iD)
        if (ideas[i].id === iD) {
            ideas.splice(i, 1);
            console.log(`ideas array after deletion: `, ideas)
            displayIdeas();
        }
    }
}