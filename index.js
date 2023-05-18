let pseudoStart = "";
let pseudoEnd = "";
let randomWord = "";
let pseudo = "";

const setPseudo = () => {
  start.addEventListener("input", (e) => {
    pseudoStart = e.target.value;
  });

  end.addEventListener("input", (e) => {
    pseudoEnd = e.target.value;
  });
};

const randomiseWord = () => {
  let firstNumber = Math.floor(Math.random() * 4);
  let secondNumber = Math.floor(Math.random() * 3) + 4;
  fetch("https://trouve-mot.fr/api/random")
    .then((response) => response.json())
    .then((words) => {
      randomWord = words[0].name.substring(firstNumber, secondNumber);
    });
};

setPseudo();
randomiseWord();

btn.addEventListener("click", () => {
  pseudo = pseudoStart + randomWord + pseudoEnd;
  if (pseudoStart === "" && pseudoEnd === "") {
    result.innerHTML = "";
    error.innerHTML =
      "Choisis au moins un début ou une fin pour un pseudo unique.";
  } else {
    error.innerHTML = "";
    result.innerHTML = pseudo;
    randomiseWord();
    copy.style.display = "none";
  }
});

result.addEventListener("click", () => {
  navigator.clipboard.writeText(pseudo);
  result.innerHTML = "Pseudo copié !";
  setTimeout(() => {
    result.innerHTML = pseudo;
  }, 1000);
});
