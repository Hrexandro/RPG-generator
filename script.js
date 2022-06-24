const generateButton = document.getElementById("generate-button");
const nameDisplay = document.getElementById("name-display");
const categoryPicker = document.getElementById("kategoria");
categoryPicker.addEventListener("change", (e) => {
  category = categoryPicker.value;
});
let numberGenerated = 10;
let category = "MBNames";

const MBNames = {
  type: "mixer",
  prefix: [
    "Al",
    "Adal",
    "The",
    "Tor",
    "Tö",
    "Ur",
    "Dru",
    "Vik",
    "Va",
    "Vo",
    "Vra",
    "Vre",
    "We",
    "Ske",
    "Bur",
    "Burd",
    "Jau",
    "Ja",
    "Thro",
    "Tar",
    "Yv",
    "Gre",
    "Li",
    "Ga",
    "Or",
    "Mor",
    "Fe",
    "Wak",
    "Sun",
    "Gra",
    "Kran",
    "Kra",
    "Gne",
    "Kluv",
    "Qift-",
    "Mar",
    "Klo",
    "Dö",
    "Aerg-",
    "Ag",
    "Schlef",
    "Schle",
    "Bel",
    "Dom",
    "Vük",
    "Vü",
    "Bör",
    "Dae",
    "Kath",
    "Fel",
    "Got",
    "Sen",
    "Gri",
    "Haer",
    "Har",
    "Jot",
    "Kar",
    "Kat",
    "Kef",
    "Ku",
    "Kve",
    "Ly",
    "Mer",
    "Nag",
    "Ni",
    "Nif",
    "Prü",
    "Qill",
    "Ri",
    "Svi",
    "Illalukt",
    "Näs",
    "Kjell",
    "Mod",
    "Mund",
    "Eggar",
    "Ulf",
    "Som",
    "Göd",
    "Ärn",
    "Ödh",
    "Ærn",
    "Ylia",
    "Odhen",
    "Pe",
    "Orm",
    "Folk",
    "Gerul",
    "Det",
    "Le",
    "Ra",
    "An",
    "Les",
    "Josil",
    "Sig",
    "Sagso",
    "Hon",
    "Bon",
  ],
  suffix: [
    "ras",
    "fa",
    "rg",
    "vul",
    "rn",
    "m",
    "gel",
    "gal",
    "tan",
    "n",
    "kh",
    "si",
    "tor",
    "mut",
    "lh",
    "der",
    "er",
    "rk",
    "urk",
    "vl",
    "tuk",
    "kin",
    "til",
    "lt",
    "en",
    "gar",
    "gan",
    "ta",
    "ust",
    "vuld",
    "ngel",
    "gul",
    "th",
    "rist",
    "mol",
    "dul",
    "van",
    "lun",
    "tval",
    "zum",
    "sum",
    "kan",
    "buth",
    "kkan",
    "da",
    "ru",
    "an",
    "ban",
    "vel",
    "kil",
    "ttr",
    "rü",
    "gha",
    "mug",
    "na",
    "g",
    "la",
    "tar",
    "rt",
    "tz",
    "tin",
    "kari",
    "l",
    "duk",
    "uk",
    "ehl",
    "nach",
    "sten",
    "nd",
    "ande",
    "sig",
    "biorn",
    "u",
    "her",
    "gärdh",
    "dus",
    "ger",
    "mar",
    "ika",
    "gun",
    "dis",
    "karl",
    "lög",
    "biörn",
    "phus",
    "don",
    "dona",
    "on",
    "chela",
    "dy",
    "bert",
    "berta",
    "fúm",
    "ker",
  ],
};

const MBTowns = {
  type: "mixer",
  prefix: [
    "Alli",
    "Galgen",
    "Schles",
    "Ker",
    "On",
    "Gro",
    "Tor",
    "Skar",
    "Stur",
    "Draken",
  ],
  suffix: ["ans", "beck", "wig", "güs", "da", "vi", "por", "de", "la", "borg"],
};

const MBWeather = {
  type: "picker",
  list: ["rain", "fog"],
};

function removeAllChildren(element) {
  let counter = element.children.length;
  for (let m = 0; m <= counter; m++) {
    if (element.children[0]) {
      element.children[0].remove();
    }
  }
}

function randomizeFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function displayArray(ar, parent) {
  for (j = 0; j < ar.length; j++) {
    let line = document.createElement("p");
    line.innerText = ar[j];
    parent.appendChild(line);
  }
}

generateButton.addEventListener("click", () => {
  let result = [];
  console.log(category);
  console.log(eval(category));
  let pickedCategory = eval(category);
  removeAllChildren(nameDisplay);
  for (let i = 0; i < numberGenerated; i++) {
    if (pickedCategory.type === "mixer")
      result.push(
        randomizeFromArray(pickedCategory.prefix) +
          randomizeFromArray(pickedCategory.suffix)
      );
    else if (pickedCategory.type === "picker") {
      result.push(randomizeFromArray(pickedCategory.list));
    }
  }
  displayArray(result, nameDisplay);
});
