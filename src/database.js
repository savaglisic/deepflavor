import database from './firebase';
import { ref, onValue, remove, runTransaction } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

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

export const uploadFile = async (path, file) => {
  try {
    const storage = getStorage();
    const storageReference = storageRef(storage, path);
    const uploadTask = uploadBytesResumable(storageReference, file);

    await new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle upload progress, if needed
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });

    return uploadTask.snapshot.ref.getDownloadURL();
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
