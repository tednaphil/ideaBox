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
  ideas.push(newIdea);
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
        updatehtml(favorites, i, favorite, starred);
      } else {
        if (ideas[index].isFavorite) {
          favorite = "assets/star-active.svg";
          starred = "Starred";
        }
        updatehtml(ideas, index, favorite, starred);
      }
    }
  }

  if (filter) {
    manageNextArrow(false);
    manageBackArrow(false);
  } else {
    if (ideas.length > 3) {
      manageNextArrow(true);
    }
    if (ideas.length - currentShift < 4) {
      manageNextArrow(false);
    }
    if (currentShift > 0) {
      manageBackArrow(true);
    } else if (currentShift === 0) {
      manageBackArrow(false);
    }
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
      if (ideas.length > 2) {
        currentShift--;
      }
      displayIdeas();
    }
  }
  for (var i = 0; i < favorites.length; i++) {
    if (favorites[i].id === iD) {
      favorites.splice(i, 1);
      if (filter && favorites.length === 0) {
        filter = false;
        displayIdeas();
      }
    }
  }
}

function updateFavs(cardId) {
  iD = Number(cardId);
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === iD) {
      if (ideas[i].isFavorite) {
        ideas[i].isFavorite = false;
        for (x = 0; x < favorites.length; x++) {
          favorites.splice(x, 1);
        }
      } else {
        ideas[i].isFavorite = true;
        favorites.push(ideas[i]);
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
    // filter = false;
    filterIdeas();
  }
  displayIdeas();
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
  filterIdeas();
  displayIdeas();
}

function updatehtml(array, i, favorite, starred) {
  if (array && array[i]) {
    ideaGrid.innerHTML += `<div class="card">
          <div class="delete-box" id="${array[i].id}">
              <img class="fav-button clickables" id="${
                array[i].id + 1
              }" src="${favorite}" alt="${starred}">
              <img class="delete-button clickables" src="assets/delete.svg" alt="delete button">
          </div>
          <h2 class="card-title">${array[i].title}</h2>
          <p class="card-body">${array[i].body}</p>
      </div>`;
  }
}
function manageNextArrow(next) {
  if (next) {
    nextArrow.disabled = false;
    nextArrow.classList.remove("fadeOut");
    nextArrow.classList.remove("hidden");
    nextArrow.classList.add("fadeIn");
  } else {
    nextArrow.disabled = true;
    nextArrow.classList.remove("fadeIn");
    nextArrow.classList.add("fadeOut");
    setTimeout(nextArrow.classList.add("hidden"), 750);
  }
}
function manageBackArrow(back) {
  if (back) {
    backArrow.disabled = false;
    backArrow.classList.remove("fadeOut");
    backArrow.classList.remove("hidden");
    backArrow.classList.add("fadeIn");
  } else {
    backArrow.disabled = true;
    backArrow.classList.remove("fadeIn");
    backArrow.classList.add("fadeOut");
    setTimeout(backArrow.classList.add("hidden"), 750);
  }
}
