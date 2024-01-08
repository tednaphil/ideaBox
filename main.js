var titleField = document.querySelector(".submitted-title");
var bodyField = document.querySelector(".submitted-body");
var saveButton = document.querySelector(".save-button");
var ideaGrid = document.querySelector("#card-display");
var nextArrow = document.querySelector("#next-arrow");
var backArrow = document.querySelector("#back-arrow");
var filterButton = document.querySelector("#filter");


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
  if (event.target.className.includes("fav-button")) {
    var cardId = event.target.parentElement.id;
    var starId = event.target.id;
    updateFavs(cardId);
    toggleStar(starId);
  }
});

titleField.addEventListener("input", checkFields);

bodyField.addEventListener("input", checkFields);

filterButton.addEventListener("click", handleFilterButton);

document.addEventListener("click", checkStars);


var ideas = [];
var currentShift = 0;
var favorites = [];
var filter = false;
saveButton.disabled = true;


function checkFields() {
  if (titleField.value && bodyField.value) {
    saveButton.disabled = false;
    saveButton.classList.remove("grey-out");
  } else {
    saveButton.classList.add("grey-out");
    saveButton.disabled = true;
  }
}

function checkStars() {
  if (favorites.length > 0) {
    filterButton.classList.remove("hidden");
  } else {
    filterButton.classList.add("hidden");
  }
}

function storeIdea() {
  var newIdea = {
    title: titleField.value,
    body: bodyField.value,
    id: Date.now(),
    isFavorite: false,
  };
  ideas.unshift(newIdea);
}

function displayIdeas() {
  ideaGrid.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    var index = i + currentShift;
    var favorite = "assets/star.svg";
    var starred = "Unstarred";
    if (i < 3) {
      if (filter) {
        favorite = "assets/star-active.svg";
        starred = "Starred";
        updatehtml(favorites, index, favorite, starred);
      } else {
        if (ideas[index].isFavorite) {
          favorite = "assets/star-active.svg";
          starred = "Starred";
        }
      updatehtml(ideas, index, favorite, starred);
      }
    }
  }
  checkArrows();
}

function updatehtml(array, index, favorite, starred) {
  if (array && array[index]) {
    ideaGrid.innerHTML += `<div class="card">
          <div class="delete-box" id="${array[index].id}">
              <img class="fav-button clickables" id="${
                array[index].id + 1
              }" src="${favorite}" alt="${starred}">
              <img class="delete-button clickables" src="assets/delete.svg" alt="delete button">
          </div>
          <h2 class="card-title">${array[index].title}</h2>
          <p class="card-body">${array[index].body}</p>
      </div>`;
  }
}

function checkArrows() {
  if (filter) {
    nextIsNeeded = false;
    backIsNeeded = false;
    if ((favorites.length > 3) && (favorites.length - currentShift > 3)) {
      nextIsNeeded = true;
    }
    if ((currentShift > 0)){
      backIsNeeded = true;
    }
    manageNextArrow(nextIsNeeded);
    manageBackArrow(backIsNeeded);
  } else {
    nextIsNeeded = false;
    backIsNeeded = false;
    if ((ideas.length > 3) && (ideas.length - currentShift > 3)) {
      nextIsNeeded = true;
    }
    if ((currentShift > 0)){
      backIsNeeded = true;
    }
    manageNextArrow(nextIsNeeded);
    manageBackArrow(backIsNeeded);
  }
}

function manageNextArrow(isNeeded) {
  if (isNeeded) {
    nextArrow.classList.remove("hidden");
  } else {
    nextArrow.disabled = true;
    nextArrow.classList.add("hidden")
  }
}

function manageBackArrow(isNeeded) {
  if (isNeeded) {
    backArrow.classList.remove("hidden");
  } else {
    backArrow.classList.add("hidden")
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
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === iD) {
      ideas.splice(i, 1);
      if (currentShift){
        currentShift--;
      }
    }
  }
  for (var i = 0; i < favorites.length; i++) {
    if (favorites[i].id === iD) {
      favorites.splice(i, 1);
      if (filter && favorites.length === 0) {
        filter = false;
      }
    }
  }
  displayIdeas();
}

function updateFavs(cardId) {
  iD = Number(cardId);
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === iD) {
      if (ideas[i].isFavorite) {
        ideas[i].isFavorite = false;
        for (x = 0; x < favorites.length; x++) {
          if (favorites[x].id === iD) {
            favorites.splice(x, 1);
            if (currentShift) {
              currentShift--;
            }
            displayIdeas();
          }
        }
      } else {
        ideas[i].isFavorite = true;
        favorites.unshift(ideas[i]);
      }
    }
  }
}

function toggleStar(starId) {
  var starIcon = document.getElementById(starId);
  if (starIcon.src.includes("assets/star.svg")) {
    starIcon.src = "assets/star-active.svg";
  } else if (starIcon.src.includes("assets/star-active.svg")) {
    starIcon.src = "assets/star.svg";
  }
  if (filter && favorites.length === 0) {
    filterIdeas();
  }
  displayIdeas();
}

function currentShiftReset() {
  currentShift = 0;
}

function filterIdeas() {
  filter = !filter;
  if (filter) {
    filterButton.innerHTML = "Show All Ideas";
  } else {
    filterButton.innerHTML = "Show Starred Ideas";
  }
}

function handleFilterButton() {
  currentShiftReset();
  filterIdeas();
  displayIdeas();
}