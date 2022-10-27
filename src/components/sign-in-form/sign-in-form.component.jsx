import { useState } from 'react'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

// import { UserContext } from '../../contexts/user.context'

import { signInWithGooglePopup, signInAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils"

import './sign-in-form.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
        
    const [ signInFields, setSignInFields ] = useState(defaultFormFields)
    const { email, password } = signInFields

    /*
        vado ad estrapolare del mio UserContext che ho importato, grazie al useContext di 
        React le funzioni/ i valori che mi servono, in questo caso essendo il component di
        login mi servirà la funz per settare il mio context con l'utente
    */
    // const { setCurrentUser } = useContext(UserContext)
    
    const signInWithGoogle = async () => {
        await signInWithGooglePopup()
    }  
    
    const resetFormFields = () => {
        setSignInFields(defaultFormFields)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            await signInAuthWithEmailAndPassword(email, password)

            resetFormFields()
        } catch(e) {
            switch(e.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break;
                default: 
                console.log(e)
            }
        }
    }

    const handleChange = (e) => {
        const { value, name } = e.target

        setSignInFields({...signInFields, [name]: value})
    }
    
    return (
        <div className="sign-in-container">
            <h2>I already have an Account?</h2>
            <span>Sign in with Google or your email and password</span>
            <form onSubmit={ handleSubmit }>
            <FormInput 
                label='Email'
                type="email" 
                required 
                name="email" 
                onChange={handleChange} 
                value={email} 
            />
            <FormInput 
                label='Password'
                type="password" 
                required 
                name="password" 
                onChange={handleChange} 
                value={password} 
            />
            <div className="buttons-container">
                <Button type='submit' >Sign in</Button>
                <Button type='button' buttonType='google' onClick={ signInWithGoogle }>Sign in with google</Button>
            </div>
            </form>
        </div>
    )
}

export default SignInForm