let books = [];

function Book(author, title, pages) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = false;

}

function addBookToLibrary() {

}

function displayForm() {
  let div = document.createElement('div');
  let form = document.createElement('form');
  form.setAttribute('class', 'form-book');
  let labelName = document.createElement('label');
  labelName.setAttribute('for', 'name');
  let inputName = document.createElement('input');
  inputName.setAttribute('id', 'name');
  inputName.setAttribute('type', 'text');
  inputName.setAttribute('name', 'name');
  form.innerHTML += labelName;
  form.innerHTML += inputName;
  div.appendChild(form);
  document.appendChild(div);
}

