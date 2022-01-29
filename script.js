let myLibrary = [];
const addButton = document.querySelector("#addButton");
const cards = document.querySelector(".cards");
const overlay = document.querySelector(".overlay");
const form = document.querySelector("form");

// Open form overlay
addButton.addEventListener("click", () => {
    overlay.style.display = "flex";
})

// Close form overlay
overlay.addEventListener("click", e => {
    if(e.target.className == "overlay") {
        overlay.style.display = "none";
    }
})

// Add book and display
form.addEventListener("submit", e => {
    additionalBook(e);
});

// Book constructor
function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Prototype functions
book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

book.prototype.readToggle = function() {
    this.read = !this.read;
}

// temp data for testing
for (i=0; i < 4; i++) {
    myLibrary[i] = new book("Harry Potter and the Order of the Phoenix", "B.B. Battles", 1079, true)
    myLibrary[i+4] = new book("bananna", "B.B. Battles", 1079, false)
}
displayLibrary(myLibrary);

// Add to array
function addBookToLibrary(book) {
    
    myLibrary.push(book);
}

// Remove book and card.
function removeFromLibrary(book) {
    let card = document.querySelectorAll(".card");
    let index = myLibrary.indexOf(book);
    myLibrary.splice(index, 1);

    card[index].remove();
    for (i = index; i < card.length; i ++) {
        card[i].setAttribute("data-index", i-1);
        console.log(card[i]);
    }
}

// Display all books in library to page
function displayLibrary(library) {
    library.forEach(book => {
        createCard(book);
    });
}

// Card html element creation.
function createCard(book) {
    let card = document.createElement("article");
    let title = document.createElement("h2");
    let author = document.createElement("h3")
    let pages = document.createElement("p");
    let read = document.createElement("img");
    let remove = document.createElement("button");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = "Pages: " + book.pages;

    remove.textContent = "X";
    remove.addEventListener('click', () => {
        removeFromLibrary(book);
    })

    read.src = "images/book_icon.png";
    read.setAttribute("data-read", `${book.read}`);
    read.setAttribute("width", "40");
    read.setAttribute("height", "30");
    // Toggles read status and updates card.
    read.addEventListener('click', () => {
        book.readToggle();
        read.setAttribute("data-read", `${book.read}`)
    })

    card.setAttribute("class", "card");
    card.setAttribute("data-index", myLibrary.indexOf(book));
    card.append(title, remove, author, pages, read);
    cards.append(card);
}

// Allow user to add new book and display it.
function additionalBook(e) {
    let newBook = new book(
        form.elements["title"].value,
        form.elements["author"].value,
        Number(form.elements["pages"].value),
        form.elements["read"].checked
    )
    console.log(newBook);
    addBookToLibrary(newBook);
    createCard(newBook);
    overlay.style.display = "none";
    e.preventDefault();
}