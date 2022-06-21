const generateButton = document.getElementById("generate-button");
const nameDisplay = document.getElementById("name-display");

let characterNamePrefixes = [
  "The",
  "Tor",
  "Tö",
  "Ur",
  "Dru",
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
];
let characterNameSuffixes = [
  "ras",
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
  "phus"
];

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
  removeAllChildren(nameDisplay);
  for (let i = 0; i < 20; i++) {
    result.push(
      randomizeFromArray(characterNamePrefixes) +
        randomizeFromArray(characterNameSuffixes)
    );
  }
  displayArray(result, nameDisplay);
});
