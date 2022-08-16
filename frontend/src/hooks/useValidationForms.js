import { useCallback, useState } from "react"

const useValidationForms = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    e.persist();
    const {name, value} = e.target
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: e.target.validationMessage});
    setIsValid(e.target.closest('form').checkValidity());
  };
  
  const resetError = useCallback((newErrors = {}, newIsValid = false) => {
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setErrors, setIsValid]);

  return {
      values,
      handleChange,
      errors,
      isValid,
      resetError,
      setValues,
      setIsValid
    }  
}

export default useValidationForms;