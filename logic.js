const contentContainer = document.querySelector(".content-container");
const newBookButton = document.querySelector(".create-book");
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("#dialog-close");
const submitButton = document.querySelector("#dialog-submit");
const form = document.querySelector("form");

let myLibrary = [];

function Book(title, author, pages, summary = "No summary available") {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.summary = summary;
  this.isRead = true;
}

function addBookToLibrary(title, author, pages, summary) {
  let tempBook = new Book(title, author, pages, summary);
  myLibrary.push(tempBook);
  return tempBook;
}

function displayBook() {
  contentContainer.replaceChildren();
  for (let i = 0; i < myLibrary.length; i++) {
    createNewBookCard(myLibrary[i]);
  }
}

function createNewBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("content-card");
  card.setAttribute("id", `${book.id}`);
  card.innerHTML = `
<div class="content-card-title">${book.title}</div>
<div class="content-card-id"><strong>ID: </strong>${book.id}</div>
<div class="content-card-author"><strong>Author: </strong>${book.author}</div>
<div class="content-card-pages">${book.pages} pages</div>
<div class="content-card-summary">${book.summary}</div>
<div class="content-card-bottom">
  <button class="content-card-delete">Delete</button>
  <button class="content-card-read-status">Read</button>
</div>
`;
  contentContainer.appendChild(card);
}

newBookButton.addEventListener("click", () => {
  dialog.showModal();
  form.reset();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const summary =
    document.getElementById("summary").value || "No summary available";

  dialog.close();
  createNewBookCard(addBookToLibrary(title, author, pages, summary));
});

contentContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("content-card-delete")) {
    const card = event.target.closest(".content-card");
    contentContainer.removeChild(card);
    myLibrary = myLibrary.filter((book) => book.id != card.id);
  } else if (event.target.classList.contains("content-card-read-status")) {
    const readStatus = event.target;
    const card = event.target.closest(".content-card");
    readStatus.classList.toggle("read");
    const book = myLibrary.find((b) => b.id === card.id);
    book.isRead = !book.isRead;
    readStatus.textContent = book.isRead ? "Read" : "Not Read";
  }
});

addBookToLibrary("The Merchant of Venice", "Shakespeare", 100);

displayBook();
