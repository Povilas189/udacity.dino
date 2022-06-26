// Dino data (from dino.json can't import as it raises "Cross origin requests are only supported for HTTP." error.)
const dinoArray = [
  {
    species: "Triceratops",
    weight: 13000,
    height: 114,
    diet: "herbavor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "First discovered in 1889 by Othniel Charles Marsh",
  },
  {
    species: "Tyrannosaurus Rex",
    weight: 11905,
    height: 144,
    diet: "carnivor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "The largest known skull measures in at 5 feet long.",
  },
  {
    species: "Anklyosaurus",
    weight: 10500,
    height: 55,
    diet: "herbavor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Anklyosaurus survived for approximately 135 million years.",
  },
  {
    species: "Brachiosaurus",
    weight: 70000,
    height: "372",
    diet: "herbavor",
    where: "North America",
    when: "Late Jurasic",
    fact: "An asteroid was named 9954 Brachiosaurus in 1991.",
  },
  {
    species: "Stegosaurus",
    weight: 11600,
    height: 79,
    diet: "herbavor",
    where: "North America, Europe, Asia",
    when: "Late Jurasic to Early Cretaceous",
    fact: "The Stegosaurus had between 17 and 22 seperate places and flat spines.",
  },
  {
    species: "Elasmosaurus",
    weight: 16000,
    height: 59,
    diet: "carnivor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Elasmosaurus was a marine reptile first discovered in Kansas.",
  },
  {
    species: "Pteranodon",
    weight: 44,
    height: 20,
    diet: "carnivor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Actually a flying reptile, the Pteranodon is not a dinosaur.",
  },
  {
    species: "Pigeon",
    weight: 0.5,
    height: 9,
    diet: "herbavor",
    where: "World Wide",
    when: "Holocene",
    fact: "All birds are living dinosaurs.",
  },
];

// Create Dino Constructor
function DinoConstructor(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
  this.image = `images/${species.toLowerCase()}.png`;
}

// Create Dino Compare Method 1: Comparing weights
// NOTE: Weight in JSON file is in lbs, height in inches.
DinoConstructor.prototype.compareWeight = function (Weight) {
  if (this.weight > Weight) {
    return `${this.species} weighed ${(this.weight / Weight).toFixed(
      1
    )} times more than you!`;
  } else if (this.weight < Weight) {
    return `You weight ${(Weight / this.weight).toFixed(1)} times more than ${
      this.species
    }!`;
  }
  return `You weigh the same as ${this.species}!`;
};

// Create Dino Compare Method 2:  Comparing height
DinoConstructor.prototype.compareHeight = function (Height) {
  let heightDifference = Math.floor(this.height / Height);
  if (this.height < Height) {
    return "You were taller than this dinosaur!";
  } else {
    return `This dinosaur was ${heightDifference} times taller than you.`;
  }
};

// Create Dino Compare Method 3 : Comparing diet
DinoConstructor.prototype.compareDiet = function (Diet) {
  if (this.diet === Diet) {
    return `You and this dinosaur was a ${this.diet}!`;
  } else {
    return `This dinosaur was a ${this.diet} and you ${Diet}`;
  }
};

function init() {
  // Create Dino Objects
  const dinoObjects = dinoArray.map(
    (dino) =>
      new DinoConstructor(
        dino.species,
        dino.weight,
        dino.height,
        dino.diet,
        dino.where,
        dino.when,
        dino.fact
      )
  );

  // Create Human Object
  const human = new DinoConstructor(
    "human",
    61,
    4.5,
    "omnivore",
    "worldwide",
    "now",
    "Humans are the only one how will finish this task"
  );

  // Use IIFE to get human data from form
  (function getHumanData() {
    const name = document.getElementById("name").value;
    const weight = document.getElementById("weight").value;
    const height =
      document.getElementById("feet").value +
      document.getElementById("inches").value / 12;
    const diet = document.getElementById("diet").value.toLowerCase();
    human.name = name;
    human.weight = weight;
    human.height = height;
    human.diet = diet;
  })();
  dinoObjects.splice(4, 0, human);

  // Generate Tiles for each Dino in Array
  const tiles = dinoObjects.map((dino) => {
    const documentFragment = document.createDocumentFragment();
    const containerDiv = document.createElement("div");
    containerDiv.className = "grid-item";

    const img = document.createElement("img");
    img.src = dino.image;

    const title = document.createElement("h3");
    const fact = document.createElement("p");

    if (dino.species === "human") {
      title.innerHTML = human.name;
    } else if (dino.species === "Pigeon") {
      title.innerHTML = dino.species;
      fact.innerHTML = dino.fact;
    } else {
      title.innerHTML = dino.species;
      fact.innerHTML = ((_) => {
        let result = "";
        // Generate random number expected output
        const random = Math.floor(Math.random() * 6);
        switch (random) {
          case 0:
            result = dino.compareHeight(human.height);
            break;
          case 1:
            result = dino.compareWeight(human.weight);
            break;
          case 2:
            result = dino.compareDiet(human.diet);
            break;
          case 3:
            result = `The ${dino.species} lived in what is now ${dino.where}.`;
            break;
          case 4:
            result = `The ${dino.species} was found in the ${dino.when}.`;
            break;
          case 5:
            result = dino.fact;
            break;
        }
        return result;
      })();
    }
    containerDiv.appendChild(title);
    containerDiv.appendChild(img);
    containerDiv.appendChild(fact);
    documentFragment.appendChild(containerDiv);
    return documentFragment;
  });

  // Add tiles to DOM
  //const grid = document.getElementById("grid");
  tiles.forEach((tile) => document.getElementById("grid").appendChild(tile));

  // Remove form from screen
  document.getElementById("dino-compare").innerHTML = "";
}

// On button click, prepare and display infographic
const submitBtn = document.querySelector("#btn");

submitBtn.addEventListener("click", init);
