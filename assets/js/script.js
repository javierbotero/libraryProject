const books = [];

function Book(author, title, pages) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = false;
}

function addBookToLibrary() {

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
}

