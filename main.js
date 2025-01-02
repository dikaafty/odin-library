// Selectors
const user = document.querySelector(".user-container");
const info = document.querySelector(".information");
const dialog = document.querySelector("dialog");
const addBtn = document.querySelector(".add-btn");

// State

// On mount

// Handlers
handleInfoToggle = () => {
  info.classList.toggle("hide");
}

// Events
user.addEventListener("click", handleInfoToggle);

addBtn.addEventListener("click", () => {
  dialog.showModal();
});