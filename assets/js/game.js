const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");

// Initializing game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    // Ressetting game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "assets/imgs/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word; // Making currentWord as random word
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    // After game complete.. showing modal with relevant details
    const modalText = isVictory ? `Tu palabra es:` : 'La respuesta es:';
    gameModal.querySelector("img").src = `assets/imgs/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Felicidades!' : 'Game Over!';
    const guessedWordSpan = gameModal.querySelector("#guessed-word");
    guessedWordSpan.innerHTML = `<b>${currentWord}</b>`;
    
    gameModal.classList.add("show");
}

const initGame = (button, clickedLetter) => {
    // Checking if clickedLetter is exist on the currentWord
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `assets/imgs/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true; // Disabling the clicked button so user can't click again
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Calling gameOver function if any of these condition meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", () => {
    getRandomWord();
    resetGame();
});

// Scramble
const wordText = document.querySelector(".word"),
    hintText = document.querySelector(".hint span"),
    timeText = document.querySelector(".time b"),
    inputField = document.querySelector("input"),
    refreshBtn = document.querySelector(".refresh-word"),
    checkBtn = document.querySelector(".check-word"),
    iniciarBtn = document.querySelector(".iniciar-btn");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            timeText.innerText = maxTime;
        } else {
            clearInterval(timer); // Detiene el temporizador cuando el tiempo se agota
            alert(`¡Se acabó el tiempo! ${correctWord.toUpperCase()} era la palabra correcta`);
            desbloquearScramble(); // Añadir esta línea para desbloquear los controles
            iniciarBtn.innerText = "Iniciar"; // Cambiar el texto del botón a "Iniciar"
            // initGameSc(); // Eliminar esta línea, ya que no es necesario reiniciar el juego aquí
        }
    }, 1000);
};

const initGameSc  = () => {
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if (!userWord) return alert("Por favor ingrese la palabra correcta!");
    if (userWord !== correctWord) return alert(`Oops! ${userWord} no es correcto`);
    alert(`¡Felicitaciones! ${correctWord.toUpperCase()} es correcto`);
    
    // Reinicia el juego con una nueva palabra
    initGameSc();
}

const bloquearScramble = () => {
    inputField.setAttribute("disabled", true);
    refreshBtn.setAttribute("disabled", true);
    checkBtn.setAttribute("disabled", true);
}

const desbloquearScramble = () => {
    inputField.removeAttribute("disabled");
    refreshBtn.removeAttribute("disabled");
    checkBtn.removeAttribute("disabled");
}

iniciarBtn.addEventListener("click", () => {
    desbloquearScramble();
    initTimer(30);
    initGameSc();
    iniciarBtn.innerText = "Reiniciar";
});

refreshBtn.addEventListener("click", initGameSc);
checkBtn.addEventListener("click", checkWord);


// juego memoria

