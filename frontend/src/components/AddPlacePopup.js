import PopupWithForm from './PopupWithForm';
import { useRef, useEffect } from 'react';
import useValidationForms from '../hooks/useValidationForms';

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {

  const cardNameRef = useRef();
  const cardLinkRef = useRef();
  const {handleChange, errors, isValid, resetError} = useValidationForms();
  const spanErrorClassName = `${!isValid && "popup__input-error"}`;

  useEffect(() => {
    cardNameRef.current.value = "";
    cardLinkRef.current.value = "";
    resetError();
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: cardNameRef.current.value,
      link: cardLinkRef.current.value,
    });
  } 

  return (
    <PopupWithForm name="addPlace" title="Новое место" isOpen={isOpen} onClose={onClose} textButton={isLoading  ? "Создание..." : "Создать"} onSubmit={handleSubmit} buttonDisabled={isValid}>
      <input
            type="text"
            id="place"
            className={`popup__input ${errors.name && "popup__input_type_error"}`}
            name="name"
            placeholder="Название"
            minLength={2}
            maxLength={30}
            ref={cardNameRef}
            onChange={handleChange}
            required
          />
          <span id="place-error" className={spanErrorClassName}>{errors.name}</span>
          <input
            type="url"
            id="link"
            className={`popup__input ${errors.link && "popup__input_type_error"}`}
            name="link"
            placeholder="Ссылка на картинку"
            ref={cardLinkRef}
            onChange={handleChange}
            required            
          />
          <span id="link-error" className={spanErrorClassName}>{errors.link}</span>
      </PopupWithForm>
  )
}

export default AddPlacePopup;