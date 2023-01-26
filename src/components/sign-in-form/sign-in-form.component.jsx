import { useState } from "react" ;
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { FormInput } from '../form-input/form-input.component';
import './sign-in-form.styles.scss'
import { Button } from "../button/button.component";
import { signInWithGooglePopup, signInAuthUserWithEmailandPassword } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    
    console.log(formFields)

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailandPassword(email, password);
            console.log(response);
            resetFormFields();

        } catch(error) {
            switch (error.code) {
                case 'auth/wrong-password':
                alert('Incorrect password for email');
                break
            case 'auth/user-not-found':
                alert('No user associated with this email');
                break
            default:
                console.log('error', error);
            }
        

        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})

    };

    return (
    <div className='sign-in-container'>
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={ handleSubmit }>
          
            <FormInput 
                label='Email'
                required 
                type='email' 
                name='email' 
                value={email} 
                onChange={handleChange}
            />
         
            <FormInput 
                label='Password'
                required 
                type='password' 
                name='password'
                value={password} 
                onChange={handleChange}
            />
            <div className='buttons-container'>
            <Button type='submit'>Sign In</Button>
            <Button type='button' onClick={signInWithGoogle} buttonType='google'>Google Sign-In</Button>
            </div>
        </form>
    </div>
    )
};

export default SignInForm