// CARD DATA
const cardName = document.querySelector(".card-front-name");
const cardNumber = document.querySelector(".card-front-number");
const cardDate = document.querySelector(".card-front-date");
const cardCVC = document.querySelector(".card-back-cvc");

// FORMS
const formName = document.getElementById("form-name");
const formNumber = document.getElementById("number");
const formDateMM = document.getElementById("date-mm");
const formDateYY = document.getElementById("date-yy");
const formCVC = document.getElementById("cvc");

// MESSAGES
const formNameMessage = document.getElementById("cardholder-name-message");
const formNumberMessage = document.getElementById("card-number-message");
const formDateMessage = document.getElementById("exp-date-message");
const formCVCMessage = document.getElementById("cvc-message");

// BUTTONS
const submitBtn = document.getElementById("submit-btn");
const goBackBtn = document.getElementById("go-back");

let isValid = false;

formName.addEventListener("input", () => {
  cardName.innerText = formName.value;
  if (formName.value == "") {
    cardName.innerText = "Jane Appleseed";
  }
});

formNumber.addEventListener("input", function (e) {
  e.target.value = e.target.value
    .replace(/[^\dA-Z]/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
  cardNumber.innerText = formNumber.value;
  if (formNumber.value == "") {
    cardNumber.innerText = "1234 5678 9123 0000";
  }
});

formDateMM.addEventListener("input", () => {
  cardDate.innerText = `${formDateMM.value}/${formDateYY.value}`;
});

formDateYY.addEventListener("input", () => {
  cardDate.innerText = `${formDateMM.value}/${formDateYY.value}`;
});

formCVC.addEventListener("input", () => {
  cardCVC.innerText = formCVC.value;
});

function showErrorMessage(element_text, element, message) {
  isValid = false;

  element_text.style.visibility = "visible";
  element_text.innerText = message;
  element.classList.add("input-warning");

  setTimeout(() => {
    element.classList.remove("input-warning");
  }, 3000);
}

function showSuccessInput(element) {
  element.classList.add("input-success");

  setTimeout(() => {
    element.classList.remove("input-success");
  }, 3000);
}

const errorMsg1 = "Can't be blank";
const errorMsg2 = "Wrong format, numbers only";

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  isValid = true;

  if (formName.value == "" || formName.value == undefined) {
    showErrorMessage(formNameMessage, formName, errorMsg1);
  } else {
    showSuccessInput(formName);
  }

  if (formNumber.value == "" || formNumber.value == undefined) {
    showErrorMessage(formNumberMessage, formNumber, errorMsg1);
  } else {
    if (!/^(\s*[0-9]+\s*)+$/.test(formNumber.value)) {
      showErrorMessage(formNumberMessage, formNumber, errorMsg2);
    } else {
      showSuccessInput(formNumber);
    }
  }

  if (
    formDateMM.value == "" ||
    formDateMM.value == undefined ||
    formDateYY.value == "" ||
    formDateYY.value == undefined
  ) {
    showErrorMessage(formDateMessage, formDateMM, errorMsg1);
    showErrorMessage(formDateMessage, formDateYY, errorMsg1);
  } else {
    if (
      !/^(\s*[0-9]+\s*)+$/.test(formDateMM.value) ||
      !/^(\s*[0-9]+\s*)+$/.test(formDateYY.value)
    ) {
      showErrorMessage(formDateMessage, formDateMM, errorMsg2);
      showErrorMessage(formDateMessage, formDateYY, errorMsg2);
    } else {
      showSuccessInput(formDateMM);
      showSuccessInput(formDateYY);
    }
  }

  if (formCVC.value == "" || formCVC.value == undefined) {
    showErrorMessage(formCVCMessage, formCVC, errorMsg1);
  } else {
    if (!/^(\s*[0-9]+\s*)+$/.test(formCVC.value)) {
      showErrorMessage(formCVCMessage, formCVC, errorMsg2);
    } else {
      showSuccessInput(formCVC);
    }
  }

  if (isValid) {
    const formWrapper = document.querySelector(".form-wrapper");
    const thanksContainer = document.querySelector(".thanks-container");

    formWrapper.style.opacity = 0;

    setTimeout(() => {
      thanksContainer.style.display = "flex";
      formWrapper.style.display = "none";
      setTimeout(() => {
        thanksContainer.style.opacity = 1;
      }, 100);
    }, 1000);
  }
});

goBackBtn.addEventListener("click", () => {
  location.reload();
});
