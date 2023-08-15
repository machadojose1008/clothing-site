import { signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect, auth } from "../../utils/firebase/firebase.utils";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
   

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };


    return (
        <div >
            <h1>Entrar</h1>
            <button onClick={logGoogleUser}>Entrar com Google</button>
            <SignUpForm />
        </div>
    );
};

export default SignIn;