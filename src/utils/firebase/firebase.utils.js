import { initializeApp } from 'firebase/app';

import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCLL3WsrkTnJwBbvp3f4poH8qZeyzNwG2w",
    authDomain: "terrain-clothing-db.firebaseapp.com",
    projectId: "terrain-clothing-db",
    storageBucket: "terrain-clothing-db.appspot.com",
    messagingSenderId: "78648931886",
    appId: "1:78648931886:web:9ac75cbd0059db067cd1bf"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (user, additionalInformation) => {

  if (!user) return;

  const userDocRef = doc(db, 'users', user.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  console.log(userSnapshot)
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()) {
    const {displayName, email} = user;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }

  } 

return userDocRef;
}

export const createAuthUserWithEmailandPassword = async (email, password) => {
  if (!email || !password) return;

 return await createUserWithEmailAndPassword(auth, email, password);
}

