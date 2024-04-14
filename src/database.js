import database from './firebase';
import { ref, set, onValue, remove } from 'firebase/database';

export const writeData = (path, data) => {
  set(ref(database, path), data);
};

export const readData = (path, callback) => {
  onValue(ref(database, path), (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export const removeData = (path) => {
  remove(ref(database, path));
};
