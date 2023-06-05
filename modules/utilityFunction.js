// eslint-disable-next-line import/no-extraneous-dependencies
import { DateTime } from '../node_modules/luxon/src/luxon.js';

export function loadBookslist(bookInstanceFromBookStore) {
  function loopingBook(book) {
    return `<div id="${book.id}" class="book-card">
                  <p class="book-details">
                      "${book.title}" 
                      by 
                      ${book.author}
                  </p>
                  <button class="remove-button" data-book="${book.id}">Remove</button>
              </div>`;
  }

  const bookContainer = document.querySelector('.books-container');
  bookContainer.innerHTML = bookInstanceFromBookStore.store.map((book) => loopingBook(book)).join('');

  // remove button

  const removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.getAttribute('data-book'));
      bookInstanceFromBookStore.remove(id);
      loadBookslist(bookInstanceFromBookStore);
      localStorage.setItem('bookCollection', JSON.stringify(bookInstanceFromBookStore.store));
    });
  });
}

export function loadContacts(contactInstanceFromContact) {
  function loopingContacts(contact) {
    return `<div class="contact-card">
                <div class="contact-image ${contact.classImage}"></div>
                <div class="contact-name text-center">${contact.name}</div>
                <div class="contact-details">
                  <a class="contact-link" target="_blank" href="${contact.githubLink}">
                    <i class="fab fa-github-square fa-fw fa-2xl"></i>
                  </a>
                  <a class="contact-link" target="_blank" href="${contact.linkedLink}">
                    <i class="fab fa-linkedin fa-fw fa-2xl"></i>
                  </a>
                  <a class="contact-link" target="_blank" href="${contact.instagramLink}">
                    <i class="fab fa-instagram-square fa-fw fa-2xl"></i>
                  </a>
                </div>
              </div>`;
  }

  const contactWrapper = document.querySelector('.contact-wrapper');

  contactWrapper.innerHTML = contactInstanceFromContact.profile.map((contact) => loopingContacts(contact)).join('');
}

export function addBookButton(bookInstanceFromBookStore) {
  const titleInput = document.querySelector('#title-input');
  const authorInput = document.querySelector('#author-input');
  const addButton = document.querySelector('#add-book-button');

  addButton.addEventListener('click', (e) => {
    e.preventDefault();
    let newid;
    if (bookInstanceFromBookStore.store.length === 0) {
      newid = 1;
    } else {
      newid = bookInstanceFromBookStore.store[bookInstanceFromBookStore.store.length - 1].id + 1;
    }
    const newBook = {
      id: newid,
      title: titleInput.value,
      author: authorInput.value,
    };
    bookInstanceFromBookStore.add(newBook);
    loadBookslist(bookInstanceFromBookStore);
    titleInput.value = '';
    authorInput.value = '';
    localStorage.setItem('bookCollection', JSON.stringify(bookInstanceFromBookStore.store));
  });
}

export function spaExperience() {
  const navLinks = document.querySelectorAll('.links');

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const dataLink = link.getAttribute('data-page');
      const listBookSection = document.querySelector('.list-book-section');
      const newBookSection = document.querySelector('.new-book-section');
      const contactUsSection = document.querySelector('.contact-us-section');

      switch (dataLink) {
        case 'list':
          listBookSection.setAttribute('data-visible', true);
          newBookSection.setAttribute('data-visible', false);
          contactUsSection.setAttribute('data-visible', false);
          break;
        case 'add-new':
          newBookSection.setAttribute('data-visible', true);
          listBookSection.setAttribute('data-visible', false);
          contactUsSection.setAttribute('data-visible', false);
          break;
        case 'contacts':
          contactUsSection.setAttribute('data-visible', true);
          newBookSection.setAttribute('data-visible', false);
          listBookSection.setAttribute('data-visible', false);
          break;
        default:
          break;
      }
    });
  });
}

export function loadLocalStorage(bookInstanceFromBookStore) {
  const bookStorage = JSON.parse(localStorage.getItem('bookCollection'));
  if (bookStorage !== null) {
    bookInstanceFromBookStore.store = bookStorage;
  }
}

export function loadTime() {
  const date = DateTime.now();
  const timeHtml = document.querySelector('.time');

  timeHtml.innerHTML = `${date.hour} <span class="blinker">:</span> ${date.minute}`;
}
