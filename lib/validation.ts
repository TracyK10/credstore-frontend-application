export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

// Email validation using regex
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email.trim()) {
    return { isValid: false, errorMessage: "Email is required" };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, errorMessage: "Please enter a valid email address" };
  }
  
  return { isValid: true };
};

// Password validation (minimum 8 characters)
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, errorMessage: "Password is required" };
  }
  
  if (password.length < 8) {
    return { isValid: false, errorMessage: "Password must be at least 8 characters" };
  }
  
  return { isValid: true };
};

// Required field validation
export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value.trim()) {
    return { isValid: false, errorMessage: `${fieldName} is required` };
  }
  
  return { isValid: true };
};

// Card number validation (numeric only, 13-19 digits)
export const validateCardNumber = (cardNumber: string): ValidationResult => {
  const cleanNumber = cardNumber.replace(/\s|-/g, "");
  
  if (!cleanNumber) {
    return { isValid: false, errorMessage: "Card number is required" };
  }
  
  if (!/^\d+$/.test(cleanNumber)) {
    return { isValid: false, errorMessage: "Card number must contain only digits" };
  }
  
  if (cleanNumber.length < 13 || cleanNumber.length > 19) {
    return { isValid: false, errorMessage: "Card number must be 13-19 digits" };
  }
  
  return { isValid: true };
};

// Expiration month validation (01-12)
export const validateExpirationMonth = (month: string): ValidationResult => {
  if (!month) {
    return { isValid: false, errorMessage: "Month is required" };
  }
  
  const monthNum = parseInt(month, 10);
  
  if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
    return { isValid: false, errorMessage: "Invalid month (01-12)" };
  }
  
  return { isValid: true };
};

// Expiration year validation (YY format, must be >= current year)
export const validateExpirationYear = (year: string): ValidationResult => {
  if (!year) {
    return { isValid: false, errorMessage: "Year is required" };
  }
  
  const currentYear = new Date().getFullYear() % 100;
  const yearNum = parseInt(year, 10);
  
  if (isNaN(yearNum) || year.length !== 2) {
    return { isValid: false, errorMessage: "Invalid year format (YY)" };
  }
  
  if (yearNum < currentYear) {
    return { isValid: false, errorMessage: "Card has expired" };
  }
  
  return { isValid: true };
};

// CVC validation (3-4 digits)
export const validateCVC = (cvc: string): ValidationResult => {
  if (!cvc) {
    return { isValid: false, errorMessage: "CVC is required" };
  }
  
  if (!/^\d{3,4}$/.test(cvc)) {
    return { isValid: false, errorMessage: "CVC must be 3 or 4 digits" };
  }
  
  return { isValid: true };
};

// Postcode validation (basic format check)
export const validatePostcode = (postcode: string): ValidationResult => {
  if (!postcode.trim()) {
    return { isValid: false, errorMessage: "Postcode is required" };
  }
  
  if (postcode.trim().length < 3) {
    return { isValid: false, errorMessage: "Please enter a valid postcode" };
  }
  
  return { isValid: true };
};
