const myLibrary = [];

class Book {
    title;
    author;
    pages;
    read;

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    const formElement = document.querySelector('form');
    if (formElement.reportValidity() === false) {
        return;
    }

    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
    const books = document.getElementById('books');
    books.innerHTML = '';
    myLibrary.forEach(book => {
        const bookElement = document.createElement('div');
        const title = document.createElement('h3');
        title.innerText = book.title;
        const author = document.createElement('p');
        author.innerText = book.author;
        const pages = document.createElement('p');
        pages.innerText = book.pages;

        const read = document.createElement('div');
        read.innerText = book.read ? 'Read' : 'Not read yet';
        read.addEventListener('click', () => {
            book.read = !book.read;
            displayBooks();
        });
        read.classList.add('read');
        const toolTip = document.createElement('span');
        toolTip.innerText = 'Click to toggle read status';
        toolTip.classList.add('tooltiptext');
        read.appendChild(toolTip);

        const removeBook = document.createElement('button');
        removeBook.innerText = '×';
        removeBook.addEventListener('click', () => {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            displayBooks();
        });
        removeBook.classList.add('remove');
        bookElement.appendChild(removeBook);
        bookElement.appendChild(title);
        bookElement.appendChild(author);
        bookElement.appendChild(pages);
        bookElement.appendChild(read);
        bookElement.classList.add('book');
        books.appendChild(bookElement);
    });
}

document.getElementById('submit').addEventListener('click', () => {
    addBookToLibrary();
    displayBooks();
});