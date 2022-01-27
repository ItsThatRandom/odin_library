let myLibrary = [];
const cards = document.querySelector('.cards');

// temp data for testing
for (i=0; i < 9; i++) {
    myLibrary[i] = new book("bananna", "B.B. Battles", 1079, true)
}

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

// Add to array
function addBookToLibrary(item) {
    myLibrary.push(item);
}

// Display all books in library to page
function displayLibrary(library) {
    library.forEach(book => {
        
        createCard(book);
        console.log(book.info());
    });
}

// card html element creation.
function createCard(book) {
    let card = document.createElement('article');
    let left = document.createElement('div');
    let right = document.createElement('div');
    let title = document.createElement('h2');
    let author = document.createElement('h3')
    let pages = document.createElement('p');
    let read = document.createElement('img');

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = 'Pages: ' + book.pages;

    read.src = 'images/book_icon.png';
    read.setAttribute('data-read', `${book.read}`);
    read.setAttribute('width', '40');
    read.setAttribute('height', '30');

    card.setAttribute('class', 'card');
    left.append(title, author, pages);
    right.append(read);
    card.append(left, right);
    cards.append(card);
}