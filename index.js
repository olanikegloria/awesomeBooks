import BookStore from './modules/BookStore.js';
import Contact from './modules/Contact.js';
import {
  loadTime, loadBookslist, loadContacts, addBookButton, spaExperience, loadLocalStorage,
} from './modules/utilityFunction.js';

const newBookStorage = new BookStore();
const allContacts = new Contact();

loadLocalStorage(newBookStorage);
loadBookslist(newBookStorage);
// add books
addBookButton(newBookStorage);
spaExperience();
loadContacts(allContacts);
loadTime();
