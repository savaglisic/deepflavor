import database from './firebase';
import { ref, onValue, remove, runTransaction } from 'firebase/database';

export const writeData = (path, data) => {
  const entryRef = ref(database, path);
  runTransaction(entryRef, (currentData) => {
    if (currentData === null) {
      return data;
    } else {
      if (!Array.isArray(currentData)) {
        currentData = [currentData]; // Make current data an array if it isn't already
      }
      currentData.push(data);
      return currentData;
    }
  });
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
