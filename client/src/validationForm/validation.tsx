// form validation for signup
export const validationForm=(values:any)=>{
let error:any={}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!values?.name || !values.name.trim()) {
    error.name = 'Name is required';
  } else if (values.name.trim().length < 3) {
    error.name = 'Name must be at least 3 characters';
  }
  
if (!values?.email || values.email.trim() === '') {
  error.email = 'Email is required';
} else if (!emailRegex.test(values.email)) {
  error.email = 'Please enter a valid email address';
}
if (!values?.password || values.password.trim() === '') {
    error.password = 'Password is required';
  } else {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  
    if (!strongPasswordRegex.test(values.password)) {
      error.password = 'Use 8+ chars with A-Z, a-z, 0-9 & symbol';
    }

    
}

if (!values?.confirmPassword || !values.confirmPassword.trim()) {
    error.confirmPassword = 'Confirm password is required';
  } else if (values.confirmPassword !== values.password) {
    error.confirmPassword = 'Passwords do not match';
  }

return error
}

//form validation for sign in 


export const validationForLogin=(values:any)=>{
  let errorLogin:any={}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values?.email || values.email.trim() === '') {
    errorLogin.email = 'Email is required';
  } else if (!emailRegex.test(values.email)) {
    errorLogin.email = 'Please enter a valid email address';
  }
  if (!values?.password || values.password.trim() === '') {
    errorLogin.password = 'Password is required';
    } else {
      const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    
      if (!strongPasswordRegex.test(values.password)) {
        errorLogin.password = 'Use 8+ chars with A-Z, a-z, 0-9 & symbol';
      }
  
      
  }
  return errorLogin
}
