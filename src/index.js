import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAEdGwwq4mUeEynolZloNNiEFPy49__n80',
  authDomain: 'fir-9-aadb2.firebaseapp.com',
  projectId: 'fir-9-aadb2',
  storageBucket: 'fir-9-aadb2.appspot.com',
  messagingSenderId: '493373763953',
  appId: '1:493373763953:web:590fa40fa47e345b6f46d0',
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, 'books');

// real time collection data
onSnapshot(colRef, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ id: doc.id, ...doc.data() });
  });
  console.log(books);
});

// adding documents
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting documents
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const docRef = doc(db, 'books', deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

// get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ id: doc.id, ...doc.data() });
//     });
//     console.log(books);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
