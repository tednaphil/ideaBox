var titleField = document.querySelector('#submitted-title');
var bodyField = document.querySelector('#submitted-body');
var saveButton = document.querySelector('#save-button');

saveButton.addEventListener('click', storeIdea);

var ideas = [];

function storeIdea(event) {
    console.log("I made it here!")
    var newIdea = {
        title: titleField.value,
        body: bodyField.value,
        id: Date.now()
    }
    ideas.push(newIdea);
    console.log(newIdea);
    event.preventDefault();
}