// import './sign-up-form.scss'
import { SignUpContainer } from './sign-up-form.styles'

import { useState } from "react"

// import { UserContext } from '../../contexts/user.context'
import { createAuthWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input.component"
import Button from '../button/button.component'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [ formFields, setFormFields ] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  // const { setCurrentUser } = useContext(UserContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (e) => {
    // prevent default previene il rerfresh della pagina al submit (comportamento standard html)
    e.preventDefault()
    // console.log(e.target)
    if(password !== confirmPassword) return alert('passwords do not match')

    try {
      const response = await createAuthWithEmailAndPassword(email, password)
      const { user } = response
      console.log(user)

      // setCurrentUser(user)

      await createUserDocumentFromAuth(user, {displayName})

      resetFormFields()
    } catch(e) {
      if(e.code === 'auth/email-already-in-use'){
        alert("There is already a user with this email")
      } else{
        console.log('user creation error', e)
      }
    }
  }
  
  const handleChange = (e) => {
    const { value, name } = e.target

    setFormFields({...formFields, [name]: value})
  }
  
  return (
    <SignUpContainer>
        <h2>Don't have an Account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={ handleSubmit } >

            <FormInput 
              label='Display Name'
              type="text" 
              required 
              name="displayName" 
              onChange={handleChange} 
              value={displayName} 
            />
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
            <FormInput 
              label='Confirm Password'
              type="password" 
              required 
              name="confirmPassword" 
              onChange={handleChange} 
              value={confirmPassword} 
            />

            <Button type="submit">Sign Up</Button>
        </form>
    </SignUpContainer>
  )
}

export default SignUpForm