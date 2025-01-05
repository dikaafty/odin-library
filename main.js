// Selectors
const user = document.querySelector(".user-container");
const info = document.querySelector(".information");
const main = document.querySelector(".library-main");
const dialog = document.querySelector("dialog");
const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const confirmBtn = document.querySelector(".confirm-btn");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const totalPagesInput = document.getElementById("total-pages");
const completedPagesInput = document.getElementById("completed-pages");

// State
let myLibrary = [{
  title: "LOVE",
  author: "ANN",
  pages: "999",
  completed: "999"
}];

// On mount

// Constructor
function Book(title, author, pages, completed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.completed = completed;
}

// Functions
function handleInfoToggle() {
  info.classList.toggle("hide");
}

function resetDialogInputs() {
  titleInput.value = "";
  authorInput.value = "";
  totalPagesInput.value = "";
  completedPagesInput.value = "";
}

function addBookToLibrary() {
  myLibrary.push(new Book(titleInput.value, authorInput.value, 
    totalPagesInput.value, completedPagesInput.value));
}

function displayBook() {
  // Reset main html element
  main.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookContainer = document.createElement("div");
    const bookTitle = document.createElement("p");
    const bookAuthor = document.createElement("p");
    const bookTotalPages = document.createElement("p");
    const readButton = document.createElement("button");
    const editButton = document.createElement("button");
    const removeButton = document.createElement("button");

    bookContainer.classList.add("book-container");

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookTotalPages.textContent = book.pages;
    editButton.textContent = "Edit";
    removeButton.textContent = "✖";

    if(book.completed === book.pages) {
      readButton.textContent = "Already read";
    } else {
      readButton.textContent = "Not read"
    }

    bookContainer.appendChild(removeButton);
    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookTotalPages);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(readButton);
    bookContainer.appendChild(editButton);

    main.appendChild(bookContainer);
  });
}

displayBook();

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
      addBookToLibrary();
      displayBook();
      resetDialogInputs();

      dialog.close();
  }
});