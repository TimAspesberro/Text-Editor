import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, value) => {
  console.error('Update jateDb')

  const contactDb = await openDB('jate', 1);
  const tx = contactDb.transaction('jate', 'readwrite');
  const storeObj = tx.objectStore('jate');
  const req = storeObj.put({ id: id, value: value })
  const res = await req;

  console.log('data saved to the DB', res);
}
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get data from jateDb');

  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const storeObj = tx.objectStore('jate');
  const req = storeObj.getAll()
  const res = await req;

  console.log('data saved to the DB', res);
}
initdb();
