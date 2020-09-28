const books = [];

function Book(author, title, pages) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = false;
}

function addBookToLibrary() {

}

function displayForm() {
  const div = document.createElement('div');
  const form = document.createElement('form');
  const formElements = ['author', 'title', 'pages', 'read?'];
  formElements.forEach(el => {
    const labelName = document.createElement('label');
    labelName.setAttribute('for', el);
    labelName.innerHTML = el;
    const inputName = document.createElement('input');
    inputName.setAttribute('id', el);
    inputName.setAttribute('type', el === 'pages' ? 'number' : el === 'read?' ? 'checkbox' : 'text');
    inputName.setAttribute('name', el);
    form.appendChild(labelName);
    form.appendChild(inputName);
  });
  form.setAttribute('class', 'form-book');
  div.appendChild(form);
  document.body.appendChild(div);
}
