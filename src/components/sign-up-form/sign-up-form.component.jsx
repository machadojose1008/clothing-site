import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SignUpContainer } from "./sign-up-form.styles";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verificar se algum campo está vazio 
        if(password !== confirmPassword){
            alert('Senha direfente de confirmar senha!');
            return
        }

        try{
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } catch(error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Email já cadastrado!');
            }else {
                console.log(error);
            }
        }
    };
    
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value });
    };


    return (
        <SignUpContainer>
            <h2>Não possui uma conta?</h2>
            <span>Crie sua conta</span>
            <form onSubmit={handleSubmit}>

                <FormInput label = 'Usuário' type = 'text' onChange={handleChange} name='displayName' value={displayName}  />
    
                <FormInput label = 'Email' type="email" required onChange={handleChange} name="email" value={email}  />

                
                <FormInput label = 'Senha' type="password" required onChange={handleChange} name="password" value={password} />

    
                <FormInput label = 'Confirme sua senha'  type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
                <Button  type='submit'>Criar Conta</Button>
            </form>
        </SignUpContainer>
    );
};


export default SignUpForm;