let cards;
let i = 0;

await fetch('./cards.json')
    .then(response => response.json())
    .then(data => cards = data);

const nextCard = document.getElementById("nextCard");
const btns = document.getElementById("btns");
const correct = document.getElementById("correct");
const notCorrect = document.getElementById("notCorrect");

const yesBtn = document.createElement("div");
yesBtn.classList.add("yesBtn");
yesBtn.innerHTML = "Ja";

const noBtn = document.createElement("div");
noBtn.classList.add("noBtn");
noBtn.innerHTML = "Nej";

btns.appendChild(yesBtn);
btns.appendChild(noBtn);

yesBtn.addEventListener("click", () => {
    moveCard(correct)
});
noBtn.addEventListener("click", () => {
    moveCard(notCorrect)
});

const checkResult = async () => {

    btns.removeChild(btns.firstChild);
    btns.removeChild(btns.firstChild);

    const current = document.getElementById("current");
    current.parentNode.removeChild(current);

    let chosenNumber = 0;
    for (let card of correct.children) {
        chosenNumber += parseInt(card.firstChild.firstChild.innerHTML);
    }
    setTimeout(() => {
        alert("Ditt nummer var " + chosenNumber + "!");
    }, "500");
}

const moveCard = (parent) => {
    let lastCard = nextCard.firstChild;
    nextCard.removeChild(lastCard);
    parent.appendChild(lastCard);

    if (i === 4) {
        checkResult();
    }
    else {
        i++;
        makeCard();
    }
}

const makeCard = () => {
    const newCard = document.createElement("div");
    newCard.classList.add("card");

    const numberBox = document.createElement("div");
    for (let number of cards[i]) {
        const newNumber = document.createElement("div");
        newNumber.innerHTML = number;
        numberBox.appendChild(newNumber)
    }
    numberBox.classList.add("numberBox");

    newCard.appendChild(numberBox);
    nextCard.appendChild(newCard);
}

alert("Välj ett nummer mellan 1 och 30");
makeCard()