// Selectors
const user = document.querySelector(".user-container");
const info = document.querySelector(".information");
const bookNumber = document.querySelector(".book-number");
const completedBookNumber = document.querySelector(".completed-book-number");
const pagesNumber = document.querySelector(".pages-number");
const completedPagesNumber = document.querySelector(".completed-pages-number");
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
let myLibrary = [
  {
    title: "These Feelings",
    author: "Annie",
    pages: 77,
    completed: 77
  },
  {
    title: "The Return of the King",
    author: "J.R.R. Tolkien",
    pages: 450,
    completed: 450
  }
];


// On mount
bookNumber.textContent = myLibrary.length;


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
    Number(totalPagesInput.value), Number(completedPagesInput.value)));
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
    const buttonContainer = document.createElement("div");

    bookContainer.classList.add("book-container");
    bookTitle.classList.add("book-title");
    bookAuthor.classList.add("book-author");
    bookTotalPages.classList.add("book-pages");
    readButton.classList.add("read-btn");
    editButton.classList.add("edit-btn");
    removeButton.classList.add("remove-btn");

    bookTitle.textContent = `" ${book.title} "`;
    bookAuthor.textContent = book.author;
    bookTotalPages.textContent = `${book.pages} pages`;
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
    buttonContainer.appendChild(readButton);
    buttonContainer.appendChild(editButton);
    bookContainer.appendChild(buttonContainer);

    main.appendChild(bookContainer);
  });
}

displayBook();

function sumPages() {
  let totalPages = 0;

  for(let i = 0; i < myLibrary.length; i++) {
    totalPages += myLibrary[i].pages;
  }

  pagesNumber.textContent = totalPages;
}

sumPages();

function sumCompletedPages() {
  let totalPages = 0;

  for(let i = 0; i < myLibrary.length; i++) {
    totalPages += myLibrary[i].completed;
  }

  completedPagesNumber.textContent = totalPages;
}

sumCompletedPages();

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
      sumPages();
      resetDialogInputs();

      dialog.close();
  }
});