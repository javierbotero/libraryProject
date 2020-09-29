let books = [];

if(!localStorage.getItem('arrayBooks')) {
  localStorage.arrayBooks = JSON.stringify(books);
} else {
  books = localStorage.getItem('arrayBooks');
}

function Book(author, title, pages) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = false;
}

function addBookToLibrary() {
  const formElements = ['author', 'title', 'pages', 'read?'];
  let book = new Book();
  formElements.forEach(el => {
    let value = document.getElementById(el).value;
    el === 'read?' ? book.read = value : book[el] = value;
  });
  books.push(book);
  localStorage.arrayBooks = JSON.stringify(books);
  console.log(books);
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
  let html = '';
  books.forEach((book) => {
    html += `
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Title: ${book.title}</h5>
            <p class="card-text">Author: ${book.author}</p>
            <p class="card-text">Pages: ${book.pages}</p>
            <a href="#" onclick="${readSwitcher()}" class="btn btn-primary">delete</a>
          </div>
        </div>
      </div>
    `;
  });
  booksContainer.appendChild(html);
  document.body.appendChild(booksContainer);
}