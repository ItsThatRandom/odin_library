let myLibrary = [];
const addButton = document.querySelector('#newBook');
const cards = document.querySelector('.cards');
const overlay = document.querySelector('.overlay');

// Form overlay
addButton.addEventListener('click', () => {
    overlay.style.display = "flex";
})

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

// temp data for testing
for (i=0; i < 4; i++) {
    myLibrary[i] = new book("bananna", "B.B. Battles", 1079, true)
    myLibrary[i+4] = new book("bananna", "B.B. Battles", 1079, false)
}
displayLibrary(myLibrary);

// Add to array
function addBookToLibrary(item) {
    myLibrary.push(item);
}

// Remove from array via item index
function removeFromLibrary(item) {
    let index = myLibrary.indexOf(item);
    myLibrary.splice(index, 1);
}

// Display all books in library to page
function displayLibrary(library) {
    library.forEach(book => {
        
        createCard(book);
        console.log(book.info());
    });
}

// Card html element creation.
function createCard(book) {
    let card = document.createElement('article');
    let left = document.createElement('div');
    let right = document.createElement('div');
    let title = document.createElement('h2');
    let author = document.createElement('h3')
    let pages = document.createElement('p');
    let read = document.createElement('img');
    let remove = document.createElement('button');

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = 'Pages: ' + book.pages;
    remove.textContent = 'X';

    read.src = 'images/book_icon.png';
    read.setAttribute('data-read', `${book.read}`);
    read.setAttribute('width', '40');
    read.setAttribute('height', '30');

    card.setAttribute('class', 'card');
    left.append(title, author, pages);
    right.append(remove, read);
    card.append(left, right);
    cards.append(card);
}