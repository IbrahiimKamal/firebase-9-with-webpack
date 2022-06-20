import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

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
const auth = getAuth();

// collection ref
const colRef = collection(db, 'books');

// queries
const q = query(colRef, orderBy('createdAt'));

// real time collection data
onSnapshot(q, (snapshot) => {
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
    createdAt: serverTimestamp(),
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

// get a single document
const docRef = doc(db, 'books', 'tQjy6Q7snmwiQC4EcR6K');

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

// getDoc(docRef).then((doc) => {
//   console.log(doc.data(), doc.id);
// });

// updating a document
const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const docRef = doc(db, 'books', updateForm.id.value);

  updateDoc(docRef, {
    title: 'updated title',
  }).then(() => {
    updateForm.reset();
  });
});

// signing user up
const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('user created', cred.user);
      signupForm.reset();
    })
    .catch((err) => {
      console.log('error', err);
    });
});

// logout
const logoutForm = document.querySelector('.logout');
logoutForm.addEventListener('click', (e) => {
  e.preventDefault();

  signOut(auth)
    .then(() => {
      console.log('logged out');
    })
    .catch((err) => {
      console.log('error', err);
    });
});

// login
const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('user logged in', cred.user);
      loginForm.reset();
    })
    .catch((err) => {
      console.log('error', err);
    });
});

// subscribing to auth state changes
onAuthStateChanged(auth, (user) => {
  console.log('current user', user);

  // if (user) {
  //   console.log('user logged in', user);
  // } else {
  //   console.log('user logged out');
  // }
});

/* ################################ */

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
