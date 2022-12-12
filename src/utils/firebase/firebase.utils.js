import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
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
  // specifying Google cos you can have diff providers
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    // if user data does not exist
    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInfo });
      } catch (err) {
        console.log('Error creating user', err.message);
      }
    };

    // if user data exists 
    // return userDocRef
    return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  };

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
  };