const result = document.getElementById("result");
const copy = document.getElementById("copy");
const range = document.getElementById("range");
const rangeNumber = document.getElementById("range-text");

const lowercase = document.getElementById("lowercase");
const uppercase = document.getElementById("uppercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const strength = document.getElementById("strength-text");
const strengthbars = document.querySelectorAll(".strength-bar");

const generateBtn = document.getElementById("generate-btn");

let difficulty = 0;
let factor = 0;

lowercase.addEventListener("change", () => {
  if (lowercase.checked) {
    factor++;
  } else {
    factor--;
  }

  changeDifficulty();
});

uppercase.addEventListener("change", () => {
  if (uppercase.checked) {
    factor++;
  } else {
    factor--;
  }

  changeDifficulty();
});

numbers.addEventListener("change", (e) => {
  if (numbers.checked) {
    factor++;
  } else {
    factor--;
  }

  changeDifficulty();
});

symbols.addEventListener("change", () => {
  if (symbols.checked) {
    factor++;
  } else {
    factor--;
  }

  changeDifficulty();
});

range.oninput = function () {
  rangeNumber.innerText = this.value;

  if (this.value > 4) {
    difficulty = 1;
  }
  if (this.value > 9) {
    difficulty = 2;
  }
  if (this.value > 14) {
    difficulty = 3;
  }
  if (this.value > 19) {
    difficulty = 4;
  }
  if (this.value > 24) {
    difficulty = 5;
  }
  if (this.value > 29) {
    difficulty = 6;
  }

  changeDifficulty();
};

function changeDifficulty() {
  let passwordStrength = difficulty + factor;

  strengthbars.forEach((el, i) => {
    if (passwordStrength >= i + 1) {
      el.style.background = `rgba(159, 251, 168, ${(i + 1) / 10}`;
    } else {
      el.style.background = `rgba(159, 251, 168, 0.0)`;
    }
  });

  switch (passwordStrength) {
    case 1:
      strength.innerText = "Weak";
      break;
    case 2:
      strength.innerText = "Weak";
      break;
    case 3:
      strength.innerText = "Normal";
      break;
    case 4:
      strength.innerText = "Normal";
      break;
    case 5:
      strength.innerText = "Medium";
      break;
    case 6:
      strength.innerText = "Medium";
      break;
    case 7:
      strength.innerText = "Hard";
      break;
    case 8:
      strength.innerText = "Hard";
      break;
    case 9:
      strength.innerText = "Ultimate";
      break;
    case 10:
      strength.innerText = "Impossible";
    default:
      break;
  }
}

copy.addEventListener("click", () => {
  copying();
});

const copying = async () => {
  try {
    await navigator.clipboard.writeText(result.value);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

function generateLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function generateUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function generateNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function generateSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/',.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword(length, lower, upper, number, symbol) {
  let generatedPassword = "";
  let randomIterator = lower + upper + number + symbol;

  if (randomIterator == 0) {
    return "";
  }

  const optionsArray = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  let randomNum = 0;

  for (let i = 0; i < length; i++) {
    // calling functions in a random way
    randomNum = Math.floor(Math.random() * randomIterator);
    const callingFunction = Object.keys(optionsArray[randomNum])[0];
    switch (callingFunction) {
      case "lower":
        generatedPassword += generateLower();
        break;
      case "upper":
        generatedPassword += generateUpper();
        break;
      case "number":
        generatedPassword += generateNumber();
        break;
      case "symbol":
        generatedPassword += generateSymbol();
        break;
      default:
        break;
    }
  }

  console.log(generatedPassword);

  result.value = generatedPassword;
}

generateBtn.addEventListener("click", () => {
  const length = +range.value;
  const isLower = lowercase.checked;
  const isUpper = uppercase.checked;
  const isNumber = numbers.checked;
  const isSymbol = symbols.checked;

  result.innerText = generatePassword(
    length,
    isLower,
    isUpper,
    isNumber,
    isSymbol
  );
});
