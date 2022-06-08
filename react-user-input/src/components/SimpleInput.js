import React, { useState } from "react"

const SimpleInput = props => {
  const [enteredName, setEnteredName] = useState("")
  const [enteredNameTouched, setEnteredNameTouched] = useState(false)
  const [enteredEmail, setEnteredEmail] = useState("")
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false)

  const enteredNameIsValid = enteredName.trim() !== ""
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched

  const enteredEmailIsValid = enteredEmail.includes("@") && enteredEmail.trim().length > 6
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched

  let formIsValid = false

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true
  }

  const nameInputChangHandler = event => {
    setEnteredName(event.target.value)
  }

  const emailInputChangHandler = event => {
    setEnteredEmail(event.target.value)
  }

  const nameInputBlurHandler = event => {
    setEnteredNameTouched(true)
  }

  const emailInputBlurHandler = event => {
    setEnteredEmailTouched(true)
  }

  const formSubmissionHandler = event => {
    event.preventDefault()

    setEnteredNameTouched(true)
    setEnteredEmailTouched(true)

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return
    }

    console.log(enteredName, enteredEmail)
    setEnteredName("")
    setEnteredNameTouched(false)
    setEnteredEmail("")
    setEnteredEmailTouched(false)
  }

  const nameInputClasses = nameInputIsInvalid ? "form-control invalid" : "form-control"
  const emailInputClasses = emailInputIsInvalid ? "form-control invalid" : "form-control"

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange={nameInputChangHandler} onBlur={nameInputBlurHandler} value={enteredName} />
        {nameInputIsInvalid && <p className='error-text'>Name must not be empty</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='name'>Your E-mail</label>
        <input type='email' id='email' onChange={emailInputChangHandler} onBlur={emailInputBlurHandler} value={enteredEmail} />
        {emailInputIsInvalid && <p className='error-text'>Email must contain '@' and be length 6.</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  )
}

export default SimpleInput
