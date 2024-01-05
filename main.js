var titleField = document.querySelector("#submitted-title");
var bodyField = document.querySelector("#submitted-body");
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
filterButton.addEventListener("click", filterIdeas);
document.addEventListener("click", checkStars);

var ideas = [];
var currentShift = 0;
var favorites = [];
var filter = false;

saveButton.disabled = true;

function checkFields() {
  if (titleField.value && bodyField.value) {
    saveButton.disabled = false;
    saveButton.classList.remove(`grey-out`);
  } else {
    saveButton.classList.add("grey-out");
    saveButton.disabled = true;
  }
}

function checkStars() {
    if (favorites.length > 0 || (filterButton.innerHTML === "Show All Ideas"))  {
      filterButton.classList.remove('hidden');
    } else {
      filterButton.classList.add('hidden');
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
  // var displayIndexStart = 3
  for (var i = 0; i < ideas.length; i++) {
    var favorite = "assets/star.svg";
    var starred = "Unstarred";
    if (i < 3) {
      if (ideas[i + currentShift].isFavorite) {
        favorite = "assets/star-active.svg";
        starred = "Starred";
      }
      if (filter) {
        if (ideas[i + currentShift].isFavorite) {
          updatehtml(i, favorite, starred);
        }
      } else {
        updatehtml(i, favorite, starred);
      }
    }
  }
  if (ideas.length > 3) {
    nextArrow.disabled = false;
    nextArrow.classList.remove("fadeOut");
    nextArrow.classList.remove("hidden");
    nextArrow.classList.add("fadeIn");
  }
  if (ideas.length - currentShift < 4) {
    nextArrow.disabled = true;
    nextArrow.classList.remove("fadeIn");
    nextArrow.classList.add("fadeOut");
    setTimeout((nextArrow.classList.add("hidden")), 750);
  }
  if (currentShift > 0) {
    backArrow.disabled = false;
    backArrow.classList.remove("fadeOut");
    backArrow.classList.remove("hidden");
    backArrow.classList.add("fadeIn");
  } else if (currentShift === 0) {
    backArrow.disabled = true;
    backArrow.classList.remove("fadeIn");
    backArrow.classList.add("fadeOut");
    setTimeout((backArrow.classList.add("hidden")), 750);
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
  for (i = 0; i < favorites.length; i++) {
    if (favorites[i].id === iD) {
      favorites.splice(i, 1);
    }
  }
}

function updateFavs(cardId) {
  iD = Number(cardId);
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === iD) {
      if (ideas[i].isFavorite) {
        ideas[i].isFavorite = false;
        favorites.splice(i, 1);
      } else {
        ideas[i].isFavorite = true;
        favorites.push(ideas[i]);
      }
    }
  }
}

function toggleStar(starId) {
//   console.log(starId);
  var starIcon = document.getElementById(starId);
  // console.log(`clicked star element`, starIcon)
  // console.log(starIcon.src)
  // console.log(`defult icon displayed`, starIcon.src.includes("assets/star.svg"))
  if (starIcon.src.includes("assets/star.svg")) {
    starIcon.src = "assets/star-active.svg";
  } else if (starIcon.src.includes("assets/star-active.svg")) {
    starIcon.src = "assets/star.svg";
  }
  // console.log(starIcon.src)
  displayIdeas();
}

function filterIdeas() {
  filter = !filter; //  im so proud of this it will now toggle false and true hahah
  if (filter) {
    filterButton.innerHTML = "Show All Ideas";
  } else {
    filterButton.innerHTML = "Show Starred Ideas";
  }
  displayIdeas();
}

function updatehtml(i, favorite, starred) {
  ideaGrid.innerHTML += `<div class="card">
    <div class="delete-box" id="${ideas[i + currentShift].id}">
        <img class = "fav-button clickables" id="${
          ideas[i + currentShift].id + 1
        }" src = "${favorite}" alt = "${starred}">
        <img class="delete-button clickables" src="assets/delete.svg" alt="delete button">
    </div>
    <h2 class="card-title">${ideas[i + currentShift].title}</h2>
    <p class="card-body">${ideas[i + currentShift].body}</p>
</div>`;
}
