import { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import useValidationForms from '../hooks/useValidationForms';

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
  /* const [name, setName] = useState(' ');
  const [description, setDescription] = useState(' '); */
  const currentUser = useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, setValues, resetError} = useValidationForms();
  const spanErrorClassName = `${!isValid && "popup__input-error"}`;
 
  useEffect(() => {
    /* setName(currentUser.name);
    setDescription(currentUser.about); */
    setValues(currentUser);    
    resetError();
  }, [currentUser, isOpen]); 

  /* function handleChangeName(e) {
    setName(e.target.value);
  }
  
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }  */

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
    name: values.name,
    about: values.about,
    });
  }

  return (
    <PopupWithForm name="editProfile" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} textButton={isLoading  ? "Сохранение..." : "Сохранить"} onSubmit={handleSubmit} buttonDisabled={isValid}>
      <input
            type="text"
            id="name"
            className={`popup__input ${errors.name && "popup__input_type_error"}`}
            name="name"
            placeholder="Введите имя"
            minLength={2}
            maxLength={40}
            value={values.name || ""}
            onChange={handleChange}
            required            
          />
          <span id="name-error" className={spanErrorClassName}>
            {errors.name}
          </span>
          <input
            type="text"
            id="about"
            className={`popup__input ${errors.about && "popup__input_type_error"}`}
            name="about"
            minLength={2}
            maxLength={200}
            placeholder="Введите информацию о себе"
            value={values.about || ""}
            onChange={handleChange}
            required
          />
          <span id="about-error" className={spanErrorClassName}>
            {errors.about}
          </span>
      </PopupWithForm>
  )
}

export default EditProfilePopup;