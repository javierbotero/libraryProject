let books = [];

if (!localStorage.getItem('books')) {
  localStorage.setItem('books', JSON.stringify(books));
} else {
  books = JSON.parse(localStorage.getItem('books'));
}

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

Book.prototype.readStatus = (index) => {
  console.log(`initial: ${this.read}`);
  const read = document.getElementById(`read${index}`);
  this.read = read.innerHTML === 'Read: Read' ? 'Not Read' : 'Read';
  books[index].read = this.read;
  localStorage.setItem('books', JSON.stringify(books));
  read.innerHTML = `Read: ${this.read}`;
  console.log(`Final: ${this.read}`);
};

function addBookToLibrary() {
  const formElements = ['author', 'title', 'pages', 'read'];
  const book = new Book();
  formElements.forEach(el => {
    const item = document.getElementById(el);
    book[el] = item.value;
    console.log(item.value);
  });
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
  return books;
}

function type(el) {
  let result = '';
  if (el === 'pages') {
    result = 'number';
  } else if (el === 'read') {
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

function valueSelect(el, inputName) {
  if (el === 'read') {
    ['Read', 'Not Read'].forEach((option) => {
      const selectOption = document.createElement('option');
      selectOption.setAttribute('value', option);
      selectOption.innerHTML = option;
      inputName.appendChild(selectOption);
    });
  }
}

function setType(el, inputName) {
  if (el !== 'read') {
    inputName.setAttribute('type', type(el));
  }
}

function displayForm() {
  const formBooks = document.createElement('div');
  formBooks.setAttribute('id', 'form-books');
  const close = document.createElement('div');
  close.setAttribute('onclick', 'closeForm()');
  close.innerHTML = 'X';
  formBooks.appendChild(close);
  const form = document.createElement('form');
  const formElements = ['author', 'title', 'pages', 'read', 'submit'];
  formElements.forEach(el => {
    const labelName = document.createElement('label');
    labelName.setAttribute('for', el);
    labelName.innerHTML = el;
    const inputName = document.createElement(el !== 'read' ? 'input' : 'select');
    inputName.setAttribute('id', el);
    setType(el, inputName);
    inputName.setAttribute('name', el);
    valueSelect(el, inputName);
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
  const arrayBooks = JSON.parse(localStorage.getItem('books'));
  for (let i = 0; i < arrayBooks.length; i++) {
    html += `
      <div class="col-sm-6" id="book${i}">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Title: ${arrayBooks[i].title}</h5>
            <p class="card-text">Author: ${arrayBooks[i].author}</p>
            <p class="card-text">Pages: ${arrayBooks[i].pages}</p>
            <p class="card-text" id="read${i}">Read: ${arrayBooks[i].read}</p>
            <button type="button" class="btn btn-primary" onclick="changeStatus(${i})">Change Status Read</button>
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

function changeStatus(index) {
  Object.setPrototypeOf(books[index], Book.prototype);
  books[index].readStatus(index);
}
