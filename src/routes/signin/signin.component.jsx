import { signInWithGooglePopup, createUserDocumentoFromAuth } from "../../utils/firebase/firebase.utils";


const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentoFromAuth(user);
        
    };

    return (
        <div>
            <h1>Sign in Page</h1>
            <button onClick={logGoogleUser}>Entrar com Google</button>
        </div>
    );
};

export default SignIn;