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
const authorLabel = document.querySelector("#author ~ label");
const totalPagesLabel = document.querySelector("#total-pages ~ label");
const completedPagesLabel = document.querySelector("#completed-pages ~ label");
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


  myLibrary.forEach((book, index) => {
    const previousCompletedPages = book.completed; 

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

    removeButton.setAttribute("data-index", index);

    bookTitle.textContent = `" ${book.title} "`;
    bookAuthor.textContent = book.author;
    bookTotalPages.textContent = `${book.pages} pages`;
    editButton.textContent = "Edit";
    removeButton.textContent = "✖";

    if(book.completed === book.pages) {
      readButton.textContent = "Already read";
      readButton.className = "read-btn already-read";
    } else if(book.completed > 0 && book.completed < book.pages) {
      readButton.textContent = "Reading";
      readButton.className = "read-btn reading";
    } else {
      readButton.textContent = "Not read";
      readButton.className = "read-btn not-read";
    }

    bookContainer.appendChild(removeButton);
    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookTotalPages);
    bookContainer.appendChild(bookAuthor);
    buttonContainer.appendChild(readButton);
    buttonContainer.appendChild(editButton);
    bookContainer.appendChild(buttonContainer);

    main.appendChild(bookContainer);

    removeButton.addEventListener("click", () => {
      myLibrary.splice(index, 1);

      displayBook();

      manipulateStats();
    });

    readButton.addEventListener("click", () => {
      const buttonState = readButton.textContent;

      if(buttonState === "Not read") {
        readButton.textContent = "Reading";
        readButton.className = "read-btn reading";

        book.completed = previousCompletedPages;

        manipulateStats();
      } else if(buttonState === "Reading") {
        readButton.textContent = "Already read";
        readButton.className = "read-btn already-read";

        book.completed = book.pages;

        manipulateStats();
      } else if(buttonState === "Already read") {
        readButton.textContent = "Not read";
        readButton.className = "read-btn not-read";

        book.completed = 0;
        
        manipulateStats();
      }
    });

    editButton.addEventListener("click", () => {
      titleInput.value = book.title;
      authorInput.value = book.author;
      totalPagesInput.value = book.pages;
      completedPagesInput.value = book.completed;

      dialog.showModal();

      myLibrary.splice(index, 1);
    });

  });
}

displayBook();

function countCompletedBook() {
  let completedBook = 0;

  for(let i = 0; i < myLibrary.length; i++) {
    if(myLibrary[i].completed === myLibrary[i].pages) {
      completedBook++;
    }
  }

  completedBookNumber.textContent = completedBook;
}

countCompletedBook();

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

function manipulateStats() {
  bookNumber.textContent = myLibrary.length;
  sumPages();
  sumCompletedPages();
  countCompletedBook();
}

function hasNumber(myString) {
  return /\d/.test(myString);
}

function handleAuthorInputInvalid() {
  if(hasNumber(authorInput.value)) {
    authorLabel.textContent = "The author must not contain a number";
    authorLabel.style.color = "red";
  } else if(authorInput.value === "") {
    authorLabel.textContent = "The author must contain a letter between 1 and 30";
    authorLabel.style.color = "red";
  } else {
    authorLabel.textContent = "Author";
    authorLabel.style.color = "#cf4c00";
  }
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
    totalPagesInput.value && completedPagesInput.value &&
    authorLabel.textContent === "Author" && 
    totalPagesLabel.textContent === "Total Pages" && 
    completedPagesLabel.textContent === "Completed Pages") {
      addBookToLibrary();
      displayBook();
      manipulateStats();
      resetDialogInputs();

      dialog.close();
  }
});

authorInput.addEventListener("keyup", handleAuthorInputInvalid);