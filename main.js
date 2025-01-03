// Selectors
const user = document.querySelector(".user-container");
const info = document.querySelector(".information");
const dialog = document.querySelector("dialog");
const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const confirmBtn = document.querySelector(".confirm-btn");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const totalPagesInput = document.getElementById("total-pages");
const completedPagesInput = document.getElementById("completed-pages");

// State
let myLibrary = [];

// On mount

// Constructor
function Book(title, author, pages, completed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.completed = completed;
}

// Handlers
handleInfoToggle = () => {
  info.classList.toggle("hide");
}

resetDialogInputs = () => {
  titleInput.value = "";
  authorInput.value = "";
  totalPagesInput.value = "";
  completedPagesInput.value = "";
}

// Events
user.addEventListener("click", handleInfoToggle);

addBtn.addEventListener("click", () => {
  dialog.showModal();
});

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();

  resetDialogInputs();

  dialog.close();
});

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if(titleInput.value && authorInput.value &&
    totalPagesInput.value && completedPagesInput.value) {
      resetDialogInputs();
      dialog.close();
  }
});