export default class BookStore {
  constructor() {
    this.store = [
      {
        id: 1,
        title: 'Moby-Dick',
        author: 'Herman Melville',
      },
      {
        id: 2,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
      },
      {
        id: 3,
        title: 'Harry Potter',
        author: 'J.K Rowling',
      },
      {
        id: 4,
        title: 'Laskar Pelangi',
        author: 'Andrea Hirata',
      },
    ];
  }

  add(book) {
    this.store.push(book);
  }

  remove(id) {
    this.store = this.store.filter((item) => item.id !== id);
  }
}
