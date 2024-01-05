var titleField = document.querySelector("#submitted-title");
var bodyField = document.querySelector("#submitted-body");
var saveButton = document.querySelector(".save-button");
var ideaGrid = document.querySelector("#card-display");
var nextArrow = document.querySelector("#next-arrow");
var backArrow = document.querySelector("#back-arrow");

saveButton.addEventListener("click", function (event) {
  event.preventDefault();
  handleSave();
});
nextArrow.addEventListener("click", nextIdea);
backArrow.addEventListener("click", prevIdea);
ideaGrid.addEventListener("click", function (event) {
  if (event.target.className.includes("delete-button")) {
    var cardId = event.target.parentElement.id;
    deleteCard(cardId);
  }
})
ideaGrid.addEventListener("click", function (event) {
  if (event.target.className.includes("fav-button")) {
    var cardId = event.target.parentElement.id;
    var starId = event.target.id;
    updateFavs(cardId);  
    toggleStar(starId, cardId);
}
})
titleField.addEventListener("input", checkFields);
bodyField.addEventListener("input", checkFields);

saveButton.disabled = true;

var ideas = [];
var currentShift = 0;
var favorites = [];

function checkFields() {
  if (titleField.value && bodyField.value) {
    saveButton.disabled = false;
    saveButton.classList.remove(`grey-out`);
  } else {
    saveButton.classList.add("grey-out");
    saveButton.disabled = true;
  }
}

function storeIdea() {
  var newIdea = {
    title: titleField.value,
    body: bodyField.value,
    id: Date.now(),
    isFavorite: false,
  };
  ideas.push(newIdea);
}

function displayIdeas() {
  ideaGrid.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    if (i < 3) {
      ideaGrid.innerHTML += `<div class="card">
                <div class="delete-box" id="${ideas[i + currentShift].id}">
                    <img class = "fav-button clickables" id="${[ideas[i + currentShift].id + 1]}" src = "assets/star.svg" alt = "Unstarred">
                    <img class = "fav-button clickables inactive" src = "assets/star-active.svg" alt = "Starred">
                    <img class="delete-button clickables" src="assets/delete.svg" alt="delete button">
                </div>
                <h2 class="card-title">${ideas[i + currentShift].title}</h2>
                <p class="card-body">${ideas[i + currentShift].body}</p>
            </div>`;
    }
  }
  if (ideas.length > 3) {
    nextArrow.classList.remove("hidden");
    nextArrow.classList.add("fade");
  }
  if (ideas.length - currentShift < 4) {
    nextArrow.classList.add("hidden");
    nextArrow.classList.remove("fade");
  }
  if (currentShift > 0) {
    backArrow.classList.remove("hidden");
    backArrow.classList.add("fade");
  } else if (currentShift === 0) {
    backArrow.classList.add("hidden");
    backArrow.classList.remove("fade");
  }
}

function clearInput() {
  titleField.value = "";
  bodyField.value = "";
  checkFields();
}

function handleSave() {
  storeIdea();
  displayIdeas();
  clearInput();
}

function nextIdea() {
  currentShift++;
  displayIdeas();
}

function prevIdea() {
  currentShift--;
  displayIdeas();
}

function deleteCard(iD) {
  iD = Number(iD);
  for (i = 0; i < ideas.length; i++) {
    if (ideas[i].id === iD) {
      ideas.splice(i, 1);
      displayIdeas();
    }
  }
}

function toggleStar(starId, cardId) {
    iD = Number(iD);
}

function updateFavs(cardId) {
//access the idea object with the parent id of the star clicked
iD = Number(cardId);  
console.log(`updateFavs`)
for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === iD) {
      ideas[i].isFavorite = true;
      favorites.push(ideas[i]);
    }
    // if (ideas[i].id === iD && ideas[i].isFavorite === true) {
    //   ideas[i].isFavorite = false;
    //   favorites.splice(i, 1)
    // }
  }
  console.log(`favs list: `, favorites)
}
