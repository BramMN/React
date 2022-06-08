import useInput from "../hooks/use-input"

const BasicForm = props => {
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: firstNameReset,
  } = useInput(value => value !== "")

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useInput(value => value !== "")

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(value => value.includes("@") && value.trim().length > 6)

  let formIsValid = false

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true
  }

  const formSubmissionHandler = event => {
    event.preventDefault()

    if (!formIsValid) {
      return
    }

    firstNameReset()
    lastNameReset()
    emailReset()
  }

  const firstNameInputClasses = firstNameHasError ? "form-control invalid" : "form-control"
  const lastNameInputClasses = lastNameHasError ? "form-control invalid" : "form-control"
  const emailInputClasses = emailHasError ? "form-control invalid" : "form-control"

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={firstNameInputClasses}>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' onChange={firstNameChangeHandler} onBlur={firstNameBlurHandler} value={firstNameValue} />
          {firstNameHasError && <p className="error-text">Enter a first name</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' onChange={lastNameChangeHandler} onBlur={lastNameBlurHandler} value={lastNameValue} />
          {lastNameHasError && <p className="error-text">Enter a last name</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='mail' id='mail' onChange={emailChangeHandler} onBlur={emailBlurHandler} value={emailValue} />
        {emailHasError && <p className="error-text">Enter an email</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  )
}

export default BasicForm
