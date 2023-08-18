import { useContext, useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';

import {UserContext} from '../../contexts/user.context'
import Button from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            
            setCurrentUser(user);

            resetFormFields();
        } catch (error) {
            switch(error.code){
                case 'auth/wrong-password':
                    alert('Senha incorreta!');
                    break
                case 'auth/user-not-found':
                    alert('Usuário não encontrado com esse email');
                    break;
                default:
                    console.log(error);
            }
           
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };


    return (
        <div className="sign-in-container">
            <h2>Já possui uma conta?</h2>
            <span>Entre com seu email e senha</span>
            <form onSubmit={handleSubmit}>


                <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email} />


                <FormInput label='Senha' type="password" required onChange={handleChange} name="password" value={password} />

                <div className="buttons-container">
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google</Button>
                    <Button type='submit'>Entrar</Button>
                </div>


            </form>
        </div>
    );
};


export default SignInForm;