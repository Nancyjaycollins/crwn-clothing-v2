import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDVSbTnqR63u-xcj7NcdD-90mXvodRKWhk",
    authDomain: "ecom-db-9696.firebaseapp.com",
    projectId: "ecom-db-9696",
    storageBucket: "ecom-db-9696.appspot.com",
    messagingSenderId: "380346182158",
    appId: "1:380346182158:web:2133502eeb0c11b3e0ea5f"
  };
  
  // Initialize Firebase
  const fireBaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    // if user data does not exist
    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, { displayName, email, createdAt });
      } catch (err) {
        console.log('Error creating user', err.message);
      }
    };

    // if user data exists 
    // return userDocRef
    return userDocRef;
  };