var library = {
    pokemon: [
      'https://res.cloudinary.com/beumsk/image/upload/v1547980025/memory/Pokemon/Bulbasaur.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980083/memory/Pokemon/Charmander.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980101/memory/Pokemon/Squirtle.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980116/memory/Pokemon/Pikachu.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980129/memory/Pokemon/Mewtwo.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980142/memory/Pokemon/Mew.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980154/memory/Pokemon/Articuno.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980164/memory/Pokemon/Zapdos.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980175/memory/Pokemon/Moltres.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980186/memory/Pokemon/Eevee.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980025/memory/Pokemon/Bulbasaur.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980083/memory/Pokemon/Charmander.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980101/memory/Pokemon/Squirtle.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980116/memory/Pokemon/Pikachu.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980129/memory/Pokemon/Mewtwo.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980142/memory/Pokemon/Mew.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980154/memory/Pokemon/Articuno.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980164/memory/Pokemon/Zapdos.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980175/memory/Pokemon/Moltres.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980186/memory/Pokemon/Eevee.png'
    ],
    starwars: [
      'https://res.cloudinary.com/beumsk/image/upload/v1547980981/memory/starwars/anakin%20skywalker.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981009/memory/starwars/luke%20skywalker.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981022/memory/starwars/Obi%20wann.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981054/memory/starwars/Han%20solo.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981074/memory/starwars/chewbacca.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981095/memory/starwars/yoda.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981117/memory/starwars/dark%20sidious.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981141/memory/starwars/dark%20vador.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981165/memory/starwars/padme.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981190/memory/starwars/leia.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980981/memory/starwars/anakin%20skywalker.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981009/memory/starwars/luke%20skywalker.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981022/memory/starwars/Obi%20wann.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981054/memory/starwars/Han%20solo.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981074/memory/starwars/chewbacca.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981095/memory/starwars/yoda.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981117/memory/starwars/dark%20sidious.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981141/memory/starwars/dark%20vador.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981165/memory/starwars/padme.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981190/memory/starwars/leia.jpg'
    ],
    lotr: [
      'https://res.cloudinary.com/beumsk/image/upload/v1547981408/memory/lotr/gandalf.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981438/memory/lotr/sauron.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981469/memory/lotr/Aragorn.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981501/memory/lotr/legolas.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981535/memory/lotr/Gimli.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981603/memory/lotr/golum.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981645/memory/lotr/sam.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981686/memory/lotr/saroumane.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981738/memory/lotr/bilbo.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981802/memory/lotr/frodo.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981408/memory/lotr/gandalf.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981438/memory/lotr/sauron.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981469/memory/lotr/Aragorn.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981501/memory/lotr/legolas.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981535/memory/lotr/Gimli.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981603/memory/lotr/golum.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981645/memory/lotr/sam.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981686/memory/lotr/saroumane.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981738/memory/lotr/bilbo.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981802/memory/lotr/frodo.jpg'
    ],
    disney: [
      'https://res.cloudinary.com/beumsk/image/upload/v1547982044/memory/disney/mickey.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982088/memory/disney/mowgli.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982610/memory/disney/tarzan.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982620/memory/disney/simba.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982628/memory/disney/aladin.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982636/memory/disney/blanche%20neige.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982644/memory/disney/alice.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982653/memory/disney/peter%20pan.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982663/memory/disney/pinocchio.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982738/memory/disney/raiponce.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982044/memory/disney/mickey.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982088/memory/disney/mowgli.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982610/memory/disney/tarzan.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982620/memory/disney/simba.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982628/memory/disney/aladin.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982636/memory/disney/blanche%20neige.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982644/memory/disney/alice.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982653/memory/disney/peter%20pan.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982663/memory/disney/pinocchio.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982738/memory/disney/raiponce.jpg'
    ],
    pixar: [
      'https://res.cloudinary.com/beumsk/image/upload/v1547982971/memory/pixar/up.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982987/memory/pixar/buzz.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547983000/memory/pixar/woody.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547983016/memory/pixar/Remy.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547983032/memory/pixar/Mike.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547983077/memory/pixar/Nemo.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547983114/memory/pixar/wall-e.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547983169/memory/pixar/Mr-Incredible.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547983381/memory/pixar/sully.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547983403/memory/pixar/flash%20mcqueen.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982971/memory/pixar/up.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547982987/memory/pixar/buzz.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547983000/memory/pixar/woody.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547983016/memory/pixar/Remy.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547983032/memory/pixar/Mike.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547983077/memory/pixar/Nemo.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547983114/memory/pixar/wall-e.png',
      'https://res.cloudinary.com/beumsk/image/upload/v1547983169/memory/pixar/Mr-Incredible.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547983381/memory/pixar/sully.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547983403/memory/pixar/flash%20mcqueen.jpg'
    ],
    harrypotter: [
      'https://res.cloudinary.com/beumsk/image/upload/v1547998926/memory/harrypotter/harry.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547998958/memory/harrypotter/ron.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547998992/memory/harrypotter/hermione.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547999106/memory/harrypotter/dumbledore.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547999032/memory/harrypotter/malfoy.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547999143/memory/harrypotter/voldemort.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547999401/memory/harrypotter/rogue.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547999196/memory/harrypotter/hagrid.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547999271/memory/harrypotter/sirius.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547999577/memory/harrypotter/neville.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547998926/memory/harrypotter/harry.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547998958/memory/harrypotter/ron.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547998992/memory/harrypotter/hermione.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547999106/memory/harrypotter/dumbledore.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547999032/memory/harrypotter/malfoy.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547999143/memory/harrypotter/voldemort.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547999401/memory/harrypotter/rogue.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547999196/memory/harrypotter/hagrid.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547999271/memory/harrypotter/sirius.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547999577/memory/harrypotter/neville.jpg'
    ]
  }
  
  var images = [];
