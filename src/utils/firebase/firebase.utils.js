import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);


// Criação e configuração do Firebase Authenticator

const provider = new GoogleAuthProvider();

// Configuração específica do google authenticator
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);



export const db = getFirestore();

export const createUserDocumentoFromAuth = async (userAuth) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    // se o usuário não existir
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }catch (error) {
            console.log('erro criando o usuário', error);
        };

        return userDocRef;
    };

    console.log(userDocRef);
}



