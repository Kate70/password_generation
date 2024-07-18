const ps = {
  uppercaseLetters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercaseLetters: "abcdefghijklmnopqrstuvwxyz",
  symbols: "!@#$%^&*()_+[]{}|;:,.<>?",
  numbers: "0123456789",
};

const passwordLength = document.querySelector(".pass-lenght input");
const passwordDetails = document.querySelector(".pass-lenght .detail span");
const passIndicator = document.querySelector(".pass-indicator ");
const passwordInput = document.querySelector(".input-box input");
const copyButton = document.querySelector(".input-box span");

const randomInteger = (min, max) =>
  Math.floor(min + Math.random() * (max + 1 - min));
const shuffleString = (str) =>
  str
    .split("")
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join("");

const updatePasswordIndicator = (l) => {
  passwordDetails.textContent = l;
  passIndicator.classList.remove("strong", "medium");
  if (l >= 16) passIndicator.classList.add("strong");
  else if (l >= 8) passIndicator.classList.add("medium");
};
const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyButton.textContent = "check";
  copyButton.style.color = "red";
  setTimeout(function () {
    copyButton.textContent = "copy_all";
    copyButton.style.color = "#707070";
  }, 1000);
};

const restorePasswordOptions = () => {
  if (localStorage.getItem("passwordOptions")) {
    const passwordOptions = JSON.parse(localStorage.getItem("passwordOptions"));
    uppercase.checked = passwordOptions["uppercase"];
    numbers.checked = passwordOptions["numbers"];
    symbols.checked = passwordOptions["symbols"];
    passwordLength.value = passwordOptions.length;
    console.log("Restored length:", passwordLength.value);
  }
};

const savePasswordOptions = () => {
  const passwordOptions = {};
  passwordOptions["length"] = +passwordLength.value;
  passwordOptions["uppercase"] = uppercase.checked;
  passwordOptions["numbers"] = numbers.checked;
  passwordOptions["symbols"] = symbols.checked;
  localStorage.setItem("passwordOptions", JSON.stringify(passwordOptions));
};

const generatePassword = () => {
  savePasswordOptions();
  const length = +passwordLength.value;
  updatePasswordIndicator(length);
  let passString = shuffleString(ps.lowercaseLetters);
  if (uppercase.checked)
    passString = shuffleString(passString + ps.uppercaseLetters);
  if (numbers.checked) passString = shuffleString(passString + ps.numbers);
  if (symbols.checked) passString = shuffleString(passString + ps.symbols);

  let randomPassword = "";
  for (let i = 0; i < length; i++) {
    let random = randomInteger(0, passString.length - 1);
    randomPassword += passString[random];
  }
  passwordInput.value = randomPassword;
};

restorePasswordOptions();
passwordLength.oninput = generatePassword;
copyButton.onclick = copyPassword;
document.querySelector(".generate-btn").onclick = generatePassword;