var tempElt1 = "";
var tempElt2 = "";
var click = -1;
var win = 0;
var score = 0;
var time = 0;

var preElt = document.querySelector("#pre");
var themesElt = document.querySelector("#themes");
var boxElts = document.getElementsByClassName("box");
var mainElt = document.querySelector(".main");
var timeElt = document.querySelector("#time");
var scoreElt = document.querySelector("#score");
var postElt = document.querySelector("#post");
var finalElt = document.querySelector("#final");
var againElt = document.querySelector("#again");
var startGameBtn = document.getElementById("startGame");

startGameBtn.addEventListener("click", function () {
    preElt.classList.remove("hidden"); // Mostrar el elemento pre al presionar el botón
    activateTheme("pokemon"); // Cambia esto al tema que prefieras inicialmente
});

// initiate the game with the chosen theme
themesElt.addEventListener("click", function (e) {
    if (e.target.classList.contains("themes")) {
        activateTheme(e.target.id);
        preElt.classList.add("hidden");
    }
});

againElt.addEventListener("click", function () {
    // Reiniciar todas las variables y elementos relevantes
    for (let i = 0; i < boxElts.length; i++) {
        boxElts[i].classList.add("play");
        boxElts[i].innerHTML = "<img src='' alt='image' class='hidden'>";
    }

    images = [];
    tempElt1 = "";
    tempElt2 = "";
    click = -1;
    win = 0;
    score = 0;
    time = 0;
    timeElt.innerHTML = "0";
    scoreElt.innerHTML = "0";
    finalElt.innerHTML = "";
    postElt.classList.add("hidden");
    mainElt.addEventListener("click", gameLogic);
    preElt.classList.remove("hidden");
});

function activateTheme(theme) {
    // insert theme in the images array
    for (let i = 0; i < 20; i++) {
        images.push(library[theme][i]);
    }
    // insert images in the memory game
    for (let i = 0; i < 20; i++) {
        var rand = Math.floor(Math.random() * (images.length - 1));
        boxElts[i].innerHTML =
            "<img src='" + images[rand] + "' alt='image' class='hidden'>";
        images.splice(rand, 1);
    }
}

// Handle the play
mainElt.addEventListener("click", gameLogic);

function gameLogic(e) {
    // make sure the box is playable
    if (e.target && e.target.classList && e.target.classList.contains("play")) {
        var clickedImage = e.target.firstChild;

        // make sure clickedImage is not null
        if (!clickedImage) {
            return;
        }

        clickedImage.classList.remove("hidden");
        // first of two clicks
        if (click < 1) {
            tempElt1 = e.target;
            // timer
            if (click === -1) {
                timer = setInterval(function () {
                    time++;
                    timeElt.innerHTML = time;
                }, 1000);
            }
            click = 1;
        }

        // second click
        else if (e.target !== tempElt1) {
            tempElt2 = e.target;

            // make sure tempElt1.firstChild and tempElt2.firstChild are not null
            if (!tempElt1.firstChild || !tempElt2.firstChild) {
                return;
            }

            // different images
            if (tempElt1.firstChild.src !== tempElt2.firstChild.src) {
                mainElt.removeEventListener("click", gameLogic);
                setTimeout(function () {
                    tempElt1.firstChild.classList.add("hidden");
                    tempElt2.firstChild.classList.add("hidden");
                    mainElt.addEventListener("click", gameLogic);
                }, 400);
                if (score > 0) {
                    score -= 2;
                }
                scoreElt.innerHTML = score;
            }

            // same images
            else {
                score += 10;
                win += 2;
                tempElt1.firstChild.classList.add("outlined");
                tempElt2.firstChild.classList.add("outlined");
                tempElt1.classList.remove("play");
                tempElt2.classList.remove("play");
                scoreElt.innerHTML = score;

                // game won
                if (win === 20) {
                    clearInterval(timer);
                    finalElt.innerHTML =
                        "Ganaste " + score + " puntos <br> en " + time + " segundos";
                    postElt.classList.remove("hidden");
                }
            }
            click = 0;
        }
    }
}
