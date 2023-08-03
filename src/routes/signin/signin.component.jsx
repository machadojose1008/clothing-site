import { EntrarGoogle } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        console.log(EntrarGoogle());
    };

    return (
        <div>
            <h1>Sign in Page</h1>
            <button onClick={logGoogleUser}>Entrar com Google</button>
        </div>
    );
};

export default SignIn;