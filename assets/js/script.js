let books = [];

if (!localStorage.getItem('books')) {
  localStorage.setItem('books', JSON.stringify(books));
} else {
  books = JSON.parse(localStorage.getItem('books'));
};

function Book(author, title, pages) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = false;

}

Book.prototype.readStatus = function() {
  return !this.read
};


function addBookToLibrary() {
  const formElements = ['author', 'title', 'pages', 'read?'];
  let book = new Book();
  formElements.forEach(el => {
    const item = document.getElementById(el);
    book[el] = item.value;
  });
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
  return books;
}

function type(el) {
  let result = '';
  if (el === 'pages') {
    result = 'number';
  } else if (el === 'read?') {
    result = 'checkbox';
  } else if (el === 'submit') {
    result = 'submit';
  } else {
    result = 'text';
  }
  return result;
}

function closeForm() {
  const form = document.getElementById('form-books');
  document.body.removeChild(form);
}

function displayForm() {
  const formBooks = document.createElement('div');
  formBooks.setAttribute('id', 'form-books');
  const close = document.createElement('div');
  close.setAttribute('onclick', 'closeForm()');
  close.innerHTML = 'X';
  formBooks.appendChild(close);
  const form = document.createElement('form');
  const formElements = ['author', 'title', 'pages', 'read?', 'submit'];
  formElements.forEach(el => {
    const labelName = document.createElement('label');
    labelName.setAttribute('for', el);
    labelName.innerHTML = el;
    const inputName = document.createElement('input');
    inputName.setAttribute('id', el);
    inputName.setAttribute('type', type(el));
    inputName.setAttribute('name', el);
    form.appendChild(labelName);
    form.appendChild(inputName);
  });
  form.setAttribute('class', 'form-book');
  formBooks.appendChild(form);
  document.body.appendChild(formBooks);
  const btn = document.getElementById('submit');
  btn.addEventListener('click', addBookToLibrary);
}

function displayBooks() {
  const booksContainer = document.createElement('div');
  booksContainer.setAttribute('class', 'row');
  booksContainer.setAttribute('id', 'library');
  let html = '';
  let arrayBooks = JSON.parse(localStorage.getItem('books'));
  for (let i = 0; i < arrayBooks.length; i++) {
    html += `
      <div class="col-sm-6" id="book${i}">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Title: ${arrayBooks[i].title}</h5>
            <p class="card-text">Author: ${arrayBooks[i].author}</p>
            <p class="card-text">Pages: ${arrayBooks[i].pages}</p>
            <p class="card-text">Read: ${arrayBooks[i].read ? 'Read' : 'Not read'}</p>
            <a href="#" class="btn btn-primary" onclick="${arrayBooks[i].readStatus()}">Change Status Read</a>
            <a href="#" class="btn btn-primary" onclick="deleteBook(${i})">delete</a>
          </div>
        </div>
      </div>
    `;
  }
  booksContainer.innerHTML = html;
  document.body.appendChild(booksContainer);
}

function deleteBook(index) {
  books.splice(index, 1);
  const library = document.getElementById('library');
  const book = document.getElementById(`book${index}`);
  localStorage.setItem('books', JSON.stringify(books));
  library.removeChild(book);
}

// function changeStatus(index) {
//   books[index].readStatus();
// }
