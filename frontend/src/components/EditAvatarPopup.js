import { useRef, useEffect } from 'react';
import useValidationForms from '../hooks/useValidationForms';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {

  const avatarRef = useRef();
  const {handleChange, errors, isValid, resetError} = useValidationForms();
  const spanErrorClassName = `${!isValid && "popup__input-error"}`;

  useEffect(() => {
    avatarRef.current.value = "";
    resetError();
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 
  
  return (
    <PopupWithForm name="editAvatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} textButton={isLoading ? "Сохранение..." : "Сохранить"} onSubmit={handleSubmit} buttonDisabled={isValid}>
      <input
            type="url"
            id="avatar"
            className={`popup__input ${errors.avatar && "popup__input_type_error"}`}
            name="avatar"
            placeholder="Введите ссылку на фотографию"
            onChange={handleChange}            
            ref={avatarRef}
            required
          />
          <span id="avatar-error" className={spanErrorClassName}>{errors.avatar}</span>
      </PopupWithForm>
  )
}

export default EditAvatarPopup;
