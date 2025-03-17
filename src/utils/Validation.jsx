const validateForm = (values, isFullValidation = false) => {
    const errors = {};
  
    // ✅ Username validation
    if (isFullValidation || values.username !== undefined) {
      if (!values.username?.trim()) {
        errors.username = "Username is required.";
      } else if (values.username.length < 3) {
        errors.username = "Username must be at least 3 characters.";
      }
    }
  
    // ✅ Email validation
    if (isFullValidation || values.email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!values.email?.trim()) {
        errors.email = "Email is required.";
      } else if (!emailRegex.test(values.email)) {
        errors.email = "Please enter a valid email address.";
      }
    }
  
    // ✅ Password validation
    if (isFullValidation || values.password !== undefined) {
      if (!values.password?.trim()) {
        errors.password = "Password is required.";
      } else if (values.password.length < 12) {
        errors.password = "Password must be at least 12 characters.";
      }
    }
  
    // ✅ Confirm password validation
    if ((isFullValidation || values.confirmPassword !== undefined) && values.password !== undefined) {
      if (!values.confirmPassword?.trim()) {
        errors.confirmPassword = "Confirm password is required.";
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords do not match.";
      }
    }
  
    // ✅ Verification Code validation
    if (values.verificationCode !== undefined) {
      if (!values.verificationCode.trim()) {
        errors.verificationCode = "Verification code is required.";
      } else if (values.verificationCode.length !== 6) {
        errors.verificationCode = "Verification code must be 6 characters.";
      }
    }
  
    return errors;
  };
  
  export default validateForm;
  